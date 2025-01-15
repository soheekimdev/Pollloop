import { useState, useEffect } from 'react';

interface UseDelayedLoadingProps {
  isActuallyLoading: boolean; // 실제 로딩 상태
  minimumLoadingTime?: number; // 최소 로딩 시간 (ms)
}

export function useDelayedLoading({
  isActuallyLoading,
  minimumLoadingTime = 1000,
}: UseDelayedLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isActuallyLoading) {
      // startTime 제거
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minimumLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [isActuallyLoading, minimumLoadingTime]);

  return isLoading;
}
