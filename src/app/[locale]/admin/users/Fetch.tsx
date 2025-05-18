'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../../components/BaseUrl'
import cookie from 'js-cookie'
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { useLocale } from 'next-intl'

const Fetch = () => {
  const token = cookie.get('token')
  const locale = useLocale()
  const Arabic = locale === 'ar'

  interface user {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  }

  const [user, setUser] = useState<user[]>([])

  useEffect(() => {
    try {
      axios.get(`${BaseUrl}/api/v1/user`, {
        headers: {
          authorization: `Berere ${token}`
        }
      })
        .then((data) => {
          setUser(data.data)
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  const delet = async (id: string) => {
    try {
      await axios.delete(`${BaseUrl}/api/v1/user/${id}`, {
        headers: {
          authorization: `Berere ${token}`
        }
      })
      setUser(data => data.filter(user => user._id !== id));
    } catch (err) {
      console.log(err)
    }
  }

  const edit = async (id: string, admin: boolean) => {
    const eadmin = !admin
   
    try {
      await axios.put(`${BaseUrl}/api/v1/user/${id}`, {
        Admin: eadmin
      }, {
        headers: {
          authorization: `Berere ${token}`
        }
      })
      setUser(data => data.map(user =>
        user._id === id ? { ...user, isAdmin: eadmin } : user
      ));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="my-10 flex items-center justify-center ">
      <div className="w-full max-w-4xl overflow-x-auto rounded-xl backdrop-blur-md bg-white/10 shadow-md ring-1 ring-white/20">
        <table className="min-w-full text-sm text-white text-left">
          <thead className="bg-white/10 border-b max-lg:hidden border-white/20">
            <tr>
              <th className="px-6 py-4">{Arabic ? "اسم المستخدم:" : "UserName :"}</th>
              <th className="px-6 py-4">{Arabic ? "البريد الالكتروني :" : "Email :"}</th>
              <th className="px-6 py-4">{Arabic ? "مسئول :" : "Admin :"}</th>
              <th className="px-6 py-4">{Arabic ? "التحكم :" : "Control :"}</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => (
              <tr key={item._id} className="hover:bg-white/10 max-lg:flex max-lg:flex-wrap max-lg:justify-center transition duration-300 border-b border-white/10">
                <td className="px-6 py-4 max-lg:w-full max-lg:flex max-lg:justify-center">{item.name}</td>
                <td className="px-6 py-4 max-lg:w-full max-lg:flex max-lg:justify-center">{item.email}</td>
                <td className="px-6 py-4 max-lg:w-full max-lg:flex max-lg:justify-center">{item.isAdmin ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 max-lg:w-full flex justify-center gap-2 items-center">
                  <div
                    onClick={() => edit(item._id, item.isAdmin)}
                    className='w-8 h-8 rounded-full border-1 hover:shadow-md hover:scale-105 hover:text-green-400 duration-300 hover:shadow-black border-gray-200 flex justify-center items-center text-xl'>
                    <MdOutlineEdit />
                  </div>
                  <div
                    onClick={() => delet(item._id)}
                    className='w-8 h-8 rounded-full border-1 hover:shadow-md hover:scale-105 hover:text-red-400 duration-300 hover:shadow-black border-gray-200 flex justify-center items-center text-xl'>
                    <AiOutlineDelete />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Fetch
