import supabase from "./supabase";
import { authEmailFromUserId, buildUserId, USER_ID_PATTERN } from "./userIdAuth";
import { isValidPhone } from "../components/PhoneField";
import { isMemberProfile } from "./memberProfile";
import { countDirectReferrals, validateMemberLink } from "./memberReferral";
import { isReferralLimitReached, referralLimitMessage } from "./referralLimits";

async function restoreAdminSession(adminSession) {
  if (!adminSession) {
    return;
  }

  const { error } = await supabase.auth.setSession({
    access_token: adminSession.access_token,
    refresh_token: adminSession.refresh_token,
  });

  if (error) {
    throw new Error(
      "Member action completed but admin session could not be restored. Please sign in again.",
    );
  }
}

export async function createMemberAsAdmin({
  name,
  userIdDigits,
  phone,
  password,
  referrerId = null,
}) {
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const userId = buildUserId(userIdDigits);

  if (!USER_ID_PATTERN.test(userId)) {
    throw new Error("User ID must be MJ followed by exactly 9 digits.");
  }

  if (!isValidPhone(trimmedPhone)) {
    throw new Error("Phone number must be exactly 10 digits.");
  }

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const { data: existingUser, error: lookupError } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (lookupError) throw lookupError;

  if (existingUser) {
    throw new Error("This user ID is already in use.");
  }

  if (referrerId) {
    const { data: referrer, error: referrerError } = await supabase
      .from("profiles")
      .select("id, user_id")
      .eq("id", referrerId)
      .maybeSingle();

    if (referrerError) throw referrerError;
    if (!referrer || !isMemberProfile(referrer)) {
      throw new Error("Selected referrer was not found.");
    }

    const { data: allProfiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, parent_id");

    if (profilesError) throw profilesError;

    if (isReferralLimitReached(countDirectReferrals(allProfiles || [], referrerId))) {
      throw new Error(referralLimitMessage());
    }
  }

  const {
    data: { session: adminSession },
  } = await supabase.auth.getSession();

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: authEmailFromUserId(userId),
    password,
  });

  if (signUpError) {
    await restoreAdminSession(adminSession);
    throw signUpError;
  }

  const user = signUpData?.user;
  if (!user?.id) {
    await restoreAdminSession(adminSession);
    throw new Error("Member auth account was not created. Check email confirmation settings.");
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    user_id: userId,
    name: trimmedName,
    phone: trimmedPhone,
    referral_code: null,
    parent_id: referrerId || null,
  });

  await restoreAdminSession(adminSession);

  if (profileError) {
    if (profileError.code === "23505") {
      throw new Error("This user ID is already in use.");
    }
    throw profileError;
  }

  return { userId, memberId: user.id };
}

export async function linkMemberToReferrer({ memberId, referrerId, profiles }) {
  const members = (profiles || []).filter(isMemberProfile);
  const linkError = validateMemberLink({ memberId, referrerId, profiles: members });
  if (linkError) {
    throw new Error(linkError);
  }

  const { error } = await supabase
    .from("profiles")
    .update({ parent_id: referrerId })
    .eq("id", memberId);

  if (error) {
    throw error;
  }

  return true;
}
