import styles from './Shimmer.module.css';

const Shimmer = ({ width = '100%', height = '20px' }) => {
  return (
    <div className={styles.shimmerWrapper} style={{ width, height }}>
      <div className={styles.shimmer} />
    </div>
  );
};

export default Shimmer;
