"use client";
import PageWrapper from '@/components/General/PageWrapper'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { BaseUrl } from "@/components/BaseUrl";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';

type FormData = {
  checkInDate: Date;
  checkOutDate: Date;
};

const Page = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const locale = useLocale();
  const Arabic = locale === "ar";
  const { id } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${BaseUrl}/api/v1/room/${id}`)
      .then((res) => {
        setRoom(res.data);
        setSelectedImage(res.data.images[0]?.url);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const onSubmit = handleSubmit(async (data) => {
    const token = Cookies.get("token");
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const days = Math.max(
      1,
      Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
    const total = days * room.price;

    await axios.post(
      `${BaseUrl}/api/v1/booking`,
      {
        roomId: id,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        totalPrice: total,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
   await toast.success('Booking Success')
    setEdit(false); // Close the modal after booking
  });

  if (!room)
    return (
      <div className="text-white text-center py-20">
        {Arabic ? "جاري التحميل ..." : "Loading ..."}
      </div>
    );

  return (
    <PageWrapper>

    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 lg:p-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
        {/* الصور */}
        <div className="w-full lg:w-1/2">
          <img
            src={selectedImage}
            alt="Room"
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-4"
          />

          <div className="flex gap-4 overflow-x-auto">
            {room.images.map((img: any, index: number) => (
              <img
                key={index}
                src={img.url}
                alt={`Room ${index + 1}`}
                onClick={() => setSelectedImage(img.url)}
                className={`w-24 h-20 object-cover rounded-md cursor-pointer border-2 ${
                  selectedImage === img.url
                  ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* التفاصيل */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">{room.bedType}</h2>
          <p className="text-lg text-gray-300">{room.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-white">
                {Arabic ? "النوع" : "Type"}:
              </span>{" "}
              {room.type}
            </div>
            <div>
              <span className="font-semibold text-white">
                {Arabic ? "السعر" : "Price"}:
              </span>{" "}
              ${room.price}
            </div>
            <div>
              <span className="font-semibold text-white">
                {Arabic ? "السعة" : "Capacity"}:
              </span>{" "}
              {room.capacity} {Arabic ? "أشخاص" : "People"}
            </div>
            <div>
              <span className="font-semibold text-white">
                {Arabic ? "متاحة" : "Is Available"}:
              </span>{" "}
              {room.isAvailable
                ? Arabic
                  ? "نعم"
                  : "Yes"
                : Arabic
                ? "لا"
                : "No"}
            </div>
            {room.discount > 0 && (
              <div>
                <span className="font-semibold text-white">
                  {Arabic ? "خصم" : "Discount"}:
                </span>{" "}
                {room.discount}%
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              {Arabic ? "المميزات" : "Amenities"}:
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {room.amenities.map((a: string, i: number) => (
                <li key={i}>{a.trim()}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
            >
              {Arabic ? "احجز الآن" : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {/* مودال الحجز */}
      {edit && (
        <div className="w-full h-full fixed top-0 left-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1e1e] text-black dark:text-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              {Arabic ? "تفاصيل الحجز" : "Booking Details"}
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">
                  {Arabic ? "تاريخ الوصول" : "Check In Date"}
                </label>
                <input
                  type="date"
                  {...register("checkInDate", { required: true })}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block mb-1">
                  {Arabic ? "تاريخ المغادرة" : "Check Out Date"}
                </label>
                <input
                  type="date"
                  {...register("checkOutDate", { required: true })}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* عرض السعر الإجمالي */}
              {room && (
                <div className="text-lg font-semibold mt-4">
                  {Arabic ? "الإجمالي" : "Total"}:{" "}
                  {(() => {
                    const checkIn = new Date(
                      (
                        document.querySelector(
                          '[name="checkInDate"]'
                        ) as HTMLInputElement
                      )?.value
                    );
                    const checkOut = new Date(
                      (
                        document.querySelector(
                          '[name="checkOutDate"]'
                        ) as HTMLInputElement
                      )?.value
                    );
                    const days = Math.max(
                      1,
                      Math.ceil(
                        (checkOut.getTime() - checkIn.getTime()) /
                        (1000 * 60 * 60 * 24)
                      )
                    );
                    const total = days * room.price;
                    return `$${total} (${days} ${Arabic ? "يوم" : "days"})`;
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
                  onClick={() => setEdit(false)}
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
      </PageWrapper>
  );
};

export default Page;
