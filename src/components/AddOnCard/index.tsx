import { useSelector } from 'react-redux';
import { AddOn } from '../../utils/constants/addOn';
import styles from './AddOnCard.module.css';
import { RootState } from '../../redux/store';
import { useState, KeyboardEvent } from 'react';

const AddOnCard = ({
  addOnInfo,
  onSelect,
}: {
  addOnInfo: AddOn;
  onSelect: () => void;
}) => {
  const { selectedAddOns } = useSelector((state: RootState) => state.plan);

  const [checkedAddOn, setCheckedAddOn] = useState(selectedAddOns);

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (addOnInfo.isActive) {
        onSelect();
      }
    }
  };

  const handleClick = () => {
    if (addOnInfo.isActive) {
      onSelect();
    }
  };

  return (
    <div
      className={styles.addOnContainer}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      aria-labelledby={`addon-label-${addOnInfo.id}`}
      aria-disabled={!addOnInfo.isActive}
    >
      {!addOnInfo.isActive && (
        <div
          className={styles.comingSoonBanner}
          role="status"
          aria-live="polite"
        >
          Coming soon
        </div>
      )}
      <div className={styles.contentWrapper}>
        <label
          htmlFor={`addon-${addOnInfo.id}`}
          id={`addon-label-${addOnInfo.title}`}
          className={styles.text}
        >
          {addOnInfo.title} - ${addOnInfo.price}/month
        </label>
        <input
          type="radio"
          id={`addon-${addOnInfo.id}`}
          name="addon"
          checked={addOnInfo?.title === checkedAddOn}
          onChange={() => setCheckedAddOn(addOnInfo?.title)}
          className={styles.radioButton}
          disabled={!addOnInfo.isActive}
          aria-label={`Select ${addOnInfo.title} for ${addOnInfo.price} per month`}
          aria-checked={addOnInfo?.title === checkedAddOn}
        />
      </div>
    </div>
  );
};

export default AddOnCard;
