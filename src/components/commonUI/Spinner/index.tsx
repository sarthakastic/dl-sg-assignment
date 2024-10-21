import styles from './Spinner.module.css';

const Spinner = ({ size = 50 }: { size: number }) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderWidth: 5,
      }}
      data-testid="spinner"
    />
  );
};

export default Spinner;
