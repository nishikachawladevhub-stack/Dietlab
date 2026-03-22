'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '../styles/DietLabPage.module.css';

const NavbarClient = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (path) => {
    if (pathname === '/' && path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div 
        className={styles.navbarBrand}
        onClick={() => handleNavClick('/')}
      >
        <Image 
          src="/images/diet_lab-navbar-logo(1).png" 
          alt="DietLab Logo" 
          width={280}
          height={70}
          className={styles.navbarLogo}
          priority
          unoptimized
        />
      </div>
      <div className={styles.navbarMenu}>
        <button
          className={styles.navItem}
          onClick={() => handleNavClick('/')}
        >
          Home
        </button>
        <button
          className={styles.navItem}
          onClick={() => {
            if (pathname !== '/about') {
              router.push('/about');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          About
        </button>
        <button
          className={styles.navItem}
          onClick={() => handleNavClick('/recipes')}
        >
          Recipes
        </button>
        <button
          className={styles.navItem}
          onClick={() => {
            if (pathname === '/') {
              const contactSection = document.getElementById('contact-section');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                router.push('/#contact');
              }
            } else {
              router.push('/#contact');
            }
          }}
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default NavbarClient;

