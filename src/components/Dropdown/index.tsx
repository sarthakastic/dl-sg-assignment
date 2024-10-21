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

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionSelect = (path: string) => {
    navigate(`/${path}`);
    setIsOpen(false);
  };

  const isPathValid = routes.some(
    (data) => `/${data?.path.toLowerCase()}` === location.pathname
  );

  if (!isPathValid) {
    return null;
  }

  return (
    <div
      className={styles.dropdown}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Select an option"
    >
      <button
        className={styles.button}
        onClick={toggleDropdown}
        aria-controls="dropdown-menu"
        aria-activedescendant={selectedOption}
        aria-haspopup={true}
      >
        {selectedOption || 'Select an Option'}
        <ArrowDownIcon />
      </button>

      <div
        id="dropdown-menu"
        className={`${styles.menu} ${isOpen ? styles.show : ''}`}
        role="listbox"
      >
        {routes.map((option, index) => (
          <div
            key={index}
            role="option"
            className={styles['menu-item']}
            onClick={() => handleOptionSelect(option?.path)}
            aria-selected={selectedOption === pathToTabName(option?.path)}
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
