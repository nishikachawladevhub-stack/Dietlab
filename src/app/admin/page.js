
import Link from 'next/link';
import styles from './admin.module.css';
import BackButton from '../../components/BackButton';

export const metadata = {
  title: 'Priyas Dashboard - DietLab',
  description: 'Manage your DietLab platform from one place.',
};

export default function AdminDashboard() {
  const sections = [
    {
      title: 'Diet Plan Builder',
      description: 'Create and manage personalized diet plans for clients.',
      href: '/admin/diet-plans',
      icon: '🥗',
    },
    {
      title: 'Client Management',
      description: 'View and manage client profiles and progress.',
      href: '/admin/clients',
      icon: '👥',
    },
    {
      title: 'Recipe Publishing',
      description: 'Add or edit recipes available on the platform.',
      href: '/studio',
      icon: '📝',
    },
    {
      title: 'Forms & Submissions',
      description: 'Review contact forms, assessments, and feedback.',
      href: '/admin/forms',
      icon: '📥',
    },
  ];

  return (
    <main className={styles.adminContainer}>
      <BackButton />
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Admin Dashboard</h1>
        <p className={styles.adminSubtitle}>Manage your DietLab platform from one place.</p>
      </header>
      
      <div className={styles.adminGrid}>
        {sections.map((section, index) => (
          <Link href={section.href} key={index} className={styles.adminCard}>
            <div className={styles.cardIcon}>{section.icon}</div>
            <h2 className={styles.cardTitle}>{section.title}</h2>
            <p className={styles.cardDescription}>{section.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
