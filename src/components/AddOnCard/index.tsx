import { useSelector } from 'react-redux';
import { AddOn } from '../../utils/constants/addOn';
import styles from './AddOnCard.module.css';
import { RootState } from '../../redux/store';
import { useState } from 'react';

const AddOnCard = ({
  addOnInfo,
  onSelect,
}: {
  addOnInfo: AddOn;
  onSelect: () => void;
}) => {
  const { selectedAddOns } = useSelector((state: RootState) => state.plan);

  const [checkedAddOn, setCheckedAddOn] = useState(selectedAddOns);

  return (
    <div className={styles.addOnContainer} onClick={onSelect}>
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
          checked={addOnInfo?.title === checkedAddOn}
          onChange={() => setCheckedAddOn(addOnInfo?.title)}
          className={styles.radioButton}
          disabled={!addOnInfo.isActive}
        />
      </div>
    </div>
  );
};

export default AddOnCard;
