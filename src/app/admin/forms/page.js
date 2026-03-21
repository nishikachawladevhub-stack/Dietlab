import styles from "../admin.module.css";
import BackButton from "../../../components/BackButton";

export default function FormsPage() {
  return (
    <main className={styles.adminContainer}>
      <BackButton />
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Forms & Submissions</h1>
        <p className={styles.adminSubtitle}>
          Manage Google Forms and check responses.
        </p>
      </header>

      <div className={styles.adminGrid}>
        <a
          href="https://docs.google.com/forms/d/1Qm1YT_9cqmt-eDj6I9zUL8eGgXy2VHPvkfwZpB_px-k/edit"
          target="_blank"
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>📋</div>
          <h2 className={styles.cardTitle}>Open Diet Check-In Form</h2>
          <p className={styles.cardDescription}>
            Open the client diet check-in Google Form.
          </p>
        </a>

        <a
          href="https://docs.google.com/spreadsheets/d/1R72yjH_2HBZzeoc68zvRyn8IHoRw7KPtGtX2qwuv-34"
          target="_blank"
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>📊</div>
          <h2 className={styles.cardTitle}>View Form Responses</h2>
          <p className={styles.cardDescription}>
            See all submitted responses in Google Sheets.
          </p>
        </a>

        <a
  href="https://docs.google.com/forms/u/0/"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.adminCard}
>
  <div className={styles.cardIcon}>➕</div>
  <h2 className={styles.cardTitle}>Add New Form</h2>
  <p className={styles.cardDescription}>
    Save links to new Google Forms used for clients.
  </p>
</a>
      </div>
    </main>
  );
}