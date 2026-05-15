import { isAdminEmail } from "./adminAuth";
import { USER_ID_PATTERN } from "./userIdAuth";

const ADMIN_PROFILE_NAMES = new Set(["system admin", "admin"]);

/** Profile row created for admin — not a referral member. */
export function isAdminProfileRow(profile) {
  if (!profile) {
    return true;
  }

  const name = (profile.name || "").trim().toLowerCase();
  if (ADMIN_PROFILE_NAMES.has(name)) {
    return true;
  }

  return false;
}

/** True when profile belongs to a referral member (not admin or other non-member rows). */
export function isMemberProfile(profile, { adminAuthUserId } = {}) {
  if (!profile?.user_id || !USER_ID_PATTERN.test(profile.user_id)) {
    return false;
  }

  if (isAdminProfileRow(profile)) {
    return false;
  }

  if (adminAuthUserId && profile.id === adminAuthUserId) {
    return false;
  }

  return true;
}

export function filterMemberProfiles(profiles, options = {}) {
  return (profiles || []).filter((profile) => isMemberProfile(profile, options));
}

/** Exclude admin auth account if it was incorrectly given a profiles row. */
export function getAdminAuthUserId(user) {
  return user && isAdminEmail(user.email) ? user.id : null;
}
