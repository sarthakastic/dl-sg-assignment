export interface ButtonInterface {
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
