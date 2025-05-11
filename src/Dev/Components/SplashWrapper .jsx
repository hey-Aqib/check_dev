'use client';
import { useState, useEffect, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

const Header = lazy(() => import('./navbar/Header'));
const Footer = lazy(() => import('./Footer'));

export default function SplashWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  // When Suspense has loaded everything, we trigger ready
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // Wait a tiny bit after load to ensure final paints (optional)
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      });
    }
  }, []);

  return (
    <>
      {!isReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <LoadingScreen />
        </div>
      )}

      {isReady && (
        <Suspense fallback={null}>
          <Header />
          {children}
          <Footer key={pathname} />
        </Suspense>
      )}
    </>
  );
}
