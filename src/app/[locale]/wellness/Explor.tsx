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
        slidesToShow: 3,
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
      title: 'Bicycling at Creek',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2024/02/Copy-of-Copy-of-040A3613-rotated-e1708503214372-700x466.jpeg',
      pargraph: 'Complimentary bicycles. Perfect for a leisurely ride around the heritage district. Contact Hotel Reception.',
    },
    {
      title: 'Dubai Creek Golf Club',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2023/08/cdeaa59b-c101-4c7f-b4fe-86374b8ba770-700x466.webp',
      pargraph: 'Enjoy a round of golf at Dubai Creek Golf Club, conveniently located near Golden Sands Creek.',
    },
    {
      title: 'Dubai Jewel Park',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2023/08/5e575860-caa3-46d7-a775-14cd48bc14ef-700x466.webp',
      pargraph: 'A lush green space with themed gardens, exotic plants, and relaxing outdoor vibes.',
    },
    {
      title: 'Dubai Creek Marina',
      image: 'https://www.goldensandscreek.com/wp-content/uploads/2023/08/66fa3b05-2ee0-4be6-b3aa-b3f71453cf43-700x466.webp',
      pargraph: 'Explore the vibrant yacht club nestled in an iconic waterfront at the heart of Dubai Creek.',
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
            <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full">
              <img src={item.image} className="w-full h-[250px] object-cover" alt={item.title} />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 text-[#ad7d4b]">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.pargraph}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default Explor;
