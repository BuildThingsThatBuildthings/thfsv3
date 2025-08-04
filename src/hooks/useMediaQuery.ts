"use client";

import { useEffect, useState, useCallback } from 'react';

export function useMediaQuery(query: string): boolean {
  // Initialize with false to prevent hydration mismatch
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Memoized handler for better performance
  const handler = useCallback((event: MediaQueryListEvent | MediaQueryList) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    // Mark as mounted to prevent hydration issues
    setMounted(true);
    
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    handler(mediaQuery);

    // Use the newer addEventListener API with fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query, handler]);

  // Return false during SSR/hydration to prevent mismatch
  return mounted ? matches : false;
}