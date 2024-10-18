import { AddOn } from '../../utils/constants/addOn';
import styles from './AddOnCard.module.css';

const AddOnCard = ({ addOnInfo }: { addOnInfo: AddOn }) => {
  return (
    <div className={styles.addOnContainer}>
      {!addOnInfo.isActive && (
        <div className={styles.comingSoonBanner}>Coming soon</div>
      )}
      <div className={styles.contentWrapper}>
        <label htmlFor={`addon-${addOnInfo.id}`} className={styles.text}>
          {addOnInfo.title} - ${addOnInfo.price}/month
        </label>
        <input
          type="radio"
          id={`addon-${addOnInfo.id}`}
          name="addon"
          className={styles.radioButton}
          disabled={!addOnInfo.isActive}
        />
      </div>
    </div>
  );
};

export default AddOnCard;
