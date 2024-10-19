import Button from '../commonUI/Button';
import Spinner from '../commonUI/Spinner';
import styles from './BottomBar.module.css';

const BottomBar = ({
  disabled,
  onClick,
  isLoading,
}: {
  disabled?: boolean;
  onClick?: any;
  isLoading?: boolean;
}) => {
  return (
    <div className={styles.bottomBarContainer}>
      <Button onClick={onClick} disabled={disabled}>
        {isLoading ? <Spinner size={25} /> : ' Next'}
      </Button>
    </div>
  );
};

export default BottomBar;
