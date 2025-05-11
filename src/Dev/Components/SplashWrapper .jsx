'use client';
import { useState, useEffect, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation'; 
import LoadingScreen from './LoadingScreen';

const Header = lazy(() => import('./navbar/Header'));
const Footer = lazy(() => import('./Footer'));

export default function SplashWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    const load = async () => {
      // Simulate preload time (or use real imports)
      await new Promise((res) => setTimeout(res, 1500));
      setLoading(false);

      // Add a small delay for app mount transition
      setTimeout(() => {
        setShowApp(true);
      }, 1000); // during this 1s, show your delightful loader
    };

    load();
  }, []);

  return (
    <>
      {/* Initial loading screen */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <LoadingScreen />
        </div>
      )}

      {/* Transition loader after splash */}
      {!loading && !showApp && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          {/* Delightful loader (replace with spinner or logo animation) */}
          <img src="/dev/images/delightful-loader.gif" alt="Loading..." className="w-20 h-20" />
        </div>
      )}

      {/* Actual app content */}
      {showApp && (
        <Suspense fallback={null}>
          <Header />
          {children}
          <Footer key={pathname} />
        </Suspense>
      )}
    </>
  );
}
