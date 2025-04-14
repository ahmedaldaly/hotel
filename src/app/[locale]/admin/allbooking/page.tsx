'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '@/components/General/PageWrapper'
import axios from 'axios'
import { BaseUrl } from '@/components/BaseUrl'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'

interface Room {
  images: { url: string }[]
  type: string
  roomNumber: number
  price: number
  discount: number
  capacity: number
  bedType: string
  amenities: string[]
}

interface Booking {
  _id: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  status: 'Pending' | 'Confirmed'
  roomId: Room
}

const Page: React.FC = () => {
  const token = Cookies.get('token')
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get<Booking[]>(`${BaseUrl}/api/v1/booking/all`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setBookings(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchBookings()
  }, [token])

  const edit = async (id: string, newStatus: 'Pending' | 'Confirmed') => {
    try {
      await axios.put(`${BaseUrl}/api/v1/booking/${id}`, {
        status: newStatus
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      setBookings(prev =>
        prev.map(b =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <PageWrapper>
      <div className="min-h-screen w-full bg-zinc-900 text-white px-5 md:px-20 py-20">
        <h1 className="text-4xl font-bold mb-10 text-center">My Bookings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              className="bg-zinc-800 p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={booking.roomId?.images[0]?.url}
                alt="room"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">{booking.roomId?.type} - #{booking.roomId?.roomNumber}</h2>
              <p className="text-gray-400 mb-1">Price: ${booking.roomId?.price}</p>
              <p className="text-gray-400 mb-1">Discount: {booking.roomId?.discount}%</p>
              <p className="text-gray-400 mb-1">Capacity: {booking.roomId?.capacity}</p>
              <p className="text-gray-400 mb-1">Bed: {booking.roomId?.bedType}</p>
              <p className="text-gray-400 mb-1">Amenities: {booking.roomId?.amenities?.join(', ')}</p>
              <p className="text-gray-400 mb-1">Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
              <p className="text-gray-400 mb-1">Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
              <p className="text-gray-400 mb-3">
                Status: <span className={`font-semibold ${booking.status === 'Pending' ? 'text-yellow-400' : 'text-green-400'}`}>{booking.status}</span>
              </p>

              <select
                value={booking.status}
                onChange={(e) => edit(booking._id, e.target.value as 'Pending' | 'Confirmed')}
                className="bg-zinc-700 text-white px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
              </select>

              <p className="text-gray-300 mt-4">Total Price: <span className="font-bold text-indigo-400">${booking.totalPrice}</span></p>
            </motion.div>
          ))}
        </div>

        {bookings.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No bookings found.</p>
        )}
      </div>
    </PageWrapper>
  )
}

export default Page
