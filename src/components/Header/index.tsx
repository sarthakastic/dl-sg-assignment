import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import avatar from '../../assets/images/avatar.jpg';

import styles from './Header.module.css';
import LazyImage from '../commonUI/LazyImage';

export default function Header() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <header className={styles.headerContainer}>
      <div
        className={`${styles.hamburger} ${
          sidebarActive ? styles.hamburgerActive : ''
        }`}
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <NavLink to="/" className={styles.logo}>
        <LazyImage src={logo} alt="Logo" />
      </NavLink>

      <div
        className={`${styles.navLinkCollapse} ${
          sidebarActive ? styles['navLinkCollapseActive'] : ''
        }`}
      >
        {/* <div className={styles.navList}> */}
        <NavLink to="/learn-more" className={styles.navLinkItem}>
          Learn more
        </NavLink>
        <NavLink to="/subscription" className={styles.navLinkItem}>
          List your car
        </NavLink>
        <NavLink to="/inbox" className={styles.navLinkItem}>
          Inbox
        </NavLink>
        {/* </div> */}
      </div>

      <div className={styles.navItemContainer}>
        <NavLink to="/learn-more" className={styles.navItem}>
          Learn more
        </NavLink>
        <NavLink to="/subscription" className={styles.navItem}>
          List your car
        </NavLink>
        <NavLink to="/inbox" className={styles.navItem}>
          Inbox
        </NavLink>

        <NavLink to="/profile" className={styles.profilePicture}>
          <LazyImage
            height={'2.5rem'}
            width={'2.5rem'}
            src={avatar}
            alt="Avatar"
          />
        </NavLink>
      </div>
    </header>
  );
}
