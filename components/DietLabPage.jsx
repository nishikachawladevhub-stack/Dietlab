import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';
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
  const programsSectionRef = useRef(null);
  const contactRef = useRef(null);
  const bentoSectionRef = useRef(null);
  const introSectionRef = useRef(null);
  const whySectionRef = useRef(null);
  const whyImageWrapRef = useRef(null);
  const faqSectionRef = useRef(null);
  const calendlySectionRef = useRef(null);
  const calendlyContainerRef = useRef(null);
  const calendlyInitRef = useRef(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    recipes: false,
    contact: false,
    bento: false,
    intro: false,
    why: false,
    faq: false,
    calendly: false,
  });

  const CALENDLY_URL = 'https://calendly.com/dietlab-health/30min';

  const initCalendly = useCallback(() => {
    if (typeof window === 'undefined' || calendlyInitRef.current) return;
    const el = calendlyContainerRef.current;
    if (!el || !window.Calendly) return;
    window.Calendly.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: el,
    });
    calendlyInitRef.current = true;
  }, []);

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqItems = [
    {
      q: "How do you personalize each diet plan?",
      a: "Every plan is built around your habits, food preferences, schedule, and health goals — not a generic template. It’s designed to fit your life, not disrupt it.",
    },
    {
      q: "Do I need to follow strict rules or restrictions?",
      a: "No strict rules here. The focus is on creating a balanced approach you can realistically maintain without feeling restricted.",
    },
    {
      q: "What if I have a busy or unpredictable routine?",
      a: "Your plan adapts to your routine — whether you’re working long hours, traveling, or managing a hectic schedule.",
    },
    {
      q: "Will I get guidance along the way?",
      a: "Yes, you’ll receive continuous support, regular check-ins, and adjustments to keep your progress steady and sustainable.",
    },
    {
      q: "Is this approach suitable for beginners?",
      a: "Absolutely. Whether you’re just starting or restarting your journey, the process is simple, guided, and easy to follow.",
    },
    {
      q: "Can I still eat out or enjoy social events?",
      a: "Of course. You’ll learn how to make smarter choices while still enjoying outings, without guilt or confusion.",
    },
    {
      q: "How is progress measured?",
      a: "Progress isn’t just about weight — it includes energy levels, consistency, habits, and overall well-being.",
    },
    {
      q: "What makes this sustainable long-term?",
      a: "The focus is on building habits that fit naturally into your life, so you don’t have to “restart” again and again.",
    },
  ];

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
      threshold: 0.04,
      rootMargin: '0px 0px -10px 0px',
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
    if (whySectionRef.current) {
      whySectionRef.current.setAttribute('data-section', 'why');
      observer.observe(whySectionRef.current);
    }
    if (whyImageWrapRef.current) {
      whyImageWrapRef.current.setAttribute('data-section', 'why');
      observer.observe(whyImageWrapRef.current);
    }
    if (faqSectionRef.current) {
      faqSectionRef.current.setAttribute('data-section', 'faq');
      observer.observe(faqSectionRef.current);
    }
    if (calendlySectionRef.current) {
      calendlySectionRef.current.setAttribute('data-section', 'calendly');
      observer.observe(calendlySectionRef.current);
    }

    // Hero section should be visible immediately
    setIsVisible((prev) => ({ ...prev, hero: true }));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Calendly: init when script is cached; Script onLoad handles first load
  useEffect(() => {
    initCalendly();
    return () => {
      calendlyInitRef.current = false;
      if (calendlyContainerRef.current) {
        calendlyContainerRef.current.innerHTML = '';
      }
    };
  }, [initCalendly]);

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
                  onClick={() => {
                    document.getElementById("programs-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  See Plans
                </button>
              </div>

                {/* Right: Small Image */}
                <div className={styles.heroImageWrapper}>
                <Image 
                  src="/images/experience.jpg" 
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

      {/* Tip: Our Approach (Stepper) */}
      <div className="stepperSection">
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
              <Step
                image="/images/step.jpg"
                imageAlt="DietLab nutrition approach overview"
              >
                <h2>OUR APPROACH</h2>
                <p>Here’s how DietLab helps you achieve your health goals step by step.</p>
              </Step>

              <Step
                image="/images/women.jpg"
                imageAlt="Personal consultation and lifestyle review"
              >
                <h2>Consultation</h2>
                <p>We understand your lifestyle, body, and goals before starting.</p>
              </Step>

              <Step
                image="/images/meal_plan.jpg"
                imageAlt="Personalized meal planning"
              >
                <h2>Personalized Plan</h2>
                <p>A custom nutrition plan designed only for you.</p>
              </Step>

              <Step
                image="/images/review.jpg"
                imageAlt="Tracking progress and reviews"
              >
                <h2>Tracking & Reviews</h2>
                <p>We track your progress and refine your plan so you stay consistent and on course.</p>
              </Step>
            </Stepper>
          </div>
        </div>
      </div>

      {/* Our Programs Section */}
      <section
        id="programs-section"
        ref={programsSectionRef}
        className={styles.programsSection}
      >
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

      {/* Recipes Section */}
      <section
        ref={recipesRef}
        className={`${styles.servicesSection} ${styles.homeRecipesSection} ${isVisible.recipes ? styles.fadeInUp : ''}`}
      >
        <h1 className={styles.sectionTitle}>Our Recipes</h1>
        <div className={styles.servicesContainer}>
          {(recipes.length > 0 ? recipes : fallbackRecipes).map((recipe) => (
            <div className={styles.serviceCard} key={recipe._id || recipe.id}>
              <h3 className={styles.serviceCardTitle}>{recipe.title}</h3>
              <p className={styles.serviceCardText}>{recipe.description}</p>
          </div>
          ))}
        </div>
      </section>

      {/* Why It Works Section */}
      <section ref={whySectionRef} className={styles.whySection}>
        <div className={styles.whyContainer}>
          <h2 className={styles.whyHeading}>Why It Works</h2>
          <p className={styles.whySubtitle}>
            Built for Real, Sustainable Results
          </p>
        </div>

        <div ref={whyImageWrapRef} className={styles.whyImageWrap}>
          <Image
            src="/images/bghello.png"
            alt="Weekly planner laptop"
            width={1400}
            height={900}
            className={styles.whyImage}
          />
          <div className={styles.whyChipsLeft}>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              Personalized Plans for Your Lifestyle
            </div>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              Science-Backed Nutrition Strategy
            </div>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              Sustainable Habits You Can Keep
            </div>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              Ongoing Guidance and Accountability
            </div>
          </div>
          <div className={styles.whyChipsRight}>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              No Extreme Dieting Required
            </div>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              Built Around Your Routine
            </div>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              Simple, Practical Meal Plans
            </div>
            <div className={`${styles.whyChip} ${isVisible.why ? styles.whyChipInView : ''}`}>
              Long-Term Lifestyle Change
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

      {/* Book consultation — Calendly */}
      <section
        id="booking"
        ref={calendlySectionRef}
        className={`${styles.calendlySection} ${
          isVisible.calendly ? styles.fadeInUp : ''
        }`}
      >
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
          onLoad={initCalendly}
        />
        <h2 className={styles.calendlyHeading}>Book Your Free Consultation</h2>
        <div className={styles.calendlyCard}>
          <div
            ref={calendlyContainerRef}
            className={styles.calendlyEmbed}
            aria-label="Schedule a meeting on Calendly"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq-section"
        ref={faqSectionRef}
        className={`${styles.faqSection} ${isVisible.faq ? styles.fadeInUp : ""}`}
      >
        <div className={styles.faqInner}>
          <div
            className={`${styles.faqHeadingBlock} ${
              isVisible.faq ? styles.faqHeadingInView : ""
            }`}
          >
            <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
          </div>
          <p className={styles.faqIntro}>
            Straight answers about how DietLab plans work for real life.
          </p>

          <div className={styles.faqList}>
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.q}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestionBtn}
                    onClick={() =>
                      setOpenFaqIndex((prev) => (prev === index ? null : index))
                    }
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqQuestionText}>{item.q}</span>
                    <span className={styles.faqChevron} aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={styles.faqAnswer}
                    hidden={!isOpen}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.faqFooter}>
            <p className={styles.faqClosing}>
              💡 Not sure where to start? Let’s figure it out together.
            </p>
            <button
  type="button"
  className={styles.faqCtaButton}
  onClick={() => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }}
