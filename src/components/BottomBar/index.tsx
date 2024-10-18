import Button from '../commonUI/Button';
import styles from './BottomBar.module.css';

const BottomBar = ({ disabled }: { disabled?: boolean }) => {
  return (
    <div className={styles.bottomBarContainer}>
      <Button disabled={disabled}>Next</Button>
    </div>
  );
};

export default BottomBar;
