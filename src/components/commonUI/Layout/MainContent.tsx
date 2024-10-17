import { ReactNode } from 'react';
import Sidebar from '../../Sidebar';
import style from './Layout.module.css';

type Props = {
  children: ReactNode;
};

const MainContent = (props: Props) => {
  return (
    <div className={style.mainContentContainer}>
      <Sidebar />
      {props?.children}
    </div>
  );
};

export default MainContent;
