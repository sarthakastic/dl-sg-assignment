import React from 'react';
import styles from './Button.module.css';

interface Props {
  variant?: 'contained' | 'outlined' | 'link' | 'error';
  color?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  gap?: string;
  radius?: string;
  borderColor?: string;
  underline?: string;
  background?: string;
  disabledBackground?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: any;
}

const Button: React.FC<Props> = ({
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
