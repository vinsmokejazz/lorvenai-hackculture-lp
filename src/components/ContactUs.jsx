import React from 'react';
import { motion } from 'framer-motion';
import { 
  fadeUp, 
  fadeIn, 
  staggerContainer, 
  staggerItem, 
  defaultViewport 
} from '../lib/motion';

const CONTACTS = [
 
   {
    name: 'Manju Charan',
    phone: '+91 6362 635 358',
    email: 'manju.charan@hackculture.in',
  },
  {
    name: 'Manvendra Singh',
    phone: '+91 82095 50079',
    email: 'manvendra@hackculture.in',
  },
];

const ContactColumn = ({ name, phone, email, showDivider, index }) => {
  return (
    <motion.div 
      className={showDivider ? 'contact-col contact-col--divider' : 'contact-col'}
      variants={staggerItem(20)}
    >
      {showDivider && (
        <motion.div 
          className="contact-vertical-divider"
          variants={fadeIn}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0 }}
        />
      )}
      <h3 className="contact-name">{name}</h3>
      <ul className="contact-details">
        <li>{phone}</li>
        <li>{email}</li>
      </ul>
    </motion.div>
  );
};

const ContactUs = () => {
  return (
    <>
      <motion.div 
        className="contact-divider" 
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeIn}
      />
      <section className="contact-section">
        <div className="section-content">
          <motion.h2 
            className="contact-heading"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeUp(20)}
          >
            <div className=''>CONTACT US</div>
          </motion.h2>
          <motion.div 
            className="contact-grid"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {CONTACTS.map((contact, idx) => (
              <ContactColumn
                key={`${contact.email}-${idx}`}
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                showDivider={idx !== 0}
                index={idx}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
