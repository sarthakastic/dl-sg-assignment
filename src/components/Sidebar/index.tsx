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

  return (
    <div className={styles.sidebarContainer}>
      <ul>
        {routes.map((data) => {
          const isActive = location.pathname === `/${data?.path.toLowerCase()}`;
          const isCompleted = data?.completionStatus;

          return (
            <li
              key={data?.id}
              onClick={() => navigate(data?.path.toLowerCase())}
              className={`
                ${styles.tabLink} 
                ${isActive ? styles.activeTab : ''} 
             ${isCompleted ? '' : styles.grayTab}
              `}
            >
              {pathToTabName(data?.path)}
              {data?.completionStatus && <TickIcon />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
