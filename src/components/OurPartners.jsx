import React from 'react';
import { motion } from 'framer-motion';
import { 
  fadeUp, 
  staggerContainer, 
  staggerItem, 
  defaultViewport 
} from '../lib/motion';

const partners = [
  {
    id: 1,
    name: 'Lorven.AI',
    logo: '/lorven.ai.png',
  },
  {
    id: 2,
    name: 'HackCulture',
    logo: '/hackculture.png',
  },
  {
    id: 3,
    name: 'SriVG',
    logo: '/srivg.png',
    fill: true,
  },
];

const OurPartners = () => {
  return (
    <section className="our-partners-section">
      <div className="section-content">
        <motion.div 
          className="our-partners-container"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp(24)}
        >
          <motion.h2 
            className="our-partners-heading"
            variants={fadeUp(16)}
          >
            OUR PARTNERS
          </motion.h2>

          <motion.div 
            className="our-partners-cards"
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
              flexWrap: 'wrap',
            }}
          >
            {partners.map((partner) => (
              <motion.div 
                key={partner.id}
                className="our-partners-card" 
                variants={staggerItem(20)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: partner.fill ? 'clamp(1rem, 2.4vw, 2rem)' : 'clamp(1.5rem, 3vw, 2.5rem)',
                  width: 'clamp(180px, 30vw, 300px)',
                  height: 'clamp(100px, 16vw, 160px)',
                  overflow: partner.fill ? 'hidden' : 'visible',
                }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: partner.fill ? '100%' : 'auto',
                    height: partner.fill ? '100%' : 'auto',
                    objectFit: 'contain',
                    transform: partner.fill ? 'scale(1.5)' : 'none',
                    transformOrigin: 'center',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartners;
