"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      const elements = gsap.utils.toArray(".animation");

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Clean up scroll triggers when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full bg-black max-sm:h-[80vh] max-sm:pt-10 md:pt-10 max-sm:pb-[50%]">
      {/* 
      <div className="fixed inset-0 z-15">
        <Canvas
          camera={{ position: [0, 0, 10] }}
          frameloop="demand"
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: false }}
        >
          <PerformanceMonitor onDecline={() => {}} />
          <Suspense fallback={null}>
            <Galaxy count={1000} radius={10} />
          </Suspense>
        </Canvas>
      </div> 
      */}

      {/* <div className="text-center max-sm:text-2xl max-sm:mt-5 text-3xl font-extrabold">
        Your Vision - Our Mission
      </div> */}

      <div className="flex flex-col md:gap-[30%] md:flex-row items-center justify-center gap-10 px-4 py-12 md:py-24 animation">
        <div className="text-5xl md:text-7xl lg:text-8xl font-medium text-white text-center md:text-left">
          Mutual
        </div>
        <div className="text-5xl md:text-7xl lg:text-8xl font-medium text-white text-center md:text-right">
          Growth
        </div>
      </div>

      <div className="text-center text-2xl underline max-sm:p-4 animation">
        Search, Design, Development, Business, IT Solutions
      </div>

      <div className="relative max-sm:mt-10">
        <div className="w-full max-sm:h-10 h-16 bg-gradient-to-b from-black to-transparent z-10 absolute top-0 left-0" />

        <img
          src="/dev/images/hack.avif"
          alt="Your Image"
          className="w-full h-auto object-cover max-sm:h-40"
        />

        <div className="w-full max-sm:h-10 h-16 bg-gradient-to-t from-black to-transparent z-10 absolute bottom-0 left-0" />
      </div>
    </div>
  );
};

export default Hero;
