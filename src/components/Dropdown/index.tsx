import { useState, useEffect, useRef } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentPath = location.pathname.slice(1);
    setSelectedOption(pathToTabName(currentPath));
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) buttonRef.current?.focus();
  };

  const handleOptionSelect = (path: string) => {
    navigate(`/${path}`);
    setIsOpen(false);
    buttonRef.current?.focus(); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, path: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionSelect(path);
    }
  };

  const isPathValid = routes.some(
    (data) => `/${data?.path.toLowerCase()}` === location.pathname
  );

  
  if (!isPathValid) {
    return null; 
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        ref={buttonRef}
        className={styles.button}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption || 'Select an Option'}
        <ArrowDownIcon />
      </button>

      {isOpen && (
        <div className={`${styles.menu}`} role="listbox">
          {routes.map((option, index) => (
            <div
              key={index}
              className={styles['menu-item']}
              role="option"
              tabIndex={0}
              aria-selected={selectedOption === pathToTabName(option.path)}
              onClick={() => handleOptionSelect(option?.path)}
              onKeyDown={(e) => handleKeyDown(e, option?.path)}
            >
              {pathToTabName(option?.path)}
              {option?.completionStatus && <TickIcon />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
