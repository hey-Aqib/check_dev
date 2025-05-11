'use client';
import { useState, useEffect, lazy, Suspense } from 'react';
import { usePathname } from 'next/navigation'; 
import LoadingScreen from './LoadingScreen';

// Lazy-loaded components
const Header = lazy(() => import('./navbar/Header'));
const Footer = lazy(() => import('./Footer'));

export default function SplashWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); 

useEffect(() => {
  const load = async () => {
    const start = Date.now();

    // Start preloading components
    await Promise.all([
      import('./navbar/Header'),
      import('./Footer'),
    ]);

    // Ensure at least X ms of loading screen (e.g. 1500ms)
    const elapsed = Date.now() - start;
    const minLoadingTime = 3000;

    const remaining = minLoadingTime - elapsed;
    if (remaining > 0) {
      setTimeout(() => setLoading(false), remaining);
    } else {
      setLoading(false);
    }
  };

  load();
}, []);



  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black text-white transition-opacity duration-1000 opacity-100">
          <LoadingScreen />
        </div>
      )}

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {!loading && 
        <Suspense fallback={null}>
          <Header />
          {children}
          <Footer key={pathname}/> 
        </Suspense>}
      </div>
    </>
  );
}
