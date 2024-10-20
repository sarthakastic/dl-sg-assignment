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
      {props?.children}
    </div>
  );
};

export default MainContent;
