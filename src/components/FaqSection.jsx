import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { 
  fadeUp, 
  faqRow, 
  defaultViewport 
} from '../lib/motion';

const FAQ_ITEMS = [
  {
    id: 'item-1',
    question: 'Is this hackathon beginner friendly?',
    answer:
      "Yes! This hackathon welcomes participants of all skill levels. Whether you're a beginner or an experienced developer, you'll find exciting challenges and learning opportunities.",
  },
  {
    id: 'item-2',
    question: 'Can we use AI tools like ChatGPT, Runway, or Midjourney?',
    answer:
      'Absolutely! We encourage the use of AI tools and platforms to build innovative solutions. Feel free to leverage ChatGPT, Runway, Midjourney, and other AI technologies to create your projects.',
  },
  {
    id: 'item-3',
    question: 'Do we need prior filmmaking experience?',
    answer:
      'No prior filmmaking experience is required! This hackathon brings together diverse skill sets - developers, designers, filmmakers, and creative technologists. Teams will have a mix of talents to create comprehensive solutions.',
  },
  {
    id: 'item-4',
    question: 'Will internet and power be provided?',
    answer:
      'Yes! The venue will have high-speed internet connectivity and power outlets available for all participants throughout the hackathon duration.',
  },
];

const FaqRow = ({ id, question, answer, index }) => {
  return (
    <motion.div
      variants={faqRow(index)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      style={{ width: '100%', marginBottom: index < 3 ? '24px' : '0' }}
    >
      <AccordionItem value={id} className="faq-item" style={{ margin: 0 }}>
        <AccordionTrigger className="faq-trigger">{question}</AccordionTrigger>
        <AccordionContent className="faq-content">{answer}</AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

const FaqSection = () => {
  return (
    <section className="faq-section">
      <div className="section-content">
        <motion.div 
          className="faq-container"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUp(24)}
        >
          <motion.h2 
            className="faq-heading"
            variants={fadeUp(16)}
          >
            FAQs
          </motion.h2>
          <Accordion type="single" collapsible className="faq-accordion">
            {FAQ_ITEMS.map((item, index) => (
              <FaqRow 
                key={item.id} 
                id={item.id} 
                question={item.question} 
                answer={item.answer}
                index={index}
              />
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
