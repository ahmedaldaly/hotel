

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Room from '@/components/Home/Room';
import { useLocale } from 'next-intl';
import Explore from '@/components/Home/Explore';
import PageWrapper from '@/components/General/PageWrapper'
export default function HomePage() {
  const t = useTranslations('HomePage');
const locale = useLocale()
const Arabic = locale ==='ar'
  return (
    <PageWrapper>
    <div className='w-full'>

      {/* Hero Section */}
      <section className='w-full h-[110vh] bg-[url(/bg.jpg)] bg-cover bg-fixed flex items-center justify-end px-10 md:px-20'>
        <div className='max-w-[600px] text-right'>
          <h1 className='text-4xl md:text-6xl font-bold text-white leading-tight'>
            {t('title')}
          </h1>
          <p className='text-lg md:text-2xl text-white mt-5'>
            <Link href='' className='hover:underline hover:text-amber-300 duration-300'>
              {t('p')}
            </Link>
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className='w-full h-auto md:h-[100vh] flex flex-col md:flex-row items-center justify-center px-5 md:px-20 py-16 gap-10 text-white bg-[#151719]'>

        {/* Text Block */}
        <div className='md:w-1/2 space-y-5'>
          <h2 className='text-3xl md:text-4xl font-semibold'>{t('dtitle')}</h2>
          <p className='text-base md:text-lg text-gray-300'>{t('dp')}</p>
        </div>

        {/* Image Block */}
        <div className='w-full md:w-[800px] h-[300px] md:h-[500px] flex justify-center items-center bg-[#242629] rounded-xl shadow-lg'>
          <img
            src='/Dubai-Web.jpg'
            alt='Dubai'
            className='h-[85%] w-[90%] object-cover rounded-md'
          />
        </div>

      </section>
      <section className=' py-20 w-full overflow-hidden  min-h-[100vh] text-black bg-[#EBDAC8]'>
        <div className='flex w-full justify-center max-md:block gap-20'>
          <p className='w-[40%] py-10 max-md:w-full text-gray-600'>{t('pchoose')} <Link className='text-amber-800 block text-end m-10 font-bold' href='/rooms'>{t('link')}</Link></p>
          <h1 className='text-6xl max-md:w-full  w-[20%]'>{t('choose')}</h1>
        </div>
      <Room/>
      </section>

      <section className='w-full h-[100vh] bg-[url(/bg2.jpg)] bg-cover bg-fixed flex items-center justify-end '>
       <div className='w-full h-full bg-black/40  text-center py-72 flex-wrap'>
       <h1 className='text-5xl my-10 '>{Arabic?"المنتجع الصحي &العافية":"Spa & Wellness"}</h1>
       <p className='px-60 max-xl:px-32 max-md:hidden my-14'>{Arabic?"يُجسّد صالون وسبا بارو للتجميل قمة الفخامة في المدينة، حيث يُقدّم علاجات مُصمّمة خصيصاً لتُنقلكم إلى عالمٍ من الهدوء والسكينة لا مثيل له. صُمّمت كل تجربة لتُقدّم لكم رحلةً رائعةً، تُغمركم في عالمٍ من الفخامة الهادئة والتجديد.":"Paru Beauty Lounge & Spa represents the pinnacle of luxury in the city, delivering custom-designed treatments that transport you into a realm of unparalleled tranquility and mindfulness. Each experience is crafted to offer an exquisite journey, enveloping you in a world of serene opulence and rejuvenation."}</p>
       <Link className='text-xl  hover:text-orange-300' href=''>{Arabic?"اكتشف المزيد":"FIND OUT MORE"}</Link>
       </div>
      </section>
      <section className='w-full h-[80vh]'>
        <div className='flex justify-center gap-9 mt-20  px-20 max-md:px-10'>
          <h1 className='text-6xl max-xl:text-4xl'>{Arabic?"استكشف المدن":"Explore The City"}</h1>
          <p className='text-gray-300 mt-11 max-md:hidden'>{Arabic?"اكتشف قلب دبي النابض بالحياة، وانطلق في عالم من الفخامة والثقافة والمغامرة. ابدأ رحلتك التي لا تُنسى معنا، حيث تُصمّم كل إقامة لتُلهمك قصصًا تستحق المشاركة.":"Discover the vibrant heart of Dubai and unlock a world of luxury, culture, and adventure. Start your unforgettable journey with us, where every stay is tailored to inspire stories worth sharing"}</p>
        </div>
        <Explore/>
      </section>
      <section className=' w-full flex justify-center flex-wrap  min-h-[70vh] bg-[#EBDAC8]'>
        <div className='w-[50%] h-auto text-start max-md:w-full text-black px-5 py-20'>
        <h1 className='text-4xl max-md:text-start my-5 text-end'>{Arabic?"العمل":"Business "}</h1>
        <p>{Arabic?"ارتقِ بأعمالك مع قاعات اجتماعاتنا الحديثة، المصممة لتعزيز الابتكار والتعاون والنجاح.":"Elevate your business with our state-of-the-art meeting rooms, designed to"}</p>
        <p>{Arabic?"استمتع بخدمة لا مثيل لها وأجواء راقية":"foster innovation, collaboration, and success. Experience unparalleled service and sophisticated ambiance."}</p>
        <img src="/work.jpg" alt="img" className='mb-0 mt-5' />
        </div>
        {/*  */}
        <div className='w-[50%] h-auto text-start max-md:w-full px-5 text-black py-20'>
        <h1 className='text-4xl my-5 text-start'>{Arabic?"الاحتفال":" Celebrations"}</h1>
        <p>{Arabic?"من المناظر الخلابة إلى التصميمات الداخلية الفاخرة، دعنا ننشئ لك خلفية ساحرة لاحتفالاتك":"From breathtaking views to luxurious interiors, let us create an enchanting"}</p>
        <p>{Arabic?"مما يجعل كل مناسبة لا تُنسى بشكل فريدمما يجعل كل مناسبة لا تُنسى بشكل فريد":"backdrop for your celebrations, making each occasion uniquely unforgettable"}</p>
        <br />
        <img src="/c.jpg" alt="img" className='mb-0 mt-5' />
        </div>
      </section>
      <div className='w-full px-28'>
       <hr className=''/>
      </div>
       
        
    </div>
    </PageWrapper>
  );
}
