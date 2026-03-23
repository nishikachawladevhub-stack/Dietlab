import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styles from '../styles/ContactPage.module.css';
import { scheduleCalendlyInlineInit } from '../src/lib/calendlyInline';

const CALENDLY_URL = 'https://calendly.com/dietlab-health/30min';

export default function ContactPage() {
  const calendlyContainerRef = useRef(null);
  const calendlyInitRef = useRef(false);
  const [calendlyFallback, setCalendlyFallback] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const cleanup = scheduleCalendlyInlineInit({
      containerRef: calendlyContainerRef,
      url: CALENDLY_URL,
      initRef: calendlyInitRef,
      onGiveUp: () => {
        setCalendlyFallback(true);
        if (calendlyContainerRef.current) {
          calendlyContainerRef.current.innerHTML = '';
        }
      },
    });
    return cleanup;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <h1 className={styles.pageTitle}>Get in touch</h1>
        <p className={styles.pageSubtitle}>
          Tell us a little about you — we&apos;ll read every message and respond
          with care, no pressure.
        </p>

        <div className={styles.twoCol}>
          <div className={styles.leftCol}>
            <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
              <p className={styles.formTitle}>Send a message</p>

              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-goal" className={styles.label}>
                  Goal / What you need help with
                </label>
                <input
                  id="contact-goal"
                  name="goal"
                  type="text"
                  className={styles.input}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. sustainable weight loss, PCOS, family meals"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Anything else you&apos;d like us to know?"
                  rows={5}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send message
              </button>

              {submitted && (
                <p className={styles.successMsg} role="status">
                  Thank you — we&apos;ve received your note. We&apos;ll get back to you
                  soon.
                </p>
              )}
            </form>
          </div>

          <aside className={styles.sideCard}>
            <h2 className={styles.sideHeading}>Let&apos;s Connect</h2>
            <p className={styles.sideText}>
              Whether you&apos;re taking the first step or getting back on track,
              we&apos;re here to help you build nutrition habits that fit your real
              life — gently and sustainably.
            </p>
            <p className={styles.sideText}>
              Share what you&apos;re hoping for, and we&apos;ll respond with warmth and
              clarity — never a one-size-fits-all script.
            </p>
            <a
              href="mailto:hello@dietlab.example"
              className={styles.emailLink}
            >
              hello@dietlab.example
            </a>
            <p className={styles.reassurance}>
              We usually reply within 1–2 business days. No spam — just thoughtful
              support when you need it.
            </p>
          </aside>
        </div>

        <section
          id="booking"
          className={styles.bookingSection}
          aria-labelledby="booking-heading"
        >
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="afterInteractive"
          />
          <h2 id="booking-heading" className={styles.bookingHeading}>
            Book a Consultation
          </h2>
          <p className={styles.bookingLine}>
            Choose a time that works for you.
          </p>
          <div className={styles.bookingCard}>
            <div
              ref={calendlyContainerRef}
              className={styles.calendlyEmbed}
              aria-label="Schedule a meeting on Calendly"
              style={{ display: calendlyFallback ? 'none' : undefined }}
              aria-hidden={calendlyFallback}
            />
            {calendlyFallback && (
              <div className={styles.calendlyFallback}>
                <p>Calendar couldn&apos;t load here.</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book on Calendly →
                </a>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
