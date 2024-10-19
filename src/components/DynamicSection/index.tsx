import React from 'react';
import styles from './DynamicSection.module.css';
import { DynamicSectionLayoutInterface } from '../../utils/types/DynamicSection.types';

const DynamicSection: React.FC<DynamicSectionLayoutInterface> = ({
  heading,
  subheading,
  sections,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>{heading}</p>
      <p className={styles.subheading}>{subheading}</p>

      <hr className={styles.divider} />

      {sections.map((section, index) => (
        <div key={index} className={styles.section}>
          <div className={styles.sectionContent}>{section.content}</div>
          {index < sections.length - 1 && <hr className={styles.divider} />}
        </div>
      ))}
    </div>
  );
};

export default DynamicSection;
