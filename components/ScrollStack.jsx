import React from 'react';
import Lottie from 'lottie-react';
import styles from '../styles/DietLabPage.module.css';

// TODO: update these paths/names if your JSON files differ
import weightAnimation from '../animations/weight.json';
import meditationWomenAnimation from '../animations/meditation-women.json';
import cardiacAnimation from '../animations/cardiac.json';
import pregnancyAnimation from '../animations/pregnancy.json';

const programAnimations = {
  'weight-management': weightAnimation,
  'hormonal-health': meditationWomenAnimation,
  'diabetes-cardiac': cardiacAnimation,
  'maternal-child': pregnancyAnimation,
};
const ScrollStack = ({ programs, activeProgramId, toggleProgram }) => {
  return (
    <div className={styles.scrollStack}>
      <div className={styles.scrollStackTrack}>
        {programs.map((program, index) => (
          <article
            key={program.id}
            className={`${styles.scrollCard} ${
              activeProgramId === program.id ? styles.scrollCardActive : ''
            }`}
            aria-labelledby={`${program.id}-title`}
          >
                      <div className={styles.programHeaderRow}>
  {programAnimations[program.id] && (
    <div
      style={{
        width: 90,
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Lottie
        animationData={programAnimations[program.id]}
        loop
        autoplay
        style={{ width: 90, height: 90 }}
      />
    </div>
  )}

  <div className={styles.programTitleBlock}>
    <h3
      id={`${program.id}-title`}
      className={styles.programTitle}
    >
      {program.name}
    </h3>
    <p className={styles.programDescription}>
      {program.description}
    </p>
  </div>
</div>

            <ul className={styles.programHighlights}>
              {program.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.programActionsRow}>
              <button
                className={styles.programButton}
                onClick={() => toggleProgram(program.id)}
                type="button"
              >
                {activeProgramId === program.id ? 'Hide Details' : 'View Program'}
              </button>
            </div>

            <div
              className={`${styles.programExpanded} ${
                activeProgramId === program.id
                  ? styles.programExpandedActive
                  : ''
              }`}
            >
              <p className={styles.programExpandedSubtitle}>Who this is for</p>
              <p className={styles.programExpandedText}>{program.who}</p>

              <p className={styles.programExpandedSubtitle}>
                What&apos;s included
              </p>
              <ul className={styles.programExpandedList}>
                {program.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className={styles.programExpandedSubtitle}>
                Expected duration
              </p>
              <p className={styles.programExpandedText}>{program.duration}</p>

              <p className={styles.programExpandedNote}>
                Medical nutrition support is also available for other health
                conditions as needed.
              </p>

              <button
                className={styles.programExpandedPrimaryButton}
                type="button"
              >
                Book Consultation
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;


