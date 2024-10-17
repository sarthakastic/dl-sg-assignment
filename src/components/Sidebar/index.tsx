import { useNavigate, useLocation } from 'react-router-dom';
import style from './Sidebar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import pathToTabName from '../../utils/helper/pathToTabName';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { routes } = useSelector((state: RootState) => state.routeStatus);

  return (
    <div className={style.sidebarContainer}>
      <ul>
        {routes.map((data) => {
          const isActive = location.pathname === `/${data?.path.toLowerCase()}`;
          const isCompleted = data?.completionStatus;

          return (
            <li
              key={data?.id}
              onClick={() => navigate(data?.path.toLowerCase())}
              className={`
                ${style.tabLink} 
                ${isActive ? style.activeTab : ''} 
             ${isCompleted ? '' : style.grayTab}
              `}
            >
              {pathToTabName(data?.path)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
