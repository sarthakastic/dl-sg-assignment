import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import avatar from '../../assets/images/avatar.jpg';

import styles from './Header.module.css';
import LazyImage from '../commonUI/LazyImage';

export default function Header() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleSidebar = () => setSidebarActive(!sidebarActive);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setSidebarActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.headerContainer}>
      
      <button
        ref={hamburgerRef}
        className={`${styles.hamburger} ${sidebarActive ? styles.hamburgerActive : ''}`}
        onClick={toggleSidebar}
        aria-label={sidebarActive ? 'Close menu' : 'Open menu'}
        aria-expanded={sidebarActive}
        aria-controls="navLinks"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      
      <NavLink to="/" className={styles.logo}>
        <LazyImage src={logo} alt="Company Logo" />
      </NavLink>

      
      <nav
        id="navLinks"
        className={`${styles.navLinkCollapse} ${sidebarActive ? styles.navLinkCollapseActive : ''}`}
        aria-hidden={!sidebarActive}
      >
        <NavLink to="/" className={styles.navLinkItem}>
          Learn more
        </NavLink>
        <NavLink to="/" className={styles.navLinkItem}>
          List your car
        </NavLink>
        <NavLink to="/" className={styles.navLinkItem}>
          Inbox
        </NavLink>
      </nav>

      
      <div className={styles.navItemContainer}>
        <NavLink to="/" className={styles.navItem}>
          Learn more
        </NavLink>
        <NavLink to="/" className={styles.navItem}>
          List your car
        </NavLink>
        <NavLink to="/" className={styles.navItem}>
          Inbox
        </NavLink>

      
        <NavLink to="/" className={styles.profilePicture} aria-label="Go to profile">
          <LazyImage height="2.5rem" width="2.5rem" src={avatar} alt="User Avatar" />
        </NavLink>
      </div>
    </header>
  );
}
