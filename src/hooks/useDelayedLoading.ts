import { useState, useEffect } from 'react';

interface UseDelayedLoadingProps {
  isActuallyLoading: boolean;
  minimumLoadingTime?: number;
}

export function useDelayedLoading({
  isActuallyLoading,
  minimumLoadingTime = 1000,
}: UseDelayedLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isActuallyLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minimumLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [isActuallyLoading, minimumLoadingTime]);

  return isLoading;
}
