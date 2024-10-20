import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Toaster.module.css";
import { AppDispatch, RootState } from "../../redux/store";
import { hideToaster } from "../../redux/slices/toasterSlice";

const Toaster: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { show, type, message } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideToaster());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  if (!show) return null;

  return (
    <div
      className={`${styles.toaster} ${styles[type]}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span>{message}</span>
      <button
        className={styles.closeButton}
        onClick={() => dispatch(hideToaster())}
        aria-label="Close toaster"
      >
        ✖
      </button>
    </div>
  );
};

export default Toaster;
