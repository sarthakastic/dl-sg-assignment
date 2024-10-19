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
    onClick,
    borderRadius: radius,
    textDecoration: underline,
    background: variant === 'outlined' ? background : undefined,
    borderColor: variant === 'outlined' ? borderColor : undefined,
    color: variant === 'outlined' ? color : undefined,
  };

  return (
    <button
      onClick={() => onClick()}
      className={classNames}
      style={style}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
