import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/DietLabPage.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleNavClick = (path) => {
    if (router.pathname === '/' && path === '/') {
      // If we're on home page and clicking Home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (router.pathname !== path) {
      // Navigate to different page
      router.push(path);
    }
  };

  const isRecipesPage = router.pathname === '/recipes' || router.pathname.startsWith('/recipes/');

  return (
    <nav className={`${styles.navbar} ${isRecipesPage ? styles.navbarRecipes : ''}`}>
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
            if (router.pathname !== '/about') {
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
            if (router.pathname === '/') {
              // On home page, scroll to contact section
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

export default Navbar;

