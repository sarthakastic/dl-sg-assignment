import { ImgHTMLAttributes } from 'react';

export interface OptimizedImageInterface
  extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}
