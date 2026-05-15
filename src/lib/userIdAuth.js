export const USER_ID_PREFIX = "MJ";
export const USER_ID_PATTERN = /^MJ\d{9}$/;

export function buildUserId(digits) {
  return `${USER_ID_PREFIX}${digits}`;
}

/** Internal auth email — not shown to users; maps user_id to Supabase Auth. */
export function authEmailFromUserId(userId) {
  return `${userId.toLowerCase()}@referralsystem.internal`;
}
