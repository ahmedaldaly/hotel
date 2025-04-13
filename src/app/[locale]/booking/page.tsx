'use client'
import { BaseUrl } from '@/components/BaseUrl'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import PageWrapper from '@/components/General/PageWrapper'
import { ToastContainer, toast } from 'react-toastify';
import { useLocale } from 'next-intl'
type Room = {
  _id: string
  roomNumber: number
  type: string
  bedType: string
  price: number
  capacity: number
  description: string
  images: {
    url: string
    public_id: string
    _id: string
  }[]
  isAvailable: boolean
  amenities: string[]
  discount: number
  bookedDates: string[]
}

type Booking = {
  _id: string
  userId: string
  roomId: Room
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  status: string
}

const Page = () => {
  const locale = useLocale()
  const Arabic =locale ==='ar'
  const [bookings, setBookings] = useState<Booking[]>([])
  const token = Cookies.get('token')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/api/v1/booking`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        setBookings(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchBookings()
  }, [])
  const totalAmount = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
  const puy = async(total:number) =>{
    await axios.post(`${BaseUrl}/create-checkout-session`,{
      price:total
    })
    .then((data)=>{
      console.log(data.data)
    window.location.href = data.data.url
    })
  }
const delet = async (id:string)=>{
    await axios.delete(`${BaseUrl}/api/v1/booking/${id}`,{
        headers: {
            authorization: `Bearer ${token}`,
          },   
    })
    setBookings((prev) => prev.filter((booking) => booking._id !== id))
    toast.success('تم الحذف')
}


  return (
    <PageWrapper>

    <div className="w-full min-h-screen p-4 py-20 ">
      <h2 className="text-2xl font-bold mb-6">حجوزاتك</h2>
      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4"
          >
            <div className="flex-shrink-0 w-full md:w-1/3">
              <img
                src={booking.roomId.images[0]?.url}
                alt="Room"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl text-gray-600 font-semibold mb-2">
                   {Arabic?"رقم الغرفة":"Room Number"} {booking.roomId.roomNumber} - {booking.roomId.type}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                   {Arabic?"توع السرير":"Bed Type"} {booking.roomId.bedType}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  {Arabic?"من":"From"} {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                {Arabic?"الي ":"To"}: {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                   {Arabic?"الاجمالي":"Total"}: ${booking.totalPrice}
                </p>
              </div>
              <div className="mt-4">
                <span
                  className={`px-4 py-1 rounded-full text-white text-sm ${
                    booking.status === 'Confirmed'
                      ? 'bg-green-500'
                      : 'bg-yellow-500'
                  }`}
                >
                  {booking.status === 'Confirmed' ? 'تم التأكيد' : booking.status}
                </span>
                {booking.status != 'Confirmed' &&  <button onClick={()=>delet(booking._id)} className='  px-4 py-1 rounded-full bg-black hover:bg-red-500 duration-300 mx-5 text-sm'>Delete</button>}
               
              </div>
            </div>
          </div>
        ))}
      <button 
      onClick={()=>puy(totalAmount)}
      className=' hover:bg-blue-900 mx-auto  w-42 h-11 bg-blue-500 rounded-2xl'>{Arabic?"دفع مسبق":"Prepaid"}  ${totalAmount}</button>
      </div>
      <ToastContainer />
    </div>
    </PageWrapper>
  )
}

export default Page
