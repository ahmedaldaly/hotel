'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocale } from 'next-intl'
import axios from 'axios'
import { BaseUrl } from '@/components/BaseUrl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import PageWrapper from '@/components/General/PageWrapper'
type FormData = {
  checkInDate: Date
}

const page = () => {
  const [rooms, setRooms] = useState([])
  const locale = useLocale()
  const Arabic = locale === 'ar'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (data) => {
    setRooms([])
    try {
      const res = await axios.post(`${BaseUrl}/api/v1/booking/search`, {
        checkInDate: data.checkInDate,
      })
      setRooms(res.data)
    } catch (err) {
      console.error(err)
    }
  })

  return (
    <PageWrapper>

    <div className="min-h-screen w-full bg-zinc-900 text-white p-6 pt-20">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md mx-auto bg-zinc-800 p-6 rounded-2xl shadow-xl">
        <label className="text-lg font-semibold">
          {Arabic ? 'تاريخ الوصول' : 'Check-in Date'}
        </label>
        <input
          {...register('checkInDate', { required: true })}
          type="date"
          className="bg-zinc-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.checkInDate && <p className="text-red-500">{Arabic ? 'مطلوب' : 'Required'}</p>}

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 px-4 rounded-xl"
        >
          {Arabic ? 'ابحث' : 'Search'}
        </button>
      </form>

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room: any, index: number) => (
          <motion.div
            key={room._id || index}
            className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={room.images[0]?.url}
              alt={room.type}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{room.type} - #{room.roomNumber}</h2>
            <p className="mb-1">{room.description}</p>
            <p className="mb-1">{Arabic ? 'السعر' : 'Price'}: ${room.price}</p>
            <p className="mb-1">{Arabic ? 'السعة' : 'Capacity'}: {room.capacity}</p>
            <p className="mb-1">{Arabic ? 'المرافق' : 'Amenities'}: {room.amenities?.join(', ')}</p>
            <p className="mb-1 flex items-center justify-between">
  {Arabic ? 'الخصم' : 'Discount'}: {room.discount}%
  <Link
    href={`/rooms/${room._id}`}
    className="text-indigo-400 hover:text-indigo-600 transition-all duration-300 text-lg flex items-center gap-1"
  >
    {Arabic ? (
      <>
        <IoIosArrowBack />
        <span className="text-sm">{Arabic ? 'تفاصيل' : 'Details'}</span>
      </>
    ) : (
      <>
        <span className="text-sm">{Arabic ? 'تفاصيل' : 'Details'}</span>
        <IoIosArrowForward />
      </>
    )}
  </Link>
</p>

          </motion.div>
        ))}
      </div>
    </div>
      </PageWrapper>
  )
}

export default page