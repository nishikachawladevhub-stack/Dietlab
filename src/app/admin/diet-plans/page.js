import styles from "../admin.module.css";
import BackButton from "../../../components/BackButton";

export default function DietPlansPage() {
  return (
    <main className={styles.adminContainer}>
      <BackButton />
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Diet Plan Builder</h1>
        <p className={styles.adminSubtitle}>
          Create diet plans using templates and food references.
        </p>
      </header>

      <div className={styles.adminGrid}>
        <a
          href="https://docs.google.com/spreadsheets/d/1KTGuCr2R6z437hXK56ycc_0Bvd3N85jE/copy" target="_blank"
      
          rel="noopener noreferrer"
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>📊</div>
          <h2 className={styles.cardTitle}>Open Diet Template</h2>
          <p className={styles.cardDescription}>
            Open the Excel diet template and start creating a plan.
          </p>
        </a>

        <a
          href="https://docs.google.com/document/d/1RiQohqXl_esWGf3Mk_K1n4M3_cAayJLTTIBkXMLP-w4/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>🍽</div>
          <h2 className={styles.cardTitle}>Food Reference Chart</h2>
          <p className={styles.cardDescription}>
            View categorized food options for building diets.
          </p>
        </a>

        <a
          href="public/diet-template.xlsx"
          download
          className={styles.adminCard}
        >
          <div className={styles.cardIcon}>⬇️</div>
          <h2 className={styles.cardTitle}>Download Template</h2>
          <p className={styles.cardDescription}>
            Download the ready-made diet plan Excel sheet.
          </p>
        </a>
      </div>
    </main>
  );
}