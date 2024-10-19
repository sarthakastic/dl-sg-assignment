import { ReactNode } from 'react';
import Header from '../../Header';
import MainContent from './MainContent';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div>
      <Header />
      <MainContent>{props?.children}</MainContent>
    </div>
  );
};

export default Layout;
