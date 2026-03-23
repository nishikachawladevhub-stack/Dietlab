import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/AboutPage.module.css';

export default function AboutPage() {
  const [heroReady, setHeroReady] = useState(false);
  const storyRef = useRef(null);
  const [storyVisible, setStoryVisible] = useState(false);
  const blogRef = useRef(null);
  const [blogVisible, setBlogVisible] = useState(false);
  const lowerRef = useRef(null);
  const [lowerVisible, setLowerVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = lowerRef.current;
    if (!el || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLowerVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = storyRef.current;
    if (!el || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStoryVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = blogRef.current;
    if (!el || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBlogVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mediumUrl = 'https://pchawla87.medium.com';

  return (
    <div className={styles.page}>
      <main className={styles.aboutMain}>
        <div className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>About Us</h1>
          </div>

          <section
            className={`${styles.hero} ${heroReady ? styles.heroVisible : ''}`}
            aria-labelledby="about-hero-heading"
          >
            <div className={styles.heroGrid}>
            <div className={styles.sageBlock}>
              <p className={styles.kicker}>About the nutritionist</p>
              <h1 id="about-hero-heading" className={styles.headline}>
                Hi, I’m Priya
              </h1>
              <h4 className={styles.degree}>
  Postgraduate Diploma in Nutrition & Dietetics (PGDN)
</h4>
              <div className={styles.lede}>
                <p>
                  I&apos;m a nutritionist based in Greater Noida, working with
                  individuals across India and globally to build sustainable,
                  realistic eating habits.
                </p>
                <p>
                  Being a merchant navy wife, I&apos;ve experienced firsthand how
                  unpredictable routines, travel, and lifestyle shifts can impact
                  health. This shaped my approach, one that blends practical
                  nutrition with flexibility, rather than rigid diet rules.
                </p>
                <p>
                  I believe nutrition should feel natural, adaptable, and tailored
                  to your life, not restrictive. Every plan I create is designed
                  around your schedule, preferences, and goals, whether you&apos;re
                  at home or navigating a demanding lifestyle. My focus is simple:
                  helping you build habits that last, so you can feel your best —
                  consistently, not temporarily.
                </p>
              </div>
            </div>

            <div className={styles.imageColumn} aria-hidden="true">
              <div className={styles.imageFrame}>
                <Image
                  src="/images/priya.jpeg"
                  alt="Welcoming, healthy lifestyle"
                  fill
                  sizes="(max-width: 960px) 90vw, 420px"
                  priority
                />
              </div>
            </div>
            </div>
          </section>

          <section
            ref={storyRef}
            id="story-of-dietlab"
            aria-labelledby="story-heading"
            className={`${styles.storySection} ${
              storyVisible ? styles.storyVisible : ''
            }`}
          >
            <div className={styles.storyInner}>
              <div className={styles.storyTextCol}>
              <p className={styles.storyEyebrow}>Building a healthier, simpler approach</p>
              <h2 id="story-heading" className={styles.storyHeading}>
                The story behind DietLab
              </h2>
              <div className={styles.storyBody}>
                <p>
                  DietLab began from something deeply personal navigating health,
                  routine, and a lifestyle that rarely stays still. Those everyday
                  challenges with nutrition made it clear how hard it can be to find
                  guidance that actually matches real life.
                </p>
                <p>
                  Over time, most diets felt restrictive or copied from someone
                  else&apos;s playbook. What works for one person often
                  doesn&apos;t work for another; one-size-fits-all is usually where
                  frustration starts. The question became how to make eating well
                  practical instead of performative.
                </p>
                <p>
                  Through experimenting, learning, and refining what sustainable
                  nutrition can look like, DietLab took shape with a simple aim:
                  flexible plans that respect your schedule and preferences. Today
                  we focus on simplicity, sustainability, and personalization —
                  because lasting wellbeing is about consistency and balance in a
                  routine you can keep, not perfection on paper.
                </p>
              </div>
              </div>
              <div className={styles.storyLogoCol}>
                <div className={styles.storyLogoCard}>
                  <Image
                    src="/images/diet_lab-navbar-logo(1).png"
                    alt="DietLab"
                    width={280}
                    height={70}
                    className={styles.storyLogoImg}
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          ref={blogRef}
          id="from-the-blog"
          aria-labelledby="blog-heading"
          className={`${styles.blogSection} ${
            blogVisible ? styles.blogVisible : ''
          }`}
        >
          <div className={styles.blogInner}>
            <div className={styles.blogTextCol}>
              <h2 id="blog-heading" className={styles.blogHeading}>
                From the Blog
              </h2>
              <p className={styles.blogIntro}>
                I write on Medium about nutrition habits, realistic meal planning,
                and the small shifts that make health sustainable meaning less noise,
                more clarity. It&apos;s about finding a steady rhythm with food and
                lifestyle, instead of chasing extremes.
              </p>
              <p className={styles.blogIntro}>
                Like navigating with a quiet compass, I focus on choices that keep
                you grounded, simple, consistent, and actually doable in real life.
                No overwhelm, no rigid rules, just a calmer, more intentional way
                to stay on course.
              </p>
              <p className={styles.blogIntro}>
                It&apos;s a space for longer reflections beyond quick tips, where
                nutrition feels less like pressure and more like something you can
                return to, again and again.
              </p>
              <a
                href={mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.blogCta}
              >
                Read on Medium
              </a>
            </div>
            <div className={styles.blogCardWrap}>
              <a
                href={mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.blogCard}
              >
                <div className={styles.blogCardImage}>
                  <Image
                    src="/images/medium.jpg"
                    alt="Featured blog post preview"
                    fill
                    sizes="(max-width: 900px) 90vw, 400px"
                    className={styles.blogCardImg}
                  />
                </div>
                <div className={styles.blogCardBody}>
                  <h3 className={styles.blogCardTitle}>
                    Eating well without the overwhelm
                  </h3>
                  <p className={styles.blogCardExcerpt}>
                    Thoughts on building routines that stick — and why flexibility
                    often beats perfection.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <div className={styles.main}>
          <section
            ref={lowerRef}
            className={`${styles.lower} ${lowerVisible ? styles.lowerVisible : ''}`}
            aria-labelledby="about-lower-heading"
          >
            <h2 id="about-lower-heading" className={styles.lowerTitle}>
              A calm, guided approach
            </h2>
            <p className={styles.lowerText}>
              Whether you&apos;re managing weight, hormones, or family nutrition, we
              focus on sustainable habits — not quick fixes — so progress lasts.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
