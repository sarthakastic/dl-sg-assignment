import styles from './Shimmer.module.css';

const Shimmer = ({ width = '100%', height = '20px' }) => {
  return (
    <div
      className={styles.shimmerWrapper}
      style={{ width, height }}
      role="status"
      aria-label="Loading content"
      aria-live="polite"
    >
      <div className={styles.shimmer} aria-hidden="true" />
    </div>
  );
};

export default Shimmer;
