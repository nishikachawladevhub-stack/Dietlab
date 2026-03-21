import styles from "../admin.module.css";
import BackButton from "../../../components/BackButton";

export default function ClientsPage() {
  return (
    <main className={styles.adminContainer}>
      <BackButton />
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Client Management</h1>
        <p className={styles.adminSubtitle}>
          Manage client profiles and track diet plans.
        </p>
      </header>

      <div className={styles.adminGrid}>

        <a
          href="/studio/structure/client"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>➕</div>
          <h2 className={styles.cardTitle}>Add Client</h2>
          <p className={styles.cardDescription}>
            Create a new client profile in the CMS.
          </p>
        </a>

        <a
          href="/admin/clients/list"
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>📋</div>
          <h2 className={styles.cardTitle}>View Clients</h2>
          <p className={styles.cardDescription}>
            See all clients stored in the system.
          </p>
        </a>

        <a
          href="https://docs.google.com/document/d/1akqr5gonfAh2HyLA7Fpp_3BWtprHk5qqvBV6Nr8ioLg/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>📝</div>
          <h2 className={styles.cardTitle}>Notes Workspace</h2>
          <p className={styles.cardDescription}>
            Open your notes and documents workspace.
          </p>
        </a>

      </div>
    </main>
  );
}