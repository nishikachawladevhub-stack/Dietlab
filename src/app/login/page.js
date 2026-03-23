"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAdminSession, setAdminSession } from "@/lib/adminAuth";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hasAdminSession()) {
      router.replace("/admin");
      return;
    }
    setReady(true);
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const expectedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";
    const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

    if (!expectedEmail || !expectedPassword) {
      setError(
        "Admin login is not configured. Set NEXT_PUBLIC_ADMIN_EMAIL and NEXT_PUBLIC_ADMIN_PASSWORD in your environment."
      );
      return;
    }

    const trimmedEmail = email.trim();
    if (
      trimmedEmail === expectedEmail &&
      password === expectedPassword
    ) {
      setSubmitting(true);
      setAdminSession();
      router.replace("/admin");
      return;
    }

    setError("Invalid email or password.");
  };

  if (!ready) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <p className={styles.subtitle} role="status">
            Checking session…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin sign in</h1>
        <p className={styles.subtitle}>
          Enter your credentials to access the dashboard.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label} htmlFor="admin-email">
            Email
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.label} htmlFor="admin-password">
            Password
            <div className={styles.inputWrap}>
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={`${styles.input} ${styles.inputPassword}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.toggleVisibility}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button
            type="submit"
            className={styles.submit}
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
