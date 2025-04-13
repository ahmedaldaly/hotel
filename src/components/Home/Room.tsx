'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../BaseUrl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface RoomType {
  _id: string;
  description: string;
  images: {
    url: string;
  }[];
}

const Room = () => {
  const [room, setRoom] = useState<RoomType[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Fetch rooms
  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/room`)
      .then((res) => {
        setRoom(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Responsive width handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize(); // Run on load
    window.addEventListener('resize', handleResize); // Run on resize

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1
  };

  return (
    <div className="slider-container w-full flex justify-center items-center my-10">
      <Slider {...settings} className="w-full max-w-[95%]">
        {room.map((item) => (
          <div key={item._id} className='px-2 w-full'>
            <img className='w-full h-[300px] object-cover ' src={item.images[0]?.url} alt="room" />
            <h1 className='m-5 mt-2 text-lg font-medium text-xl'>{item.description}</h1>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Room;
