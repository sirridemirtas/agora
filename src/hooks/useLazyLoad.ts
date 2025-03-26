import { useEffect, useRef, useState } from 'react';

export const useLazyLoad = (rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false);
  const [wasVisible, setWasVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = elementRef.current;
    
    // Skip if already visible or no element
    if (wasVisible || !current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        // Once it's been visible, we remember that to avoid unnecessary re-observations
        if (visible) {
          setWasVisible(true);
          observer.unobserve(current);
        }
      },
      { rootMargin }
    );

    observer.observe(current);

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [rootMargin, wasVisible]);

  return { elementRef, isVisible, wasVisible };
};
