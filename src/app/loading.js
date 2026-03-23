import styles from './loading.module.css';

/**
 * Root App Router loading UI — shows during segment transitions
 * under src/app (admin, recipe detail, studio, etc.).
 */
export default function Loading() {
  return (
    <div
      className={styles.root}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.ringWrap}>
        <div className={styles.pulse} aria-hidden />
        <div className={styles.ring} aria-hidden />
      </div>
      <span className={styles.srOnly}>Loading page</span>
    </div>
  );
}
