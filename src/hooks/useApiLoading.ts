import { useState, useEffect } from 'react';
import { isApiLoading, subscribeToApiLoading } from '@/lib/fetcher';

/**
 * Hook to track if any API requests are currently in progress
 * @returns {boolean} isLoading - true if any API requests are in progress
 */
export function useApiLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(isApiLoading());

  useEffect(() => {
    // Subscribe to changes in API loading state
    const unsubscribe = subscribeToApiLoading(setIsLoading);
    
    // Unsubscribe when the component unmounts
    return unsubscribe;
  }, []);

  return isLoading;
}
