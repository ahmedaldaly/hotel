'use client'
import React from "react";
import Slider from "react-slick";
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Explor = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1280, // شاشات لابتوب أصغر
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, // تابلت
            settings: {
              slidesToShow: 1.5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 640, // موبايل
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          }
        ]
      };

  const data = [
    {
      title: 'Dubai Frame',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2024/02/Dubai-Frame-Web-660x619.jpg',
      pargraph: 'Experience breathtaking views of Old & New Dubai from the iconic Dubai Frame.',
    },
    {
      title: 'Burj Khalifa',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2024/02/Burj-web-660x619.jpg',
      pargraph: 'Indulge in the ultimate opulence and precision engineering at Burj Khalifa – the magnificent tallest building in the world.',
    },
    {
      title: 'Museum Of the Future',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2024/02/Museum-Future-Web-660x619.jpg',
      pargraph: 'Witness the cutting-edge intersection of art, technology, and innovation like never before at the awe-inspiring Museum of the Future.',
    },
    {
      title: 'Dubai Mall',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2024/02/Dubai-Mall-Web-660x619.jpg',
      pargraph: 'Ultimate in luxury shopping and entertainment at the world-renowned Dubai Mall, boasting an unparalleled selection of high-end retailers, exquisite dining options.',
    }
  ];

  return (
    <div className="slider-container px-4 py-10 ">
      <Slider {...settings}>
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="p-4"
          >
            <div className="  overflow-hidden h-full">
              <img src={item.image} className="w-full  object-cover" alt={item.title} />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 text-[#ad7d4b]">{item.title}</h2>
                <p className="text-black text-sm">{item.pargraph}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default Explor;
