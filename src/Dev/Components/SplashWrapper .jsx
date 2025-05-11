'use client';
import { useState, useEffect, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

const Header = lazy(() => import('./navbar/Header'));
const Footer = lazy(() => import('./Footer'));

export default function SplashWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let minDelayFinished = false;
    let siteLoaded = false;

    const checkReady = () => {
      if (minDelayFinished && siteLoaded) {
        setIsReady(true);
      }
    };

    // Minimum delay of 2 seconds
    const delayTimer = setTimeout(() => {
      minDelayFinished = true;
      checkReady();
    }, 2000);

    // Wait for window to fully load
    const onLoad = () => {
      siteLoaded = true;
      checkReady();
    };

    if (document.readyState === 'complete') {
      onLoad(); // in case load already happened
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      clearTimeout(delayTimer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
      {!isReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <LoadingScreen />
        </div>
      )}

      {isReady && (
        <Suspense fallback={<LoadingScreen />}>
          <Header />
          {children}
          <Footer key={pathname} />
        </Suspense>
      )}
    </>
  );
}
