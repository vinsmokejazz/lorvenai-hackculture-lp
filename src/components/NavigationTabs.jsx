import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './NavigationTabs.css';

/**
 * NavigationTabs - Pixel-perfect horizontal navigation tabs
 * Hidden on mobile devices (≤768px)
 */

// Config-driven tabs array
const TABS_CONFIG = [
  { id: 'about', label: 'About', section: 'about' },
  { id: 'problems', label: 'Problem Statements', section: 'problems' },
  { id: 'prizes', label: 'Prizes', section: 'prizes' },
  { id: 'timelines', label: 'Timelines', section: 'timeline' },
];

const NavigationTabs = ({ defaultActiveTab = 'about' }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    
    const element = document.getElementById(tab.section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="nav-tabs-container" role="navigation" aria-label="Main navigation">
      <div className="nav-tabs-inner">
        {TABS_CONFIG.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tabs-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className="nav-tabs-label">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.span 
                className="nav-tabs-underline"
                layoutId="nav-underline"
                style={{ transform: 'scaleX(1)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationTabs;
