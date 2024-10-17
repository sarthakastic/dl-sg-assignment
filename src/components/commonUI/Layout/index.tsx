import { ReactNode } from 'react';

import styles from './Layout.module.css';
import Header from '../../Header';
import BottomBar from '../../BottomBar';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      <div className={styles.contentContainer}>
        {props?.children}
        <BottomBar />
      </div>
    </div>
  );
};

export default Layout;
