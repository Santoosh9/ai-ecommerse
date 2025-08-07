import { useEffect, useRef } from 'react';

export const usePerformance = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;
      
      console.log(`[Performance] ${componentName}: Render #${renderCount.current} took ${renderTime.toFixed(2)}ms`);
      
      if (renderTime > 16) { // 60fps threshold
        console.warn(`[Performance] ${componentName}: Slow render detected (${renderTime.toFixed(2)}ms)`);
      }
      
      startTime.current = performance.now();
    }
  });

  return {
    renderCount: renderCount.current,
    resetRenderCount: () => {
      renderCount.current = 0;
    }
  };
};
