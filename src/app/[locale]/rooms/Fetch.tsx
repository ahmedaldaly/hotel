'use client';

import { BaseUrl } from "@/components/BaseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
interface Room {
  amenities: string[];
  bedType: string;
  description: string;
  _id: string;
  price: number;
  images: {
    url: string;
  }[];
}

type FormData = {
  checkInDate: string;
  checkOutDate: string;
};

const Fetch = () => {
  const locale = useLocale();
  const Arabic = locale === "ar";
  const token = cookie.get("token");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/room`).then((data) => {
      setRooms(data.data);
    });
  }, []);

  const handleBookingClick = (room: Room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedRoom) return;

    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const days = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const total = days * selectedRoom.price;

    await axios.post(`${BaseUrl}/api/v1/booking`, {
      roomId: selectedRoom._id,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      totalPrice: total,
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
 await toast.success('Booking Success')
    setShowModal(false);
    reset();
  };

  return (
    <div className="p-10 flex flex-col gap-16">
      {rooms.map((item, index) => (
        <div
          key={item._id}
          className={`flex flex-col lg:flex-row ${
            index % 2 !== 0 ? "lg:flex-row-reverse " : ""
          } items-center gap-8`}
        >
          <div className="w-full lg:w-1/2">
            <img
              src={item.images[1]?.url || item.images[0]?.url}
              alt="Room"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full lg:w-1/2 text-white space-y-4">
            <h2 className="text-3xl font-bold">{item.bedType}</h2>
            <p className="text-lg">{item.description}</p>
            <div>
              <button
                onClick={() => handleBookingClick(item)}
                className="w-32 h-11 bg-[#EBDAC8] text-black mx-2 cursor-pointer"
              >
                {Arabic ? "احجز الآن" : "Book Now"}
              </button>
              <button className="w-32 h-11 border border-white mx-2 cursor-pointer">
                <Link href={`/rooms/${item._id}`}>
                  {Arabic ? "تعرف على المزيد" : "Learn More"}
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* مودال الحجز */}
      {showModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1e1e] text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-semibold mb-4">{Arabic ? "تفاصيل الحجز" : "Booking Details"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label>{Arabic ? "تاريخ الوصول" : "Check In Date"}</label>
                <input
                  type="date"
                  {...register("checkInDate", { required: true })}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-[#2a2a2a] border"
                />
              </div>
              <div>
                <label>{Arabic ? "تاريخ المغادرة" : "Check Out Date"}</label>
                <input
                  type="date"
                  {...register("checkOutDate", { required: true })}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-[#2a2a2a] border"
                />
              </div>

              {/* السعر الإجمالي */}
              {checkInDate && checkOutDate && (
                <div className="text-lg font-semibold">
                  {(() => {
                    const checkIn = new Date(checkInDate);
                    const checkOut = new Date(checkOutDate);
                    const days = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
                    const total = days * selectedRoom.price;
                    return `${Arabic ? "الإجمالي" : "Total"}: $${total} (${days} ${Arabic ? "يوم" : "days"})`;
                  })()}
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  {Arabic ? "تأكيد الحجز" : "Confirm Booking"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                >
                  {Arabic ? "إلغاء" : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
       <ToastContainer />
    </div>
  );
};

export default Fetch;
