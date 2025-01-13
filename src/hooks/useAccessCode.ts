import { useState, useCallback } from 'react';

interface UseAccessCodeProps {
  isDisplayed: boolean;
  handleDisplay: (event: React.MouseEvent) => void;
}

export function useAccessCode(): UseAccessCodeProps {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleDisplay = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDisplayed(true);
  }, []);

  return {
    isDisplayed,
    handleDisplay,
  };
}
