import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import '../styles/Home.css';
import Hero from '../components/Hero';
import CircuitBackground from '../components/CircuitBackground';
import EventTimeline from '../components/EventTimeline';
import OurPartners from '../components/OurPartners';
// import FaqSection from '../components/FaqSection';
import ContactUs from '../components/ContactUs';
import { 
  fadeUp, 
  fadeIn, 
  staggerContainer, 
  staggerItem, 
  sectionContainer, 
  defaultViewport 
} from '../lib/motion';

// CONFIGURABLE COUNTDOWN TARGET DATE
const COUNTDOWN_TARGET_DATE = new Date('2026-01-31T10:00:00').getTime();

// Problem statements data
const problemStatements = [
  {
    id: 1,
    title: "Persistent Character Memory & Consistency System",
    description: "Build an AI-powered Character Memory System that maintains visual consistency of characters across frames, scenes, and prompts, solving one of the most critical challenges in AI-driven storyboarding and pre-visualization.",
    pdfUrl: "https://hackcultureplatform.blob.core.windows.net/event-assets/hackathons/694ecf082e08da8f8adb190c/problem_explanation_ncjciqefawa.pdf"
  },
  {
    id: 2,
    title: "Multimodal Scene Intent & Visual Planning Engine",
    description: "Create an AI system that extracts implicit creative intent such as emotion, mood, and visual tone from scripts and converts it into structured signals for storyboard generators and pre-visualization tools.",
    pdfUrl: "https://hackcultureplatform.blob.core.windows.net/event-assets/hackathons/694ecf082e08da8f8adb190c/problem_explanation_m23taxu8huc.pdf"
  },
  {
    id: 3,
    title: "AI-Based Scene Feasibility & Risk Predictor",
    description: "Develop an AI system that analyzes film scenes and predicts production feasibility, cost implications, and execution risks using reasoning-based evaluation to help filmmakers make informed pre-production decisions.",
    pdfUrl: "https://hackcultureplatform.blob.core.windows.net/event-assets/hackathons/694ecf082e08da8f8adb190c/problem_explanation_ell4ykac0us.pdf"
  },
  {
    id: 4,
    title: "Semantic Footage Search Engine",
    description: "Build a semantic search engine that enables editors to find footage using intent-based queries like \"hesitant reaction\" or \"tense pause,\" retrieving clips based on meaning and context rather than keywords.",
    pdfUrl: "https://hackcultureplatform.blob.core.windows.net/event-assets/hackathons/694ecf082e08da8f8adb190c/problem_explanation_nkuifvl3uv.pdf"
  },
  {
    id: 5,
    title: "Multimodal Best-Take Selection Assistant",
    description: "Create an AI assistant that evaluates multiple takes using multimodal signals including audio, video, and script alignment to automatically rank and recommend the best performances for editors.",
    pdfUrl: "https://hackcultureplatform.blob.core.windows.net/event-assets/hackathons/694ecf082e08da8f8adb190c/problem_explanation_5pkm715l3cp.pdf"
  },
  {
    id: 6,
    title: "Anti-Piracy Content Protection",
    description: "Create an advanced AI-based content fingerprinting system that generates unique audio-visual signatures for films, enabling real-time detection and removal of pirated content across social media platforms, messaging apps, and streaming services.",
    pdfUrl: null
  }
];

