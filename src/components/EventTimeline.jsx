import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, defaultViewport } from '../lib/motion';

const timelineData = [
  {
    title: 'REGISTRATION',
    subtitle: '',
    start: 'DEC 29TH',
    end: 'JAN 11TH',
  },
  {
    title: 'IDEA SUBMISSION',
    subtitle: '',
    start: 'JAN 3RD',
    end: 'JAN 11TH',
  },
  {
    title: 'SHORTLIST ANNOUNCEMENT',
    subtitle: '',
    date: 'JAN 15TH',
  },
  {
    title: 'HACKATHON DAY',
    subtitle: '',
    start: 'JAN 24TH',
    end: 'JAN 25TH',
  },
];

// Animation timing constants
const TIMING = {
  dotDuration: 0.25,
  lineDuration: 0.35,
  textDuration: 0.35,
  stepGap: 0.1,
};

// Calculate cumulative delay for each element
const getAnimationDelay = (index, element) => {
  // Each step: dot (0.25s) + line (0.35s) + gap (0.1s) = 0.7s per step
  const stepTime = TIMING.dotDuration + TIMING.lineDuration + TIMING.stepGap;
  const baseDelay = index * stepTime;
  
  switch (element) {
    case 'dot':
      return baseDelay;
    case 'line':
      return baseDelay + TIMING.dotDuration;
    case 'text':
      return baseDelay + TIMING.dotDuration + TIMING.stepGap;
    default:
      return baseDelay;
  }
};

// Dot animation variant
const dotVariant = (index) => ({
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.dotDuration,
      ease: 'easeOut',
      delay: getAnimationDelay(index, 'dot'),
    },
  },
});

// Line segment animation variant (scaleX from left)
const lineVariant = (index) => ({
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: TIMING.lineDuration,
      ease: 'easeOut',
      delay: getAnimationDelay(index, 'line'),
    },
  },
});

// Text block animation variant
const textVariant = (index) => ({
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.textDuration,
      ease: 'easeOut',
      delay: getAnimationDelay(index, 'text'),
    },
  },
});

const EventTimeline = () => {
  const viewportConfig = { once: true, amount: 0.4 };

  return (
    <section id="timeline" className="event-timeline-section">
      <div className="section-content">
        <div className="event-timeline-container">
          <motion.h2 
            className="event-timeline-heading"
            variants={fadeUp(20)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            EVENT <span className="event-timeline-heading-accent">TIMELINE</span>
          </motion.h2>

          <div className="event-timeline-wrapper">
            {/* Timeline Row: Dots and Segmented Lines */}
            <div className="event-timeline-track">
              {timelineData.map((_, index) => (
                <div key={index} className="event-timeline-column">
                  {/* Dot */}
                  <motion.div
                    className="event-timeline-dot"
                    variants={dotVariant(index)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                  />
                  
                  {/* Line segment after dot */}
                  <motion.div
                    className={`event-timeline-segment ${index === timelineData.length - 1 ? 'event-timeline-segment--last' : ''}`}
                    variants={lineVariant(index)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                  />
                </div>
              ))}
            </div>

            {/* Timeline Text Items */}
            <div className="event-timeline-items">
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="event-timeline-item"
                  variants={textVariant(index)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                >
                  <h3 className="event-timeline-item-title">{item.title}</h3>
                  {item.subtitle && (
                    <p className="event-timeline-item-subtitle">
                      {item.subtitle.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < item.subtitle.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                  <div className="event-timeline-item-dates">
                    {item.date ? (
                      <p><span className="date-label">DATE</span>: {item.date}</p>
                    ) : (
                      <>
                        <p><span className="date-label">START</span>: {item.start}</p>
                        <p><span className="date-label">END</span>: {item.end}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventTimeline;
