import { ReactNode } from 'react';
import Sidebar from '../../Sidebar';
import styles from './Layout.module.css';
import Dropdown from '../../Dropdown';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Toaster from '../../Toaster';

type Props = {
  children: ReactNode;
};

const MainContent = (props: Props) => {
  const location = useLocation();
  const { routes } = useSelector((state: RootState) => state.routeStatus);

  const isPathValid = routes.some(
    (data) => `/${data?.path.toLowerCase()}` === location.pathname
  );

  if (!isPathValid) {
    return <div className={styles.notFoundContainer}>{props.children}</div>;
  }

  return (
    <div className={styles.mainContentContainer}>
      <Toaster />
      <Sidebar />
      <div className={styles.dropdownWrapper}>
        <Dropdown />
      </div>
      <div className={styles.dynamicContainer}>{props?.children}</div>
    </div>
  );
};

export default MainContent;
