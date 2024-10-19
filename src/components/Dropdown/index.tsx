import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Dropdown.module.css';
import { RootState } from '../../redux/store';
import pathToTabName from '../../utils/helper/pathToTabName';
import { ArrowDownIcon, TickIcon } from '../../assets/icons/svgs';

const Dropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { routes } = useSelector((state: RootState) => state.routeStatus);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const currentPath = location.pathname.slice(1);
    setSelectedOption(pathToTabName(currentPath));
  }, [location]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (path: string) => {
    navigate(`/${path}`);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.button} onClick={toggleDropdown}>
        {selectedOption || 'Select an Option'}
        <ArrowDownIcon />
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.show : ''}`}>
        {routes.map((option, index) => (
          <div
            key={index}
            className={styles['menu-item']}
            onClick={() => handleOptionSelect(option?.path)}
          >
            {pathToTabName(option?.path)}
            {option?.completionStatus && <TickIcon />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
