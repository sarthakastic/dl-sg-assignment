import { PlanCardInterface } from '../../utils/types/PlanCard.types';
import styles from './PlanCard.module.css';

const PlanCard = ({ planInfo, isSelected, onSelect }: PlanCardInterface) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className={`${styles.planCardContainer} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={onSelect}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      <p className={styles.title}>{planInfo.title}</p>

      {planInfo.description.map((desc, index) => (
        <p className={styles.description} key={index}>
          <img
            src={desc?.icon}
            alt={`Description icon ${index + 1}`}
            className={styles.icon}
          />{' '}
          <span>{desc?.text}</span>
        </p>
      ))}

      <p className={styles.price}>
        <span className={styles.priceAmount}>
          {planInfo.price === 0 ? 'Free' : `$${planInfo.price}`}
          {planInfo.price !== 0 && (
            <span className={styles.duration}>/month</span>
          )}
        </span>
      </p>
    </div>
  );
};

export default PlanCard;
