'use client';
import { useEffect, useState, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

// Lazy-loaded components
const Header = lazy(() => import('./navbar/Header'));
const Footer = lazy(() => import('./Footer'));

export default function SplashWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const waitForPageLoad = () =>
      new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve);
        }
      });

    const minDelay = new Promise((resolve) => setTimeout(resolve, 2000));

    Promise.all([waitForPageLoad(), minDelay]).then(() => {
      setIsReady(true);
    });

    return () => {
      window.removeEventListener('load', () => {});
    };
  }, []);

  return (
    <>
      {!isReady && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
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