>
  👉 Get Started
</button>
          </div>
        </div>
      </section>

      <button className={styles.bookBtn} onClick={() => {
  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
}}>
  Start with a Free Consultation
</button>

      {/* Site footer — replaces previous CTA block */}
      <footer
        id="contact-section"
        ref={contactRef}
        className={`${styles.siteFooter} ${isVisible.contact ? styles.fadeInUp : ''}`}
      >
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Image
              src="/images/diet_lab-navbar-logo(1).png"
              alt="DietLab"
              width={260}
              height={65}
              className={styles.footerLogo}
              unoptimized
            />
            <p className={styles.footerBio}>
              Personalized nutrition plans and online consultations — built around
              your lifestyle so you can stay consistent and feel your best.
            </p>
            <div className={styles.footerSocial} aria-label="Social links">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialBtn}
                aria-label="X (Twitter)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialBtn}
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialBtn}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialBtn}
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          <nav className={styles.footerNav} aria-label="Footer">
            <div className={styles.footerNavCol}>
              <span className={styles.footerNavHeading}>Explore</span>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => router.push('/recipes')}
              >
                Healthy recipes
              </button>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => scrollToSection(aboutRef)}
              >
                About
              </button>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => scrollToSection(programsSectionRef)}
              >
                Programs
              </button>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => scrollToSection(bentoSectionRef)}
              >
                What you&apos;ll experience
              </button>
            </div>
            <div className={styles.footerNavCol}>
              <span className={styles.footerNavHeading}>Learn</span>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => scrollToSection(whySectionRef)}
              >
                Why it works
              </button>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => scrollToSection(faqSectionRef)}
              >
                FAQs
              </button>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => router.push('/recipes')}
              >
                Recipe ideas
              </button>
            </div>
            <div className={styles.footerNavCol}>
              <span className={styles.footerNavHeading}>Connect</span>
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => scrollToSection(contactRef)}
              >
                Contact
              </button>
              <button
                type="button"
                className={`${styles.footerLink} ${styles.footerLinkAccent}`}
                onClick={() => scrollToSection(contactRef)}
              >
                Book consultation
              </button>
            </div>
          </nav>
        </div>

        <div className={styles.footerSub}>
          <p className={styles.footerLegal}>
            <span>Privacy &amp; terms</span>
            <span className={styles.footerLegalSep}>|</span>
            <span>DietLab — personalized nutrition</span>
          </p>
        </div>
      </footer>

    </div>
  );
};

export default DietLabPage;
