/** Max direct referrals allowed under one parent (one parent, up to 4 children). */
export const MAX_DIRECT_REFERRALS = 4;

export function isReferralLimitReached(childCount) {
  return childCount >= MAX_DIRECT_REFERRALS;
}

export function referralSlotsRemaining(childCount) {
  return Math.max(0, MAX_DIRECT_REFERRALS - childCount);
}

export function referralLimitMessage() {
  return `Referral limit reached. Each member can have at most ${MAX_DIRECT_REFERRALS} direct referrals.`;
}
