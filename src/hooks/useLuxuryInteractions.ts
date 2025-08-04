"use client";

import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';

interface CursorPosition {
  x: number;
  y: number;
}

interface LuxuryInteractionState {
  isHovering: boolean;
  cursorPosition: CursorPosition;
  lastInteraction: number;
  interactionCount: number;
}

export function useLuxuryInteractions() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [state, setState] = useState<LuxuryInteractionState>({
    isHovering: false,
    cursorPosition: { x: 0, y: 0 },
    lastInteraction: Date.now(),
    interactionCount: 0
  });

  // Track cursor position for luxury effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion) return;
    
    setState(prev => ({
      ...prev,
      cursorPosition: { x: e.clientX, y: e.clientY },
      lastInteraction: Date.now()
    }));
  }, [prefersReducedMotion]);

  // Track hover states for quantum energy responses
  const handleMouseEnter = useCallback(() => {
    setState(prev => ({
      ...prev,
      isHovering: true,
      interactionCount: prev.interactionCount + 1
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState(prev => ({
      ...prev,
      isHovering: false
    }));
  }, []);

  // Sophisticated scroll tracking for parallax effects
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollDirection: 'down' as 'up' | 'down',
    scrollVelocity: 0
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastScrollY = window.scrollY;
    let lastTimestamp = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();
      const deltaTime = currentTimestamp - lastTimestamp;
      const deltaScroll = currentScrollY - lastScrollY;
      
      setScrollState({
        scrollY: currentScrollY,
        scrollDirection: deltaScroll > 0 ? 'down' : 'up',
        scrollVelocity: Math.abs(deltaScroll) / deltaTime
      });

      lastScrollY = currentScrollY;
      lastTimestamp = currentTimestamp;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, handleMouseMove]);

  // Generate subtle random variations for organic luxury feel
  const getLuxuryVariation = useCallback(() => ({
    delay: Math.random() * 0.2 + 0.1,
    duration: Math.random() * 0.3 + 0.8,
    scale: Math.random() * 0.02 + 0.99,
    rotation: Math.random() * 2 - 1
  }), []);

  // Calculate luxury interaction strength based on recent activity
  const getInteractionIntensity = useCallback(() => {
    const timeSinceLastInteraction = Date.now() - state.lastInteraction;
    const recentActivity = Math.max(0, 1 - (timeSinceLastInteraction / 5000));
    const activityBonus = Math.min(state.interactionCount / 10, 0.5);
    return Math.min(recentActivity + activityBonus, 1);
  }, [state.lastInteraction, state.interactionCount]);

  return {
    // State
    isHovering: state.isHovering,
    cursorPosition: state.cursorPosition,
    scrollState,
    prefersReducedMotion,
    
    // Event handlers
    handleMouseEnter,
    handleMouseLeave,
    
    // Luxury utilities
    getLuxuryVariation,
    getInteractionIntensity,
    
    // Computed values
    shouldShowEffects: !prefersReducedMotion && state.isHovering,
    luxuryIntensity: getInteractionIntensity()
  };
}