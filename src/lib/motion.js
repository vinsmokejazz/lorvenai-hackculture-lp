/**
 * Reusable Framer Motion Animation Variants
 * 
 * Premium, calm, SaaS-style animations with:
 * - No layout shift
 * - No scale > 1.03
 * - GPU-safe transforms (opacity, translateY, translateX)
 * - Reduced motion support
 */

// Default viewport settings for scroll-triggered animations
export const defaultViewport = {
  once: true,
  amount: 0.3,
};

// Default transition for all animations
export const defaultTransition = {
  duration: 0.5,
  ease: 'easeOut',
};

// Faster transition for interactive elements
export const fastTransition = {
  duration: 0.25,
  ease: 'easeOut',
};

/**
 * Fade Up Animation
 * opacity: 0 → 1, y: offset → 0
 */
export const fadeUp = (offset = 24) => ({
  hidden: {
    opacity: 0,
    y: offset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
});

/**
 * Fade In Animation (no movement)
 * opacity: 0 → 1
 */
export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

/**
 * Stagger Container
 * Use as parent to stagger children animations
 */
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0) => ({
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

/**
 * Stagger Item - Fade Up variant for staggered children
 */
export const staggerItem = (offset = 20) => ({
  hidden: {
    opacity: 0,
    y: offset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
});

/**
 * Hero Text Animation
 * Subtle upward motion with fade
 */
export const heroText = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/**
 * CTA Button Animation (delayed)
 */
export const ctaButton = (delay = 0.1) => ({
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...defaultTransition,
      delay,
    },
  },
});

/**
 * Section Container Animation
 * Subtle fade-up for entire sections
 */
export const sectionContainer = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/**
 * Timeline Dot Sequential Animation
 */
export const timelineDot = (index) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...defaultTransition,
      delay: index * 0.1,
    },
  },
});

/**
 * Timeline Column Animation
 */
export const timelineColumn = (index) => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...defaultTransition,
      delay: index * 0.1,
    },
  },
});

/**
 * FAQ Row Animation
 */
export const faqRow = (index) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...defaultTransition,
      delay: index * 0.06,
    },
  },
});

/**
 * Check for reduced motion preference
 */
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get motion props based on reduced motion preference
 * Returns empty object if user prefers reduced motion
 */
export const getMotionProps = (variants, custom) => {
  if (shouldReduceMotion()) {
    return {};
  }
  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: defaultViewport,
    variants,
    custom,
  };
};
