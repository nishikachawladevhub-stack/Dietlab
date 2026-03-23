/**
 * Canonical sessionStorage flag for admin login (checked on every /admin load & navigation).
 * Tab-scoped: closing the tab clears storage — user must sign in again on a new visit.
 * Value "true" means logged in; missing or other → not logged in.
 */
export const ADMIN_IS_LOGGED_IN_KEY = "isLoggedIn";

/** Legacy keys from older localStorage auth — removed on login/logout only */
const LEGACY_LOCAL_KEYS = [
  "dietlab_admin_authenticated",
  "isLoggedIn", // if previously stored in localStorage
];

function clearLegacyLocalAuth() {
  if (typeof window === "undefined") return;
  try {
    for (const key of LEGACY_LOCAL_KEYS) {
      localStorage.removeItem(key);
    }
  } catch {
    /* ignore */
  }
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ADMIN_IS_LOGGED_IN_KEY);
    clearLegacyLocalAuth();
  } catch {
    /* ignore */
  }
}

export function setAdminSession() {
  if (typeof window === "undefined") return;
  try {
    clearLegacyLocalAuth();
    sessionStorage.setItem(ADMIN_IS_LOGGED_IN_KEY, "true");
  } catch {
    /* ignore */
  }
}

/** True only if sessionStorage has a valid logged-in flag (page load / navigation). */
export function hasAdminSession() {
  if (typeof window === "undefined") return false;
  try {
    const v = sessionStorage.getItem(ADMIN_IS_LOGGED_IN_KEY);
    return v === "true" || v === "1";
  } catch {
    return false;
  }
}
