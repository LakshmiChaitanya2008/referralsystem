/** Valid admin inbox (admin@mjchits@gmail.com is not a valid email format). */
export const ADMIN_EMAIL = "admin.mjchits@gmail.com";

export function isAdminEmail(email) {
  return email?.toLowerCase() === ADMIN_EMAIL;
}

export function isAdminUser(user) {
  return isAdminEmail(user?.email);
}
