import React from 'react'
import { useLocale } from 'next-intl'
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import PageWrapper from '@/components/General/PageWrapper'
import Explor from './Explor';
const page = () => {
    const locale = useLocale()
    const Arabic = locale ==='ar'
  return (
    <PageWrapper>

    <div className='w-full overflow-hidden min-h-[100vh]'>
           <section className='w-full h-[100vh] bg-[url(/big.jpg)] max-md:bg-[url(/small.jpg)] bg-cover bg-fixed flex items-center justify-start px-10 md:px-30'>
        <div>
        <h1 className='text-8xl max-md:text-6xl '>{Arabic?" صحة":"Wellness"}</h1>
        <h1 className='text-8xl max-md:text-6xl '>{Arabic?" &رعاية الذات":"& Self Care"}</h1>
        </div>
        </section>
        {/*  */}
        <section className=' w-full min-h-[80vh] bg-[#EBDAC8] flex flex-wrap py-5 justify-center gap-10'>
            <div className='w-[600px] max-md:w-full max-md:h-auto h-[600px] max-lg:w-[400px] max-lg:h-[400px] flex justify-center items-center bg-[#e1ceb9]'>
                <img className='h-[95%] w-[95%]' src="https://www.goldensandscreek.com/wp-content/uploads/2024/01/Paru-Welness-web.jpg" alt="img" />
            </div>

            <div className='w-[700px] max-2xl:w-[600px] max-lg:w-[400px] max-md:w-auto '>
                <h1 className='text-5xl max-md:text-3xl max-md:mx-5 text-black mt-15 max-lg:mt-0 '>{Arabic?"بارو":"Paru"}</h1>
                <h1 className='text-5xl max-md:text-3xl max-md:mx-5 text-black mb-10 '>{Arabic?"صالون التجميل":"Beauty Lounge"}</h1>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-gray-700'>{Arabic?"استمتعي بملاذٍ من الهدوء والسكينة في صالون بارو للتجميل، الواقع في قلب دبي العريق،":"Enter a sanctuary of tranquility at Paru Beauty Lounge, nestled within the"}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-gray-700'>{Arabic?"حيث ترتقي الفخامة والاسترخاء إلى مستويات لا مثيل لها. صالوننا التجميلي المتميز، الذي":"heritage heart of Dubai, where luxury and relaxation are elevated to"}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-gray-700'>{Arabic?"يشتهر بخدماته الراقية ووسائل الراحة الفاخرة وأجوائه الهادئة، يدعوكِ إلى رحلة استثنائية":"unparalleled levels. Our distinguished beauty lounge, celebrated for its"}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-gray-700'>{Arabic?"نحو تجديد حيويتكِ":"sublime service, opulent amenities, and tranquil ambience, invites you on an"}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-[#ad7d4b] mt-10 flex items-center gap-2'><MdOutlinePhone/> +20 1017803491</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-[#ad7d4b] py-2 flex items-center gap-2'><MdOutlineMail/>ahm3deldlay2@gmail.com</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-[#ad7d4b]  flex items-center gap-2'> <FaRegClock/>{Arabic?"يوميا من 10:00صباحا حتي 8:00مسائا":"Monday to Saturday from 10:00 AM to 08:00 PM"}</p>
            </div>
        </section>
        {/*  */}
        <section className=' w-full min-h-[90vh]  text-white flex flex-wrap py-5 justify-center gap-10'>
           
            <div className='w-[700px] max-2xl:w-[600px] max-lg:w-[400px] max-md:w-auto '>
                <h1 className='text-5xl max-md:text-3xl max-md:mx-5  mt-15 max-lg:mt-0 '>{Arabic?"مركز":"Fitness"}</h1>
                <h1 className='text-5xl max-md:text-3xl max-md:mx-5 mb-10 '>{Arabic?" لياقة بدنية":"Center"}</h1>
                <p className='text-xl max-md:text-sm max-md:mx-5 '>{Arabic?" صمم مركز اللياقة البدنية لالهام وتحفيذ الجميع":"The fitness center is designed to motivate everyone."}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 '>{Arabic?" من عشاق اللياقة البدنية  الي ان يبدئون رحلتهم":"From fitness enthusiasts to those starting their journey"}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 '>{Arabic?"يتميز صالتنا الرياضية بنوافذها الكبيرة، وتوفر إطلالات بانورامية":"Our gym features large windows, offering panoramic views."}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 '>{Arabic?" غمر المكان بالضوء الطبيعي، كما تُضفي خلفية مُنعشة على روتين تمارينك":"It floods the space with natural light and provides a refreshing backdrop for your exercise routine."}</p>
                <p className='text-xl max-md:text-sm max-md:mx-5 text-[#ad7d4b] py-10 flex items-center gap-2'> <FaRegClock/>{Arabic?"يوميا من 10:00صباحا حتي 8:00مسائا":"Monday to Saturday from 10:00 AM to 08:00 PM"}</p>
            </div>
            <div className='w-[600px] max-md:w-full max-md:h-auto h-[600px] max-lg:w-[400px] max-lg:h-[400px] flex justify-center items-center bg-[#e1ceb9]'>
                <img className='h-[95%] w-[95%]' src="https://www.goldensandscreek.com/wp-content/uploads/2024/01/Gym_Creek_Web.jpeg" alt="img" />
            </div>
        </section>
        {/*  */}
        <section className=' w-full min-h-[80vh] bg-[#EBDAC8] flex flex-wrap py-5 justify-center gap-10'>
  <div className='w-[600px] max-md:w-full max-md:h-auto h-[600px] max-lg:w-[400px] max-lg:h-[400px] flex justify-center items-center bg-[#e1ceb9]'>
    <img className='h-[95%] w-[95%]' src="https://www.goldensandscreek.com/wp-content/uploads/2024/02/Copy-of-Copy-of-750_7316.jpeg" alt="img" />
  </div>

  <div className='w-[700px] max-2xl:w-[600px] max-lg:w-[400px] max-md:w-auto '>
    <h1 className='text-5xl max-md:text-3xl max-md:mx-5 text-black mt-15 max-lg:mt-0 '>{Arabic ? "بانورامي" : "Panoramic"}</h1>
    <h1 className='text-5xl max-md:text-3xl max-md:mx-5 text-black mb-10 '>{Arabic ? " حمام سباحة" : "Swimming Pool"}</h1>
    
    <p className='text-xl max-md:text-sm max-md:mx-5 text-gray-700'>
      {Arabic ? "استمتع بجلسة سباحة فاخرة في حمام السباحة البانورامي المصمم ليمنحك إحساسًا بالراحة والرفاهية." : 
      "Enjoy a luxurious swim in our panoramic pool designed to offer you ultimate comfort and relaxation."}
    </p>
    <p className='text-xl max-md:text-sm max-md:mx-5 text-gray-700'>
      {Arabic ? "يتميز المسبح بإطلالة خلابة ومساحة هادئة تجعله المكان المثالي للهروب من ضغوط الحياة." : 
      "The pool features stunning views and a peaceful atmosphere — the perfect escape from daily stress."}
    </p>
    <p className='text-xl max-md:text-sm max-md:mx-5 text-gray-700'>
      {Arabic ? "استمتع بأجواء لا تُضاهى وخدمة راقية تجعلك تعيش تجربة لا تُنسى." : 
      "Unmatched ambiance and exceptional service create an unforgettable experience."}
    </p>

    <p className='text-xl max-md:text-sm max-md:mx-5 text-[#ad7d4b] mt-10 flex items-center gap-2'><MdOutlinePhone/> +20 1017803491</p>
    <p className='text-xl max-md:text-sm max-md:mx-5 text-[#ad7d4b] py-2 flex items-center gap-2'><MdOutlineMail/>ahm3deldlay2@gmail.com</p>
    <p className='text-xl max-md:text-sm max-md:mx-5 text-[#ad7d4b]  flex items-center gap-2'> <FaRegClock/>{Arabic?"يوميا من 10:00صباحا حتي 8:00مسائا":"Monday to Saturday from 10:00 AM to 08:00 PM"}</p>
  </div>
</section>

 <section className=' py-20 w-full overflow-hidden  min-h-[100vh]'>
        <div className='flex w-full justify-center max-md:block gap-20'>
          <h1 className='text-6xl max-md:w-full  w-[20%]'>{Arabic?"":"Explore Wellness"}</h1>         
          <p className='w-[40%] py-10 max-md:w-full text-gray-400'>{Arabic?"":"Embark on a Journey of Wellness: Discover an array of wellness and fitness activities near the Creek. Experience local running tracks, parks, golf courses and a lot more. All within close reach. Elevate your travel experience with health and vitality, right at your doorstep"} </p>
        </div>
 <Explor/>
      </section>
    </div>
    </PageWrapper>
  )
}

export default page