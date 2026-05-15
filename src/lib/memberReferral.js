import {
  isReferralLimitReached,
  MAX_DIRECT_REFERRALS,
  referralLimitMessage,
} from "./referralLimits";

export function countDirectReferrals(profiles, parentId) {
  return profiles.filter((profile) => profile.parent_id === parentId).length;
}

export function wouldCreateReferralCycle(memberId, referrerId, profiles) {
  if (!memberId || !referrerId || memberId === referrerId) {
    return true;
  }

  const parentById = new Map(profiles.map((profile) => [profile.id, profile.parent_id]));
  let currentId = referrerId;
  const visited = new Set();

  while (currentId) {
    if (currentId === memberId) {
      return true;
    }
    if (visited.has(currentId)) {
      return true;
    }
    visited.add(currentId);
    currentId = parentById.get(currentId) || null;
  }

  return false;
}

export function validateMemberLink({ memberId, referrerId, profiles, allowReplace = false }) {
  if (!memberId || !referrerId) {
    return "Select both a member and a referrer.";
  }

  if (memberId === referrerId) {
    return "A member cannot be linked under themselves.";
  }

  const member = profiles.find((profile) => profile.id === memberId);
  const referrer = profiles.find((profile) => profile.id === referrerId);

  if (!member || !referrer) {
    return "Selected member or referrer was not found.";
  }

  if (member.parent_id && member.parent_id !== referrerId && !allowReplace) {
    return "This member is already linked to another referrer. Unlink is not supported here.";
  }

  if (member.parent_id === referrerId) {
    return "This member is already linked under the selected referrer.";
  }

  const existingChildren = countDirectReferrals(profiles, referrerId);
  const isAlreadyChild = member.parent_id === referrerId;

  if (!isAlreadyChild && isReferralLimitReached(existingChildren)) {
    return referralLimitMessage();
  }

  if (wouldCreateReferralCycle(memberId, referrerId, profiles)) {
    return "Invalid link. This would create a circular referral chain.";
  }

  return null;
}

export { MAX_DIRECT_REFERRALS };
