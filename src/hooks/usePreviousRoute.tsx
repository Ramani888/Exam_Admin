// PreviousRouteTracker.tsx
import { useLocation, Location } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const usePreviousRoute = (): Location | null => {
  const location = useLocation();
  const previousLocation = useRef<Location | null>(null);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return previousLocation.current;
};

export default usePreviousRoute;