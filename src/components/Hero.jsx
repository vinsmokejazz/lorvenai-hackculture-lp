import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationTabs from './NavigationTabs';
import { heroText, ctaButton, defaultViewport } from '../lib/motion';

// Geometric icons for the animated button
const GeometricIcons = {
  // Triangle pointing down
  Triangle: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="4,6 20,6 12,20" />
    </svg>
  ),
  // Pentagon pointing up
  Pentagon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 22,9 18,21 6,21 2,9" />
    </svg>
  ),
  // Square
  Square: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" />
    </svg>
  ),
};

const iconSequence = ['Triangle', 'Pentagon', 'Square'];

const Hero = () => {
  // Icon animation state
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  // Continuous icon rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % iconSequence.length);
    }, 2500); // ~2.5 seconds per icon

    return () => clearInterval(interval);
  }, []);
  // Countdown target: January 31st, 2026 at 10:00 AM
  const targetDate = new Date('2026-01-31T10:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Hero Logo Image */}
        <motion.div 
          className="hero-logo-container"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={heroText}
        >
          <img 
            src="/ceni AI-03 1.png" 
            alt="LORVEN AI - CINE AI HACKFEST - AI x FILMMAKING HACKATHON" 
            className="hero-logo-image"
          />
        </motion.div>

        <motion.a 
          href="https://hackculture.io/hackathons/cine-ai-hackfest" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="register-btn-hero"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={ctaButton(0.1)}
        >
          {/* Text Segment - Static */}
          <span className="register-btn-hero__text">REGISTER NOW</span>
          
          {/* Icon Segment - Animated with smooth shape-shift */}
          <span className="register-btn-hero__icon-segment">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={iconSequence[currentIconIndex]}
                className="register-btn-hero__icon"
                initial={{ y: 8, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -8, opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {React.createElement(GeometricIcons[iconSequence[currentIconIndex]])}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.a>

        {/* Countdown Timer */}
        <motion.div 
          className="countdown-box"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={ctaButton(0.2)}
        >
          {/* Event Info Header */}
          <div className="event-info-header">
            <div className="event-info-item">
              <div className="event-info-label">DATE</div>
              <div className="event-info-value">31st January 2026</div>
            </div>
            <div className="event-info-item">
              <div className="event-info-label">TIME</div>
              <div className="event-info-value">10 AM</div>
            </div>
            <div className="event-info-item">
              <div className="event-info-label">WHERE</div>
              <div className="event-info-value">Hyderabad</div>
            </div>
          </div>

          {/* Countdown Timer Grid */}
          <div className="countdown-container">
            <motion.div 
              className="countdown-item"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.span 
                className="countdown-value"
                key={timeLeft.days}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatNumber(timeLeft.days)}
              </motion.span>
              <span className="countdown-label">DAYS</span>
            </motion.div>
            
            <motion.div 
              className="countdown-item"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span 
                className="countdown-value"
                key={timeLeft.hours}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatNumber(timeLeft.hours)}
              </motion.span>
              <span className="countdown-label">HRS</span>
            </motion.div>
            
            <motion.div 
              className="countdown-item"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span 
                className="countdown-value"
                key={timeLeft.minutes}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatNumber(timeLeft.minutes)}
              </motion.span>
              <span className="countdown-label">MINS</span>
            </motion.div>
            
            <motion.div 
              className="countdown-item"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.span 
                className="countdown-value"
                key={timeLeft.seconds}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatNumber(timeLeft.seconds)}
              </motion.span>
              <span className="countdown-label">SECS</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/*  Navigation Tabs */}
      <NavigationTabs defaultActiveTab="about" />
    </section>
  );
};

export default Hero;
