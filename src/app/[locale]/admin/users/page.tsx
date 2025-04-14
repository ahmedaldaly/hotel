import React from 'react'
import { useLocale } from 'next-intl'
import Fetch from './Fetch'
import PageWrapper from '@/components/General/PageWrapper'
const page = () => {
    const locale =useLocale()
    const isArabic = locale ==='ar'
  return (
    <PageWrapper>

    <div className='w-full text-center pt-20'>
        <h1 className='text-3xl font-bold'>{isArabic?"ادارة المستخدمين":"User Management"}</h1>
    <Fetch/>
    </div>
    </PageWrapper>
  )
}

export default page