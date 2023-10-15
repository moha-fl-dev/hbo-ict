import React from 'react';

export function getWindowDimension() {
  const hasWindow = typeof window !== 'undefined';

  const width = hasWindow ? window.innerWidth : null;
  const height = hasWindow ? window.innerHeight : null;

  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimension()
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimension());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
