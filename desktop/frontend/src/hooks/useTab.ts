import { useCallback } from 'react';
import type { TabId } from '../types';

interface UseTabProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function useTab({ currentTab, onTabChange }: UseTabProps) {
  const isActive = useCallback((tab: TabId) => currentTab === tab, [currentTab]);

  const switchTo = useCallback(
    (tab: TabId) => {
      if (tab !== currentTab) {
        onTabChange(tab);
      }
    },
    [currentTab, onTabChange]
  );

  return { isActive, switchTo };
}
