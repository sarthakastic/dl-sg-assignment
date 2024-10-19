import React, { useState, useEffect, useRef } from 'react';
import { OptimizedImageInterface } from '../../../utils/types/LazyImage.types';

const LazyImage: React.FC<OptimizedImageInterface> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ''}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      style={{ maxWidth: '100%', height: 'auto' }}
      {...props}
    />
  );
};

export default LazyImage;
