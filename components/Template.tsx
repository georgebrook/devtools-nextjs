'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { bem } from '@utils/bem';
import './styles.scss';

const fileName = import.meta.url.split('/').pop()?.replace(/\.(tsx|ts|jsx|js)$/, '') || 'component';
const block = fileName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

type Props = {
  modifiers?: string[];
  className?: string;
  isActive?: boolean; // Controlled prop (optional)
  defaultActive?: boolean; // Uncontrolled initial state
  onToggle?: (active: boolean) => void; // Callback when toggled
};

export const Component = ({
  modifiers = [],
  className = '',
  isActive,
  defaultActive = false,
  onToggle,
}: Props) => {
  const [internalActive, setInternalActive] = useState(defaultActive);

  // Prefer controlled value if provided, else fall back to internal state
  const active = isActive ?? internalActive;

  const handleToggle = useCallback(() => {
    if (isActive === undefined) {
      setInternalActive(prev => !prev);
    }
    onToggle?.(!active);
  }, [active, isActive, onToggle]);

  useEffect(() => {
    console.log(`${fileName} is now`, active ? 'Active' : 'Inactive');
  }, [active]);

  const classes = bem({
    block,
    modifiers: [...modifiers, active ? 'is-active' : ''],
    extra: className,
  });

  return (
    <div className={classes}>
      <p>Hello from {fileName}</p>
      <button type="button" onClick={handleToggle}>
        {active ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  );
};

Component.displayName = fileName;

export default Component;
