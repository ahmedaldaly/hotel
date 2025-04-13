import React from 'react'
import { useLocale } from 'next-intl'
import Explor from './Explor'
import PageWrapper from '@/components/General/PageWrapper'
const page = () => {
    const locale =useLocale()
    const Arabic = locale ==='ar'
  return (
    <PageWrapper>

    <div className='w-full min-h-[100vh]'>
        <section className='w-full h-72 items-center flex text-black px-20 bg-[#EBDAC8]'>
        <h1 className='text-6xl '>{Arabic?"استكشف دبي":"Explore Dubai"}</h1>    
        </section>
        <section className='w-full min-h-[80vh] bg-[url(/explore.jpg)] bg-cover flex justify-end relative'>
        <div className='bg-black/70 w-[450px] max-sm:w-full h-full absolute py-25 px-11 '>
        <h1 className='text-5xl my-4 '>{Arabic?"دبي.":"Dubai."}</h1>
        <p className='text-xl text-gray-200'>{Arabic?"من أطول مبنى في العالم، إلى جزيرة نخلة جميرا الخلابة، وخور دبي التاريخي الغني. دبي مدينة لا تُنسى. مع مشهد ترفيهي وتسوقي نابض بالحياة، ستجد دائمًا ما تستمتع به في هذه المدينة النابضة بالحياة. لا تنسَ استكشاف الأسواق التقليدية وانغمس في تجربة ثقافية غنية.":"From the tallest building in the world, to the stunning Palm Jumeirah Island, to the rich historic Creek. Dubai is a city that is unforgettable. With a thriving food and shopping scene, there is never a shortage of things to do in this bustling city. Don’t forget to explore the traditional souks and immerse yourself in the cultural experience."}</p>
         </div>
        </section>
        <section className=' w-full min-h-[100vh]   bg-[#EBDAC8]'>
            <Explor/>
        </section>
        {/*  */}
        <section className='w-full min-h-[80vh] bg-[url(/here.jpeg)] bg-cover flex justify-start my-10 relative'>
        <div className='bg-black/70 w-[450px] max-sm:w-full h-full absolute py-25 px-11 '>
        <h1 className='text-5xl my-4 '>{Arabic?"دبي.":"Dubai."}</h1>
        <p className='text-xl text-gray-200'>{Arabic?"من أطول مبنى في العالم، إلى جزيرة نخلة جميرا الخلابة، وخور دبي التاريخي الغني. دبي مدينة لا تُنسى. مع مشهد ترفيهي وتسوقي نابض بالحياة، ستجد دائمًا ما تستمتع به في هذه المدينة النابضة بالحياة. لا تنسَ استكشاف الأسواق التقليدية وانغمس في تجربة ثقافية غنية.":"From the tallest building in the world, to the stunning Palm Jumeirah Island, to the rich historic Creek. Dubai is a city that is unforgettable. With a thriving food and shopping scene, there is never a shortage of things to do in this bustling city. Don’t forget to explore the traditional souks and immerse yourself in the cultural experience."}</p>
         </div>
        </section>
    </div>
    </PageWrapper>
  )
}

export default page