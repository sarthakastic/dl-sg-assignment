import { PlanCardInterface } from '../../utils/types/PlanCard.types';
import styles from './PlanCard.module.css';

const PlanCard = ({ planInfo, isSelected, onSelect }: PlanCardInterface) => {
  return (
    <div
      className={`${styles.planCardContainer} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={onSelect}
    >
      <p className={styles.title}>{planInfo.title}</p>
      {planInfo.description.map((desc, index) => (
        <p className={styles.description} key={index}>
          <img src={desc?.icon} alt="" /> <span>{desc?.text}</span>
        </p>
      ))}
      <p className={styles.price}>
        {' '}
        <span className={styles.priceAmount}>
          {planInfo.price === 0 ? 'Free' : '$' + planInfo.price}
          {planInfo.price !== 0 && (
            <span className={styles.duration}>/month</span>
          )}
        </span>{' '}
      </p>
    </div>
  );
};

export default PlanCard;
