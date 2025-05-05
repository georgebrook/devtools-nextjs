'use client';

import { useEffect } from 'react';

interface UseResizableOptions {
  handleSelector: string;
  targetSelector: string;
  direction: 'horizontal' | 'vertical';
  minSize?: number;
}

export function useResizable({
  handleSelector,
  targetSelector,
  direction,
  minSize = 200,
}: UseResizableOptions) {
  useEffect(() => {
    const handle = document.querySelector(handleSelector);
    const target = document.querySelector(targetSelector);
    if (!handle || !target) return;

    let isResizing = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing || !target) return;

      if (direction === 'horizontal') {
        const newWidth = target.getBoundingClientRect().right - e.clientX;
        if (newWidth > minSize) {
          (target as HTMLElement).style.width = `${newWidth}px`;
        }
      }

      if (direction === 'vertical') {
        const newHeight = e.clientY - target.getBoundingClientRect().top;
        if (newHeight > minSize) {
          (target as HTMLElement).style.height = `${newHeight}px`;
        }
      }
    };

    const stopResize = () => {
      isResizing = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };

    const startResize = () => {
      isResizing = true;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopResize);
    };

    handle.addEventListener('mousedown', startResize);
    return () => {
      handle.removeEventListener('mousedown', startResize);
      stopResize();
    };
  }, [handleSelector, targetSelector, direction, minSize]);
}
