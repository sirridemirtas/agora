'use client';

import { useState, useEffect } from 'react';

/**
 * This hook is used to share state between multiple tabs and persists data across browser sessions
 * It uses:
 * - localStorage to persist data even after browser restarts
 * - BroadcastChannel to sync state across multiple tabs in real-time
 * 
 * The state will remain in localStorage until explicitly cleared through:
 * - The provided setState function with null/undefined
 * - Manually clearing localStorage
 * - Clearing browser data
 * 
 * @example
 * const [value, setValue] = useSharedState('my-key', initialValue);
 */

export function useSharedState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial state from localStorage
    const stored = localStorage.getItem(key);
    setState(stored ? JSON.parse(stored) : initialValue);
    setIsLoading(false);

    // BroadcastChannel setup
    const channel = new BroadcastChannel(key);
    channel.onmessage = (event) => {
      setState(event.data);
    };

    return () => channel.close();
  }, [key, initialValue]);

  const setSharedState = (value: T) => {
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
    const channel = new BroadcastChannel(key);
    channel.postMessage(value);
  };

  return [state, setSharedState, isLoading];
}
