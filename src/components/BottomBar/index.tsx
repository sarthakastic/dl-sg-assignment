import Button from '../commonUI/Button';
import Spinner from '../commonUI/Spinner';
import styles from './BottomBar.module.css';

const BottomBar = ({
  disabled = false,
  onClick,
  isLoading = false,
}: {
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <div className={styles.bottomBarContainer}>
      <Button
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={isLoading ? 'Loading...' : 'Next step'}
      >
        <span aria-live="polite" aria-atomic="true">
          {isLoading ? <Spinner size={25} /> : 'Next'}
        </span>
      </Button>
    </div>
  );
};

export default BottomBar;
