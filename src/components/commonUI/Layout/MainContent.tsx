import { ReactNode } from 'react';
import Sidebar from '../../Sidebar';
import styles from './Layout.module.css';
import Dropdown from '../../Dropdown';

type Props = {
  children: ReactNode;
};

const MainContent = (props: Props) => {
  return (
    <div className={styles.mainContentContainer}>
      <Sidebar />
      <div className={styles.dropdownWrapper}>
        <Dropdown />
      </div>
      <div className={styles.dynamicContainer}>{props?.children}</div>
    </div>
  );
};

export default MainContent;
