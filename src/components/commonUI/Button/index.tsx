import React from 'react';
import styles from './Button.module.css';
import { ButtonInterface } from '../../../utils/types/Button.types';

const Button: React.FC<ButtonInterface> = ({
  variant = 'contained',
  color,
  padding,
  borderColor,
  margin,
  width,
  height,
  gap,
  radius,
  onClick,
  underline,
  background,
  disabledBackground,
  disabled,
  children,
  ...rest
}) => {
  const classNames = [
    styles.button,
    variant === 'outlined' && styles.outlined,
    variant === 'link' && styles.link,
    variant === 'error' && styles.error,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    gap,
    width,
    height,
    margin,
    padding,
    borderRadius: radius,
    textDecoration: underline,
    background: disabled ? disabledBackground : background,
    borderColor: variant === 'outlined' ? borderColor : undefined,
    color: variant === 'outlined' ? color : undefined,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={classNames}
      style={style}
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      <span aria-live="polite" aria-atomic="true">
        {children}
      </span>
    </button>
  );
};

export default Button;
