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
    name: 'Lorven.AI',
    logo: '/lorven.ai.png',
  },
  {
    id: 2,
    name: 'HackCulture',
    logo: '/hackculture.png',
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
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  width: 'clamp(180px, 30vw, 300px)',
                  height: 'clamp(100px, 16vw, 160px)',
                }}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
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
