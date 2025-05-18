'use client'
import React from 'react'
import { useLocale } from 'next-intl'
import Slider from "react-slick"
import { motion } from 'framer-motion'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import PageWrapper from '@/components/General/PageWrapper'
const page = () => {
  const locale = useLocale()
  const Arabic = locale === 'ar'
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    rtl: Arabic, // مهم جدًا
    arrows: true, // للتنقل
    adaptiveHeight: true
  }

  return (
    <PageWrapper>

    <div className='w-full min-h-screen overflow-hidden'>

      {/* Hero Section */}
      <section className='w-full min-h-[100vh] bg-[url(/business.jpg)] bg-cover bg-center relative'>
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center text-white text-center'>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className='text-5xl md:text-7xl font-bold'>{Arabic ? "يقابل" : "Meet"}</h1>
            <h1 className='text-5xl md:text-7xl font-bold mt-4'>{Arabic ? "في خور" : "At Creek"}</h1>
          </motion.div>
        </div>
      </section>

      {/* Section 1 */}
      <section className='w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-10 my-10 px-5'>
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          src="https://www.goldensandscreek.com/wp-content/uploads/2024/02/Meeting06.jpg"
          className='w-[90%] md:w-[700px] rounded-xl shadow-lg'
          alt="Business Meeting"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className='w-full md:w-[50%] px-6 py-10 text-white'
          style={{
            background: 'linear-gradient(to left, transparent 50%, #333 50%)'
          }}
        >
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>{Arabic ? "عمل" : "Business"}</h1>
          <p className='text-base md:text-lg'>
            {Arabic
              ? "يتمتع بموقع مميز، وخدمة لا مثيل لها، ومساحات اجتماعات مرنة تغمرها الإضاءة الطبيعية، نحن نقدم خلفية حصرية للفعاليات التجارية."
              : "Boasting a distinguished location, unparalleled service, and flexible meeting spaces bathed in natural light, we provide an exclusive backdrop for business events."
            }
          </p>
        </motion.div>
      </section>

      {/* Section 2 with Slider */}
      <section className='w-full min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-center gap-10 my-10 px-5'>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className='w-full md:w-[50%] px-6 py-10 text-white'
          style={{
            background: 'linear-gradient(to right, transparent 50%, #333 50%)'
          }}
        >
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>{Arabic ? "الاجتماعات" : "Meetings"}</h1>
          <p className='text-base md:text-lg'>
            {Arabic
              ? "اكتشف الفخامة التي لا تضاهى عند حجز مساحة اجتماعات في جولدن ساندز كريك. من المؤتمرات والاجتماعات المهمة إلى الفعاليات السنوية، نضمن لك تجربة لا تُنسى تجمع بين الفخامة والعملية."
              : "Discover unparalleled luxury when you book a meeting space at Golden Sands Creek. From conferences and crucial meetings to annual business events, we guarantee a memorable experience that blends sumptuousness with practicality."
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-[700px] slider-container"
        >
          <Slider {...settings}>
            {[
              "https://www.goldensandscreek.com/wp-content/uploads/2024/02/Meeting10-1024x683.jpg",
              "https://www.goldensandscreek.com/wp-content/uploads/2024/02/Meeting11-1024x683.jpg",
              "https://www.goldensandscreek.com/wp-content/uploads/2024/02/Meeting09-1-1024x683.jpg"
            ].map((img, i) => (
              <div key={i}>
                <img
                  src={img}
                  className='w-[90%] md:w-[700px] rounded-xl shadow-lg mx-auto'
                  alt={`Slide ${i + 1}`}
                />
              </div>
            ))}
          </Slider>
        </motion.div>
      </section>

    </div>
                  </PageWrapper>
  )
}

export default page
