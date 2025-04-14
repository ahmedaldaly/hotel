'use client'
import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

function LazyLoad() {
  const locale = useLocale();
  const Arabic = locale === 'ar';

  const settings: Settings = {
    dots: false,
    lazyLoad: "ondemand",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const textAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings} className="w-[90%] mx-auto h-auto">
        {/* Slide 1 */}
        <div className="relative w-full h-[70vh]">
          <img
            className="w-full h-full object-cover"
            src="https://www.goldensandscreek.com/wp-content/uploads/2024/02/Celebrations_bottom_web-e1707128006158.jpg"
            alt="Slide 1"
          />
          <div className="w-full h-full bg-black/50 absolute top-0 left-0 flex flex-col justify-center items-center text-center text-white px-4">
            <motion.h1
              variants={textAnimation}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {Arabic ? "عشاء رومانسي" : "Romantic Dinner"}
            </motion.h1>
            <motion.p
              variants={textAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl max-w-2xl"
            >
              {Arabic
                ? "استمتع بعشاء رومانسي فاخر مع إطلالة على أفق مدينة دبي الشهير."
                : "Enjoy an elevated romantic dinner overlooking Dubai's iconic skyline."}
            </motion.p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative w-full h-[70vh]">
          <img
            className="w-full h-full object-cover"
            src="https://www.goldensandscreek.com/wp-content/uploads/2023/08/getty-images-p8DxVtEW8EA-unsplash.jpg"
            alt="Slide 2"
          />
          <div className="w-full h-full bg-black/50 absolute top-0 left-0 flex flex-col justify-center items-center text-center text-white px-4">
            <motion.h1
              variants={textAnimation}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {Arabic ? "ليلة البيتزا والمكرونة" : "Pizza & Pasta Night"}
            </motion.h1>
            <motion.p
              variants={textAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl max-w-2xl"
            >
              {Arabic
                ? "بيتزا ومعكرونة بلا حدود كل يوم ثلاثاء فقط في بونيسيمو!"
                : "Unlimited Pizza & Pasta every Tuesday only at Buonissimo!"}
            </motion.p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default LazyLoad;
