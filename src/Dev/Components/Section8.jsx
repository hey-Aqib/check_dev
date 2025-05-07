"use client";
import React, { useEffect, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const Section8 = () => {

  gsap.registerPlugin(ScrollTrigger);
    
      useLayoutEffect(() => {
        requestAnimationFrame(() => {
          const elements = gsap.utils.toArray(".text_animation_section8");
    
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
    <div className="relative w-full min-h-screen bg-black pt-10 pb-10">
      <div className="relative max-sm:mt-10">
        <div className="w-full max-sm:h-10 h-16 bg-gradient-to-b  from-black to-transparent z-10 absolute top-0 left-0" />

        <img
          src="/dev/images/hack.avif"
          alt="Your Image"
          className="w-full h-auto object-cover max-sm:h-40"
        />

        <div className="w-full max-sm:h-10 h-16 bg-gradient-to-t from-black to-transparent z-1 absolute bottom-0 left-0" />
      </div>
      <section className="black overflow-hidden relative">
        <div className="container rel full w-container mx-auto px-4">
          <div className="heading-wrapper max-sm:my-15 text-center my-8">
            <h2 className="text-white text-3xl font-bold text_animation_section8">Our Methodologies</h2>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="lottie-wrapper w-full h-full mb-8">
              <Player
                hover
                src="https://cdn.prod.website-files.com/66507fe061d349897ed2696e/667c27bdd47e7a069744da14_Frame%203647.json"
                className="absolute -top-20 z-20 max-sm:top-0"
                style={{ width: "100%" }}
              />
            </div>

            <div className="relative w-full h-full  gap-18 text-white grid grid-cols-[1fr_1fr_1fr]">
              <div className="relative ab-content-wrapper text-center">
                <div className="absolute max-sm:top-24 top-110 flex flex-col items-center">
                  <img
                    src="/dev/images/small_pin.svg"
                    alt="Ai Service"
                    className="w-5 mb-2 max-sm:w-3 z-21"
                  />
                  <h3 className="text-lg font-semibold transition-opacity duration-300 text_animation_section8">
                    Agile Development
                  </h3>
                  <p className="text-sm mt-1 max-sm:w-30 text_animation_section8">
                    We quickly adapt to changes through multiple loops,
                    consistently delivering high-value results.
                  </p>
                </div>
              </div>

              <div className="relative ab-content-wrapper text-center h-full">
                <div className="mt-8 max-sm:mt-0 flex flex-col items-center">
                  <img
                    src="/dev/images/large_pin.svg"
                    alt="Ai Service"
                    className="w-7 mb-2 max-sm:w-3 z-21"
                  />
                  <h3 className="text-lg font-semibold text_animation_section8">Design Thinking</h3>
                  <p className="text-sm mt-1 max-sm:w-30 text_animation_section8">
                    We prioritise a user-focused approach, creating innovative
                    solutions that effectively meet client needs.
                  </p>
                </div>
              </div>

              <div className="relative ab-content-wrapper text-center max-w-sm  h-full">
                <div className="absolute max-sm:top-24 top-110 max-sm:-left-20 flex flex-col items-center">
                  <img
                    src="/dev/images/small_pin.svg"
                    alt="Ai Service"
                    className="w-5 mb-2 max-sm:w-3 z-21"
                  />
                  <h3 className="text-lg font-semibold text_animation_section8">DevOps</h3>
                  <p className="text-sm mt-1 max-sm:w-30 text_animation_section8">
                    Our continuous integration and deployment practices ensure
                    rapid and reliable software releases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section8;
