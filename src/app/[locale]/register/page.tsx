'use client'
import React from 'react'
import { useForm } from "react-hook-form"
import { useLocale } from 'next-intl'
import axios from 'axios'
import { BaseUrl } from '@/components/BaseUrl'
import cookie from 'js-cookie'
import Link from 'next/link'
import { FaGoogle } from "react-icons/fa";
import PageWrapper from '@/components/General/PageWrapper'
type FormData = {
  username: string
  email: string 
  password: string 
}
const page = () => {
  const locale = useLocale();
  const isArabic = locale ==='ar'
  const {register, setValue,handleSubmit,formState: { errors },} = useForm<FormData>()
  const onSubmit = handleSubmit(async(data) => {
  try{
    await axios.post(`${BaseUrl}/api/v1/auth/register`,{
      name:data.username,
      email:data.email,
      password:data.password,
    }).then((data)=>{
      console.log(data.data)
    cookie.set('token',data.data.token)
    })
    window.location.href='/'
  }catch(err){console.log(err)}
  })
  return (
    <PageWrapper>

    <form 
    onSubmit={onSubmit}
    className={`mt-20 max-w-md mx-auto px-6 py-8 backdrop-blur-md bg-white/30 rounded-2xl shadow-md space-y-5 border border-white/40 ${isArabic ? 'text-right' : 'text-left'}`}
  >
    <div>
      <label className="block mb-1 text-gray-800 font-semibold">
        {isArabic ? "اسم المستخدم:" : "UserName:"}
      </label>
      <input 
        type="text" 
        required 
        {...register("username")}
        className="w-full px-4 py-2 rounded-lg bg-white/60 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  
    <div>
      <label className="block mb-1 text-gray-800 font-semibold">
        {isArabic ? "البريد الالكتروني:" : "Email:"}
      </label>
      <input 
        type="email" 
        required 
        {...register("email")}
        className="w-full px-4 py-2 rounded-lg bg-white/60 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  
    <div>
      <label className="block mb-1 text-gray-800 font-semibold">
        {isArabic ? "كلمة المرور:" : "Password:"}
      </label>
      <input 
        type="password" 
        required 
        {...register("password")}
        className="w-full px-4 py-2 rounded-lg bg-white/60 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  
    <button 
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
    >
      {isArabic ? "سجل الآن" : "Register Now"}
    </button>
    <Link className='flex w-full justify-center cursor-auto' href={`${BaseUrl}/api/v1/auth/google`}>
   <button className='w-44 h-12 cursor-pointer flex justify-center backdrop-blur-md bg-white/20 hover:scale-105 hover:shadow-xl duration-300 items-center text-2xl rounded-xl gap-2 border-1 border-gray-200'> <FaGoogle/>{isArabic?"عبر جوجل":"  Google"}</button>
   </Link>
  </form>
  
        </PageWrapper>
  )
}

export default page