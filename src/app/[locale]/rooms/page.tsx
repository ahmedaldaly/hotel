'use client'
import React from 'react'
import { useLocale } from 'next-intl'
import Fetch from './Fetch';
import PageWrapper from '@/components/General/PageWrapper'
const Page = () => {
  const locale = useLocale();
  const Arabic = locale === 'ar';

  return (
    <PageWrapper>
    <div className='w-full min-h-screen relative'>
      <iframe
        className='w-full object-cover h-[110vh]'
        src="https://www.youtube.com/embed/I6ISbiHyw1c?autoplay=1&mute=1&loop=1&playlist=I6ISbiHyw1c&controls=0&rel=0&playsinline=1"
        title="YouTube video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        frameBorder="0"
      ></iframe>
<div className='absolute w-full h-[110vh] top-0 left-0 bg-black/30'>
      <h1 className="absolute bottom-1/2 left-3/4 transform -translate-x-1/2 text-white text-4xl font-bold">
        {Arabic ? " إقامة في كريك" : "Stay At Creek"}
      </h1>
</div>
    </div>
    {/*  */}
    <div className=' w-full min-h-[100vh]'>
    <h1 className=" text-white text-5xl ml-52 mt-20 ">
        {Arabic ? " غرفنا وأجنحتنا " : "Our Rooms & Suites"}
      </h1>
      <Fetch/>
    </div>
        </PageWrapper>
  )
}

export default Page
