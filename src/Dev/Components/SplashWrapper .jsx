'use client';
import { useState, useEffect, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';

const Header = lazy(() => import('./navbar/Header'));
const Footer = lazy(() => import('./Footer'));

export default function SplashWrapper({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Wait for client hydration
    const handleHydrate = () => {
      setIsHydrated(true);
    };

    // Next.js hydration happens almost immediately on mount
    requestAnimationFrame(handleHydrate);
  }, []);

  return (
    <>
      {!isHydrated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <LoadingScreen />
        </div>
      )}

      {isHydrated && (
        <Suspense fallback={<LoadingScreen />}>
          <Header />
          {children}
          <Footer key={pathname} />
        </Suspense>
      )}
    </>
  );
}
