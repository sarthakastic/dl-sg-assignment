import Button from '../commonUI/Button';
import styles from './BottomBar.module.css';

const BottomBar = () => {
  return (
    <div className={styles.bottomBarContainer}>
      <Button>Next</Button>
    </div>
  );
};

export default BottomBar;
