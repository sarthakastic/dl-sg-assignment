import { ReactNode } from 'react';

import styles from './Layout.module.css';
import Header from '../../Header';
import MainContent from './MainContent';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      {/* <div className={styles.contentContainer}> */}
      <MainContent>{props?.children}</MainContent>
      {/* </div> */}
    </div>
  );
};

export default Layout;
