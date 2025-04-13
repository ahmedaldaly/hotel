'use client'
import React, { useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from 'framer-motion';

function Explore() {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
  };

  return (
    <div className="slider-container w-[80%] max-sm:w-[87%] mx-auto mt-20">
      <Slider {...settings}>
        <div>
          <div className="w-[600px] relative h-[500px] max-md:w-[350px] max-md:h-[300px] max-sm:w-[200px] max-sm:h-[200px]">
            <img className="" src="/b.jpg" alt="image" />
            <div className="absolute top-20  max-md:top-10 left-[-60px] ">
              <AnimatePresence mode="wait">
                {activeIndex === 0 && (
                  <motion.div
                    key="slide1"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-sm:hidden"
                  >
                    <h1 className="text-3xl">The Enchanting </h1>
                    <h1 className="text-3xl">Desert</h1>
                    <p className="mt-15 max-sm:mt-1">READ MORE</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div>
          <div className="w-[600px] relative h-[500px]  max-md:w-[350px] max-md:h-[300px]  max-sm:w-[200px] max-sm:h-[200px]">
            <img className="" src="/b2.jpg" alt="image" />
            <div className="absolute top-20 max-md:top-10 left-[-60px]">
              <AnimatePresence mode="wait">
                {activeIndex === 1 && (
                  <motion.div
                    key="slide2"
                    initial={{ opacity: 0, y: -20 }}
                    className="max-sm:hidden"
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-3xl">The Enchanting </h1>
                    <h1 className="text-3xl">Desert</h1>
                    <p className="mt-15 max-sm:mt-1">READ MORE</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Explore;

