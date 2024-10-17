import React, { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

// Props definition using ImgHTMLAttributes for flexibility
interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

// Lazy-loaded image using Intersection Observer API
const LazyImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy', // Default to lazy loading
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
