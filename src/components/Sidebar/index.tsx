import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import pathToTabName from '../../utils/helper/pathToTabName';
import { TickIcon } from '../../assets/icons/svgs';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { routes } = useSelector((state: RootState) => state.routeStatus);

  const handleNavigation = (path: string) => {
    navigate(path.toLowerCase());
  };

  const isPathValid = routes.some(
    (data) => `/${data?.path.toLowerCase()}` === location.pathname
  );

  if (!isPathValid) {
    return null;
  }

  return (
    <div
      className={styles.sidebarContainer}
      role="navigation"
      aria-label="Sidebar Navigation"
    >
      <ul>
        {routes.map((data) => {
          const isActive = location.pathname === `/${data?.path.toLowerCase()}`;
          const isCompleted = data?.completionStatus;

          return (
            <li
              key={data?.id}
              onClick={() => handleNavigation(data?.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavigation(data?.path);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              className={`${styles.tabLink} 
                ${isActive ? styles.activeTab : ''} 
                ${isCompleted ? '' : styles.grayTab}`}
            >
              {pathToTabName(data?.path)}
              {isCompleted && <TickIcon />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
