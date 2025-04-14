'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from "next/navigation";
import { GiWorld } from "react-icons/gi";
import { motion, AnimatePresence } from 'framer-motion'
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import cookie from 'js-cookie'
const Header = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const router = useRouter();
  const pathname = usePathname();

  const hideHeader = pathname.includes('/admin'); // 👈 الشرط هنا

  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [token, setToken] = useState<string | undefined>();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
useEffect(()=>{
  const token = cookie.get('token')
  setToken(token)
  
},[])
  const toggleLanguage = () => {
    const newLocale = isArabic ? 'en' : 'ar'; 
    router.replace(`/${newLocale}`);
  };

  if (hideHeader) return null; // 👈 لو /admin خفي الهيدر

  return (
    <>
      {/* الهيدر عادي */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-20 px-5 h-20 flex justify-between items-center ${
          scrolled ? 'bg-black/70 shadow-md backdrop-blur-md' : 'bg-transparent'
        } text-white duration-300`}
      >
        <Link href='/'><img className='w-14' src="https://www.goldensandscreek.com/wp-content/uploads/2024/01/GSHC-Logo-White.png" alt="logo" /></Link>
        
        <div className='flex gap-4 max-md:hidden'>
          <Link href={`/rooms`}>{isArabic ? "الغرف" : "Rooms"}</Link>
          <Link href={`/dining`}>{isArabic ? "تناول الطعام" : "Dining"}</Link>
          <Link href={`/wellness`}>{isArabic ? "صحة" : "Wellness"}</Link>
          <Link href={`/explore`}>{isArabic ? "يستكشف" : "Explore"}</Link>
          <Link href={`/business`}>{isArabic ? "عمل" : "Business"}</Link>
          <Link href={`/booking`}>    {isArabic ? "الحوجزات" : "Booking"}</Link>
          
        </div>

        <div className="flex gap-5">
          <button 
            onClick={toggleLanguage} 
            className='flex gap-1 cursor-pointer hover:scale-105 duration-300 hover:text-green-500 justify-center items-center'>
            <GiWorld/>
            {isArabic ? "EN" : "AR"}
          </button>

          {token?<button className='w-32 h-9 cursor-pointer hover:scale-105 hover:border-white duration-300 hover:text-white border border-amber-400 text-yellow-400 rounded-md'>
          <Link href='/book'> {isArabic ? "احجز الآن" : "Book Now"}</Link> 
          </button>:<button className='w-32 h-9 cursor-pointer hover:scale-105 hover:border-white duration-300 hover:text-white border border-amber-400 text-yellow-400 rounded-md'>
           <Link href='/login'>
            {isArabic ? " سجل الان" : " Log In Now"}
           </Link>
          </button>}
          <div onClick={() => setMenu(true)} className=' hidden max-md:flex justify-center items-center cursor-pointer hover:text-gray-400'>
            <CiMenuFries/>
          </div>
        </div>
      </motion.div>

      {/* السايد مينيو */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-30 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="w-full h-full bg-black/50 backdrop-blur-sm"
              onClick={() => setMenu(false)}
            ></div>

            <motion.div
              initial={{ x: isArabic ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? '-100%' : '100%' }}
              transition={{ duration: 0.4 }}
              className={`fixed top-0 ${isArabic ? 'left-0' : 'right-0'} h-full w-60 bg-black/80 text-white shadow-lg px-5`}
            >
              <div className="flex justify-end p-4 text-3xl cursor-pointer" onClick={() => setMenu(false)}>
                <IoMdClose />
              </div>

              <div className="flex flex-col space-y-3">
                <Link className="py-2 border-b border-gray-700" href={`/rooms`}>
                  {isArabic ? "الغرف" : "Rooms"}
                </Link>
                <Link className="py-2 border-b border-gray-700" href={`/dining`}>
                  {isArabic ? "تناول الطعام" : "Dining"}
                </Link>
                <Link className="py-2 border-b border-gray-700" href={`/wellness`}>
                  {isArabic ? "صحة" : "Wellness"}
                </Link>
                <Link className="py-2 border-b border-gray-700" href={`/explore`}>
                  {isArabic ? "يستكشف" : "Explore"}
                </Link>
                <Link className="py-2 border-b border-gray-700" href={`/business`}>
                  {isArabic ? "عمل" : "Business"}
                </Link>
                <Link className="py-2 border-b border-gray-700" href={`/booking`}>
                  {isArabic ? "الحوجزات" : "Booking"}
                </Link>
              =
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