const Home = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextProblem = () => {
    setCurrentProblemIndex((prev) => (prev + 1) % problemStatements.length);
  };

  const prevProblem = () => {
    setCurrentProblemIndex((prev) => (prev - 1 + problemStatements.length) % problemStatements.length);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = COUNTDOWN_TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hackathon-landing">
      {/* Pixel-perfect Circuit Background */}
      <CircuitBackground />

      {/* Header Navigation */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <a
              href="https://lorvenaistudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Lorven AI Studio website"
            >
              <img src="/lorven.ai.png" alt="LORVEN AI STUDIO" className="header-logo" />
            </a>
            <img src="/hackculture.png" alt="HackCulture" className="header-logo header-logo--hackculture" />
          </div>
          <a href="https://hackculture.io/hackathons/cine-ai-hackfest" target="_blank" rel="noopener noreferrer" className="register-btn-header">
            REGISTER
          </a>
        </div>
      </header>
      <Hero />

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-content">
          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp(24)}
          >
            <motion.h2 
              className="about-heading"
              variants={fadeUp(16)}
            >
              ABOUT <span className="about-heading-accent">CINE AI HACKFEST</span>
            </motion.h2>

            <motion.div 
              className="about-body"
              variants={staggerContainer(0.06, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <motion.p variants={staggerItem(16)}>
                Cine AI Hackfest by Lorven AI Studio is a 24-hour, offline AI × Filmmaking hackathon bringing together developers and filmmakers to build the future of cinema with AI.
              </motion.p>
              <motion.p variants={staggerItem(16)}>
                Hosted in Hyderabad, the hackathon challenges participants to create real, working prototypes across storytelling, production, editing, and film marketing where technology meets creativity.
              </motion.p>
              <motion.p variants={staggerItem(16)}>
                Build in teams, ship bold ideas, and present to an expert jury. Top teams win cash prizes and recognition in the growing AI-film ecosystem.
              </motion.p>
              <motion.p className="about-tagline" variants={staggerItem(16)}>🚀 Build fast. Create boldly. Disrupt cinema with AI.</motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Lorven AI Section */}
      <section id="about-lorven" className="about-section about-lorven-section">
        <div className="section-content">
          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp(24)}
          >
            <motion.h2 
              className="about-heading"
              variants={fadeUp(16)}
            >
              ABOUT <span className="about-heading-accent">LORVEN AI</span>
            </motion.h2>

            <motion.div 
              className="about-body"
              variants={staggerContainer(0.06, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <motion.p variants={staggerItem(16)}>
                Lorven AI Studio is India's first AI-driven filmmaking platform, launched by acclaimed producer Dil Raju, the creative force behind films such as DJ, Vakeel Saab, Fidaa, Balagam, and Varisu (Varasudu).
              </motion.p>
              <motion.p variants={staggerItem(16)}>
                Built for filmmakers, writers, and producers, Lorven AI optimizes creative and production workflows while preserving artistic intent.
              </motion.p>
              <motion.p variants={staggerItem(16)}>
                The platform unifies four powerful modules:
              </motion.p>
              
              <motion.ul className="about-list" variants={staggerItem(16)}>
                <li>
                  <strong>Cine Scribe:</strong> From idea to production-ready scripts
                </li>
                <li>
                  <strong>Cine Sketch:</strong> Instant cinematic storyboards
                </li>
                <li>
                  <strong>Pitch Craft:</strong> Auto-generated pitch decks ready for investors and studios
                </li>
                <li>
                  <strong>Cine Flow:</strong> Complete planning with scheduling, locations, and call sheets
                </li>
              </motion.ul>

              <motion.p variants={staggerItem(16)}>
                Lorven AI enables creators to move faster, plan smarter, and deliver films with tighter control over timelines and budgets.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statements Section */}
      <section id="problems" className="problems-section">
        <motion.div 
          className="section-content"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeIn}
        >
          <div className="problems-container">
            <motion.h2 
              className="problems-heading"
              variants={fadeUp(20)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <span className="problems-heading-accent">PROBLEM</span> STATEMENTS
            </motion.h2>
            
            {/* Desktop Grid View */}
            {!isMobile && (
              <motion.div 
                className="problem-cards"
                variants={staggerContainer(0.08, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                {problemStatements.map((problem) => (
                  <motion.div className="problem-card" variants={staggerItem(20)} key={problem.id}>
                    <div className="problem-number">{problem.id}</div>
                    <h3 className="problem-title">{problem.title}</h3>
                    <p className="problem-description">{problem.description}</p>
                    {problem.pdfUrl && (
                      <a 
                        href={problem.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="problem-read-more-btn"
                      >
                        Read more
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Mobile Carousel View */}
            {isMobile && (
              <div className="problem-carousel">
                <motion.div 
                  className="problem-carousel-card"
                  key={currentProblemIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="problem-number">{problemStatements[currentProblemIndex].id}</div>
                  <h3 className="problem-title">{problemStatements[currentProblemIndex].title}</h3>
                  <p className="problem-description">{problemStatements[currentProblemIndex].description}</p>
                  {problemStatements[currentProblemIndex].pdfUrl && (
                    <a 
                      href={problemStatements[currentProblemIndex].pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="problem-read-more-btn"
                    >
                      Read more
                    </a>
                  )}
                </motion.div>
                
                <div className="problem-carousel-controls">
                  <button 
                    className="problem-carousel-btn" 
                    onClick={prevProblem}
                    aria-label="Previous problem"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="problem-carousel-dots">
                    {problemStatements.map((_, index) => (
                      <button
                        key={index}
                        className={`problem-carousel-dot ${index === currentProblemIndex ? 'active' : ''}`}
                        onClick={() => setCurrentProblemIndex(index)}
                        aria-label={`Go to problem ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button 
                    className="problem-carousel-btn" 
                    onClick={nextProblem}
                    aria-label="Next problem"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="prizes-section">
        <div className="section-content">
          <div className="prizes-container">
            <motion.h2 
              className="prizes-heading"
              variants={fadeUp(20)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              PRIZES: <span className="prizes-heading-accent">₹ 2 LAKH PRIZE POOL</span>
            </motion.h2>
            
            <motion.div 
              className="prize-cards"
              variants={staggerContainer(0.08, 0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <motion.div className="prize-card" variants={staggerItem(20)}>
                <div className="prize-label">WINNERS</div>
                <motion.div 
                  className="prize-amount"
                  variants={fadeIn}
                >₹ 1,00,000</motion.div>
              </motion.div>

              <motion.div className="prize-card" variants={staggerItem(20)}>
                <div className="prize-label">RUNNERS UP</div>
                <motion.div 
                  className="prize-amount"
                  variants={fadeIn}
                >₹ 60,000</motion.div>
              </motion.div>

              <motion.div className="prize-card" variants={staggerItem(20)}>
                <div className="prize-label">SECOND RUNNER UP</div>
                <motion.div 
                  className="prize-amount"
                  variants={fadeIn}
                >₹ 40,000</motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="prize-pool-point"
              variants={fadeUp(14)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <span className="prize-pool-point__dot" aria-hidden="true" />
              <p className="prizes-heading prize-pool-point__text">
                OPPORTUNITY TO GET HIRED BY{' '}
                <span className="prize-pool-point__highlight">LORVEN AI</span>{' '}
                STUDIO
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <EventTimeline />

      {/* Partners Section */}
      <OurPartners />

      {/* <FaqSection /> */}

      <ContactUs />

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://bento.me/hackculture" target="_blank" rel="noopener noreferrer" className="footer-link">Join Community</a>
            <a href="https://hackculture.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy</a>
            <a href="https://hackculture.io/legal/code-of-conduct" target="_blank" rel="noopener noreferrer" className="footer-link">Code Of Conduct</a>
          </div>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/hackculture/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/hackculture.io/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://x.com/Hack_Culture" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="X (Twitter)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;