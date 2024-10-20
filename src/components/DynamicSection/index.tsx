import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import styles from './DynamicSection.module.css';
import { DynamicSectionLayoutInterface } from '../../utils/types/DynamicSection.types';

const DynamicSection: React.FC<DynamicSectionLayoutInterface> = ({
  heading,
  subheading,
  sections,
}) => {
  const location = useLocation();

  const getPadding = () => {
    if (location.pathname === '/subscription') return ' 1.25rem 0';
    if (location.pathname === '/device') return ' 1.875rem 0';
    return '0';
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>{heading}</p>
      <p className={styles.subheading}>{subheading}</p>

      <hr className={styles.divider} />

      {sections.map((section, index) => (
        <div key={index} className={styles.section}>
          <div
            className={styles.sectionContent}
            style={{ padding: getPadding() }}
          >
            {section.content}
          </div>
          {index < sections.length - 1 && <hr className={styles.divider} />}
        </div>
      ))}
    </div>
  );
};

export default DynamicSection;
