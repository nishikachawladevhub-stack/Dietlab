"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminSession, hasAdminSession } from "@/lib/adminAuth";
import styles from "@/app/admin/admin.module.css";

/**
 * Wraps all `src/app/admin/**` routes via `admin/layout.js`.
 * On every mount and every in-app navigation (pathname change), re-reads
 * sessionStorage `isLoggedIn` — no session → redirect to /login; no admin UI until allowed.
 */
export default function AdminAuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (hasAdminSession()) {
      setAllowed(true);
      return;
    }
    setAllowed(false);
    router.replace("/login");
  }, [router, pathname]);

  const handleLogout = () => {
    clearAdminSession();
    router.replace("/login");
  };

  if (!allowed) {
    return (
      <div className={styles.adminAuthLoading} role="status" aria-live="polite">
        <span>Checking access…</span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className={styles.adminLogoutBtn}
        onClick={handleLogout}
      >
        Log out
      </button>
      {children}
    </>
  );
}
