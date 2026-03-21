import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/DietLabPage.module.css';
import ScrollStack from './ScrollStack';
import { getRecipes } from '../src/lib/sanity';
import Stepper, { Step } from "../src/components/ui/stepper";

const DietLabPage = () => {
  const router = useRouter();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const recipesRef = useRef(null);
  const contactRef = useRef(null);
  const bentoSectionRef = useRef(null);
  const introSectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    recipes: false,
    contact: false,
    bento: false,
    intro: false,
  });

  const [activeProgramId, setActiveProgramId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bentoParallax, setBentoParallax] = useState({ scrollY: 0, mouseX: 0, mouseY: 0 });
  const [name, setName] = useState("");

  const programs = [
    {
      id: 'weight-management',
      name: 'Weight Management',
      description: 'Sustainable fat loss with personalized nutrition and lifestyle guidance.',
      highlights: [
        'Custom calorie & macro targets',
        'Habit-based coaching',
        'Plate building guidance',
        'Progress tracking & reviews',
      ],
      who: 'Individuals looking to lose or manage weight in a healthy, sustainable way — without crash diets.',
      includes: [
        'Detailed lifestyle & nutrition assessment',
        'Customized meal structure and portion guidance',
        'Check-ins to review progress and adjust the plan',
        'Support with eating out, travel, and social situations',
      ],
      duration: 'Typically 8–12 weeks, depending on your goals.',
    },
    {
      id: 'hormonal-health',
      name: 'Hormonal Health',
      description: 'Targeted nutrition support for PCOS, thyroid, and metabolic balance.',
      highlights: [
        'Symptom-focused nutrition mapping',
        'Blood work-based adjustments',
        'Energy & mood management',
        'Lifestyle rhythm planning',
      ],
      who: 'Women dealing with PCOS, thyroid concerns, irregular cycles, or related metabolic issues.',
      includes: [
        'Assessment of symptoms, medication and reports',
        'Personalized nutrition framework for hormones',
        'Snack and meal timing guidance',
        'Coaching on movement, sleep and stress',
      ],
      duration: 'Usually 12 weeks, with scope to extend for ongoing support.',
    },
    {
      id: 'diabetes-cardiac',
      name: 'Diabetes & Cardiac Care',
      description: 'Structured plans designed to support blood sugar control and heart health.',
      highlights: [
        'Blood sugar–friendly meal planning',
        'Portion and carb quality education',
        'Heart-healthy fat & fibre focus',
        'Report review with your physician’s inputs',
      ],
      who: 'Adults with prediabetes, diabetes, high cholesterol, hypertension, or a cardiac history.',
      includes: [
        'Review of medical reports and medications',
        'Glycaemic control–focused meal structure',
        'Education on label reading and carb choices',
        'Support for festivals, travel and family meals',
      ],
      duration: 'Generally 12 weeks, with follow-up options for long-term management.',
    },
    {
      id: 'maternal-child',
      name: 'Maternal & Child Nutrition',
      description:
        'Expert guidance for pregnancy, postpartum recovery, and growing children.',
      highlights: [
        'Trimester-wise requirements',
        'Postpartum recovery support',
        'Picky eater strategies',
        'Family-friendly meal ideas',
      ],
      who: 'Expecting mothers, new mothers, and parents wanting structured nutrition for their child.',
      includes: [
        'Tailored guidance for pregnancy or postpartum stage',
        'Nutrient-dense, practical meal ideas',
        'Support for weight regain or loss after delivery',
        'Age-appropriate guidelines for infants and children',
      ],
      duration: 'Typically 8–16 weeks depending on stage and family needs.',
    },
  ];

  const toggleProgram = (programId) => {
    setActiveProgramId((prev) => (prev === programId ? null : programId));
  };

  const programsLeft = programs.filter((_, index) => index % 2 === 0);
  const programsRight = programs.filter((_, index) => index % 2 === 1);

  const fallbackRecipes = [
    {
      id: 'fallback-1',
      title: 'Balanced Breakfast Ideas',
      description:
        'A collection of easy, nutrient-dense breakfast recipes to start your day feeling light, full and focused.',
    },
    {
      id: 'fallback-2',
      title: 'Everyday Lunch & Dinner Bowls',
      description:
        'Simple, adaptable bowl-style meals designed for busy weekdays, with clear structure and variety.',
    },
    {
      id: 'fallback-3',
      title: 'Smart Snacks & Sides',
      description:
        'Snack and side ideas that support stable energy, better cravings control and flexible eating.',
    },
  ];

  // Smooth scroll function for navigation
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section');
          if (section) {
            setIsVisible((prev) => ({ ...prev, [section]: true }));
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    if (homeRef.current) {
      homeRef.current.setAttribute('data-section', 'hero');
      observer.observe(homeRef.current);
    }
    if (aboutRef.current) {
      aboutRef.current.setAttribute('data-section', 'about');
      observer.observe(aboutRef.current);
    }
    if (recipesRef.current) {
      recipesRef.current.setAttribute('data-section', 'recipes');
      observer.observe(recipesRef.current);
    }
    if (contactRef.current) {
      contactRef.current.setAttribute('data-section', 'contact');
      observer.observe(contactRef.current);
    }
    if (bentoSectionRef.current) {
      bentoSectionRef.current.setAttribute('data-section', 'bento');
      observer.observe(bentoSectionRef.current);
    }
    if (introSectionRef.current) {
      introSectionRef.current.setAttribute('data-section', 'intro');
      observer.observe(introSectionRef.current);
    }

    // Hero section should be visible immediately
    setIsVisible((prev) => ({ ...prev, hero: true }));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Fetch recipes from Sanity (for Recipes section) using shared helper
  useEffect(() => {
    getRecipes()
      .then((data) => {
        if (Array.isArray(data)) {
          setRecipes(data);
        }
      })
      .catch(() => {
        // Fail silently – fallback recipes will be used
      });
  }, []);

  // Parallax + mouse effect for "What You Will Experience" section
  useEffect(() => {
    const section = bentoSectionRef.current;
    if (!section) return;

    let rafId = null;
    const latest = { scrollY: 0, mouseX: 0, mouseY: 0 };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setBentoParallax({
          scrollY: latest.scrollY,
          mouseX: latest.mouseX,
          mouseY: latest.mouseY,
        });
      });
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const distanceFromCenter = sectionCenter - viewportHeight / 2;
      const parallaxOffset = Math.max(
        -60,
        Math.min(60, distanceFromCenter * 0.1)
      );
      latest.scrollY = parallaxOffset;
      requestUpdate();
    };

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rawMouseX = (e.clientX - centerX) / (rect.width / 2);
      const rawMouseY = (e.clientY - centerY) / (rect.height / 2);
      const mouseX = Math.max(-1, Math.min(1, rawMouseX));
      const mouseY = Math.max(-1, Math.min(1, rawMouseY));
      latest.mouseX = mouseX;
      latest.mouseY = mouseY;
      requestUpdate();
    };

    const handleMouseLeave = () => {
      latest.mouseX = 0;
      latest.mouseY = 0;
      requestUpdate();
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    section.addEventListener('mousemove', handleMouseMove, { passive: true });
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Top Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
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
            onClick={() => scrollToSection(homeRef)}
          >
            Home
          </button>
          <button
            className={styles.navItem}
            onClick={() => scrollToSection(aboutRef)}
          >
            About
          </button>
          <button
            className={styles.navItem}
            onClick={() => router.push('/recipes')}
          >
            Recipes
          </button>
          <button
            className={styles.navItem}
            onClick={() => scrollToSection(contactRef)}
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={homeRef}
        className={`${styles.heroSection} ${isVisible.hero ? styles.fadeInUp : ''}`}
      >
        {/* Background Layer */}
        <div className={styles.heroBackground}>
          <div className={styles.heroBgImage}></div>
          <div className={styles.heroOverlay}></div>
        </div>

        {/* Foreground Content Container */}
        <div className={styles.heroForeground}>
          <div className={styles.heroContainer}>
            {/* Combined White Box with Image, Content and Approach */}
              <div
                ref={introSectionRef}
                className={`${styles.introSection} ${
                  isVisible.intro ? styles.introInView : ""
                }`}
              >
              <div className={styles.heroContentCard}>
              {/* Centered Logo at Top */}
              <div className={styles.heroLogoWrapper}>
              <Image 
                  src="/images/diet_lab_white-div.jpeg" 
                  alt="DietLab Logo" 
                  width={500}
                  height={120}
                  className={styles.heroLogo}
                priority
                unoptimized
              />
            </div>

              {/* Top Section: Image and Content Side by Side */}
              <div className={styles.heroTopSection}>
                {/* Left: Text Content */}
                <div className={styles.heroContentWrapper}>
                <h1 className={styles.heroHeading}>
                  A lab for smart, sustainable nutrition
                </h1>
                <p className={styles.heroDescription}>
                  We turn nutrition into a sustainable lifestyle — blending science-backed guidance with practical, enjoyable meals. Every plan is thoughtfully personalized to match your goals, preferences, and daily routine.
                </p>
                
                {/* Areas We Specialize In - Chip Style */}
                <div className={styles.specializationsTextWrapper}>
                  <h3 className={styles.specializationsHeading}>Areas We Specialize In</h3>
                  <div className={styles.specializationsChipsGrid}>
                    <div
                      className={`${styles.specializationChip} ${
                        isVisible.hero ? styles.fadeInUp : ""
                      }`}
                      style={{ animationDelay: "0.1s" }}
                    >
                      <span className={styles.chipIcon}>⚖</span>
                      <span className={styles.chipText}>Weight Loss & Metabolism</span>
                    </div>
                    <div
                      className={`${styles.specializationChip} ${
                        isVisible.hero ? styles.fadeInUp : ""
                      }`}
                      style={{ animationDelay: "0.2s" }}
                    >
                      <span className={styles.chipIcon}>⚕</span>
                      <span className={styles.chipText}>PCOS / Hormonal Health</span>
                    </div>
                    <div
                      className={`${styles.specializationChip} ${
                        isVisible.hero ? styles.fadeInUp : ""
                      }`}
                      style={{ animationDelay: "0.3s" }}
                    >
                      <span className={styles.chipIcon}>💉</span>
                      <span className={styles.chipText}>Diabetes Management</span>
                    </div>
                    <div
                      className={`${styles.specializationChip} ${
                        isVisible.hero ? styles.fadeInUp : ""
                      }`}
                      style={{ animationDelay: "0.4s" }}
                    >
                      <span className={styles.chipIcon}>🦋</span>
                      <span className={styles.chipText}>Thyroid Support</span>
                    </div>
                    <div
                      className={`${styles.specializationChip} ${
                        isVisible.hero ? styles.fadeInUp : ""
                      }`}
                      style={{ animationDelay: "0.5s" }}
                    >
                      <span className={styles.chipIcon}>🌿</span>
                      <span className={styles.chipText}>Gut Health</span>
                    </div>
                    <div
                      className={`${styles.specializationChip} ${
                        isVisible.hero ? styles.fadeInUp : ""
                      }`}
                      style={{ animationDelay: "0.6s" }}
                    >
                      <span className={styles.chipIcon}>🤰</span>
                      <span className={styles.chipText}>Pregnancy Nutrition</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className={styles.primaryButton}
                  onClick={() => scrollToSection(contactRef)}
                >
                  See Plans
                </button>
              </div>

                {/* Right: Small Image */}
                <div className={styles.heroImageWrapper}>
                <Image 
                  src="/images/img%203.jpg" 
                  alt="Diet Lab Nutrition" 
                    width={400}
                    height={400}
                  className={styles.heroSideImage}
                  priority
                  unoptimized
                />
            </div>
          </div>

              </div>
            </div>

              <div className="stepperSection">
              {/* Bottom Section: Our Approach */}
              <div style={{ margin: "120px 0" }}>
                <div data-stepper-name={name}>
                  <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                      setName(String(step));
                      console.log(step);
                    }}
                    onFinalStepCompleted={() => {
                      setName("Done");
                      console.log("Done");
                    }}
                    backButtonText="Back"
                    nextButtonText="Next"
                  >
                    <Step>
                      <h2>OUR APPROACH</h2>
                      <p>Here’s how DietLab helps you achieve your health goals step by step.</p>
                    </Step>

                    <Step>
                      <h2>Consultation</h2>
                      <p>We understand your lifestyle, body, and goals before starting.</p>
                    </Step>

                    <Step>
                      <h2>Personalized Plan</h2>
                      <p>A custom nutrition plan designed only for you.</p>
                    </Step>

                  <Step>
                      <h2>Tracking & Reviews</h2>
                      <p>We track your progress and refine your plan so you stay consistent and on course.</p>
                  </Step>
                  </Stepper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className={styles.programsSection}>
        <div className={styles.programsContainer}>
          <h2 className={styles.programsHeading}>Our Programs</h2>
          <p className={styles.programsIntro}>
            Four focused nutrition paths to meet you where you are — each built to be practical, personal, and sustainable.
          </p>
          <div className={styles.programsAtmosphere}>
            <div className={styles.programsStackCol}>
              <ScrollStack
                programs={programsLeft}
                activeProgramId={activeProgramId}
                toggleProgram={toggleProgram}
              />
            </div>
            <div className={styles.programsStackCol}>
              <ScrollStack
                programs={programsRight}
                activeProgramId={activeProgramId}
                toggleProgram={toggleProgram}
              />
            </div>
          </div>
                </div>
      </section>

      {/* Bento Grid Section */}
      <section ref={bentoSectionRef} className={styles.bentoSection}>
        <div
          className={styles.bentoBgLayer}
          style={{
            transform: `translate3d(0, ${bentoParallax.scrollY * 0.2}px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
          aria-hidden="true"
        />
        <div
          className={`${styles.bentoDeco} ${styles.bentoDeco1}`}
          style={{
            transform: `translate3d(${bentoParallax.mouseX * 10}px, ${
              bentoParallax.scrollY * 0.5 + bentoParallax.mouseY * 10
            }px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
          aria-hidden="true"
        />
        <div
          className={`${styles.bentoDeco} ${styles.bentoDeco2}`}
          style={{
            transform: `translate3d(${bentoParallax.mouseX * -10}px, ${
              bentoParallax.scrollY * 0.5 + bentoParallax.mouseY * -10
            }px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
          aria-hidden="true"
        />
        <div
          className={`${styles.bentoDeco} ${styles.bentoDeco3}`}
          style={{
            transform: `translate3d(${bentoParallax.mouseX * 12}px, ${
              bentoParallax.scrollY * 0.8 + bentoParallax.mouseY * 12
            }px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
          aria-hidden="true"
        />
        <div className={styles.bentoContainer}>
          <h2 className={styles.bentoHeading}>What You Will Experience</h2>
          <div className={styles.bentoGrid}>
            <div
              className={`${styles.bentoChip} ${styles.bentoChipLarge} ${
                isVisible.bento ? styles.fadeInUp : ""
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <div className={styles.bentoLargeContent}>
                <div className={styles.bentoChipIcon}>🍽️</div>

                <p className={styles.bentoLargeTitle}>
                  Built around your favourite foods
                </p>

                <p className={styles.bentoLargeDesc}>
                  Your plan is designed using foods you already enjoy, so it never feels restrictive or forced.
                </p>

                <p className={styles.bentoLargeDesc}>
                  This makes it easier to stay consistent, build better habits, and actually enjoy the process.
                </p>
              </div>
            </div>
            <div
              className={`${styles.bentoChip} ${styles.bentoChipMedium} ${
                isVisible.bento ? styles.fadeInUp : ""
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className={styles.bentoChipIcon}>📅</div>
              <div className={styles.bentoChipContent}>
                <p className={styles.bentoChipTitle}>Smart Planning</p>
                <p className={styles.bentoChipDesc}>
                  Plans tailored to your daily routine so you stay consistent without effort.
                </p>
              </div>
            </div>
            <div
              className={`${styles.bentoChip} ${styles.bentoChipMedium} ${
                isVisible.bento ? styles.fadeInUp : ""
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className={styles.bentoChipIcon}>✈️</div>
              <div className={styles.bentoChipContent}>
                <p className={styles.bentoChipTitle}>Travel Friendly</p>
                <p className={styles.bentoChipDesc}>
                  Stay on track even while travelling with flexible and easy meal options.
                </p>
              </div>
            </div>
            <div
              className={`${styles.bentoChip} ${styles.bentoChipSmall} ${
                isVisible.bento ? styles.fadeInUp : ""
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className={styles.bentoChipIcon}>🎯</div>
              <div className={styles.bentoChipContent}>
                <p className={styles.bentoChipTitle}>Goal Focused</p>
                <p className={styles.bentoChipDesc}>
                  Designed to help you achieve fitness, fat loss, or health goals faster.
                </p>
              </div>
            </div>
            <div
              className={`${styles.bentoChip} ${styles.bentoChipSmall} ${
                isVisible.bento ? styles.fadeInUp : ""
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <div className={styles.bentoChipIcon}>🧘</div>
              <div className={styles.bentoChipContent}>
                <p className={styles.bentoChipTitle}>Stress Free Eating</p>
                <p className={styles.bentoChipDesc}>
                  Removes confusion and food anxiety with clear and simple guidance.
                </p>
              </div>
            </div>
            <div
              className={`${styles.bentoChip} ${styles.bentoChipSmall} ${
                isVisible.bento ? styles.fadeInUp : ""
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <div className={styles.bentoChipIcon}>👤</div>
              <div className={styles.bentoChipContent}>
                <p className={styles.bentoChipTitle}>Personal Guidance</p>
                <p className={styles.bentoChipDesc}>
                  Customized for your body type, lifestyle, and personal preferences.
                </p>
              </div>
                </div>
            <div
              className={`${styles.bentoChip} ${styles.bentoChipMedium} ${
                isVisible.bento ? styles.fadeInUp : ""
              }`}
              style={{ animationDelay: "0.7s" }}
            >
              <div className={styles.bentoChipIcon}>💪</div>
              <div className={styles.bentoChipContent}>
                <p className={styles.bentoChipTitle}>Sustainable Habits</p>
                <p className={styles.bentoChipDesc}>
                  Build long-term habits that actually fit your real life.
                </p>
              </div>
              </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about-section"
        ref={aboutRef}
        className={`${styles.aboutSection} ${isVisible.about ? styles.fadeInUp : ''}`}
      >
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <p className={styles.sectionText}>
            We are a team of dedicated nutritionists offering remote
            consultations to help you achieve your health goals. Our
            personalized approach ensures that every diet plan is tailored to
            your unique needs, lifestyle, and preferences. Experience the
            convenience of online consultations from the comfort of your home,
            with expert guidance every step of the way.
          </p>
        </div>
      </section>

      {/* Recipes Section */}
      <section
        ref={recipesRef}
        className={`${styles.servicesSection} ${isVisible.recipes ? styles.fadeInUp : ''}`}
      >
        <h2 className={styles.sectionTitle}>Our Recipes</h2>
        <div className={styles.servicesContainer}>
          {(recipes.length > 0 ? recipes : fallbackRecipes).map((recipe) => (
            <div className={styles.serviceCard} key={recipe._id || recipe.id}>
              <h3 className={styles.serviceCardTitle}>{recipe.title}</h3>
              <p className={styles.serviceCardText}>{recipe.description}</p>
          </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section
        id="contact-section"
        ref={contactRef}
        className={`${styles.contactSection} ${isVisible.contact ? styles.fadeInUp : ''}`}
      >
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p className={styles.ctaText}>
            Take the first step towards a healthier you. Book your
            consultation today and receive personalized nutrition guidance
            tailored to your needs.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </section>

    </div>
  );
};

export default DietLabPage;
