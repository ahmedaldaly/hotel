import React from 'react'
import { useLocale } from 'next-intl'
import LazyLoad from './LazyLoad'
import PageWrapper from '@/components/General/PageWrapper'
const page = () => {
    const locale = useLocale()
    const Arabic = locale ==='ar'
  
  return (
    <PageWrapper>

    <div className='w-full min-h-[100vh]'>
        <section className='w-full h-[100vh] bg-[url(/Dining-Creek.jpg)] bg-cover bg-fixed flex items-center justify-start px-10 md:px-30'>
        <div>
        <h1 className='text-8xl max-md:text-6xl '>{Arabic?"تناول الطعام":"Dining"}</h1>
        <h1 className='text-8xl max-md:text-6xl '>{Arabic?"في كريك":"at Creek"}</h1>
        </div>
        </section>
        <section className='w-full py-10 min-h-[100vh] flex justify-center gap-5 flex-wrap'>
          <div>
            <img src="https://www.goldensandscreek.com/wp-content/uploads/2024/05/Lounge-cover-w-700x466.jpg" alt="image" />
            <h4 className='text-2xl my-4'>{Arabic?"الصالة - تناول الطعام الخاص":"The Lounge - Private Dining"}</h4>
            <p>{Arabic?"مرحباً بكم في The Lounge، ملاذنا الحصري الذي يقدم فخامة .":"Welcome to The Lounge, our exclusive retreat offering unparalleled"}</p>
            <p>{Arabic?"لها وخدمة شخصية.":"luxury and personalized service."}</p>
          
          </div>
          {/*  */}
          <div>
            <img src="https://www.goldensandscreek.com/wp-content/uploads/2024/02/Buonissimo_outdoor_web-700x466.jpg" alt="image" />
            <h4 className='text-2xl my-4'>{Arabic?" مطعم بونيسيمو الإيطالي":"Buonissimo Italian Restaurant"}</h4>
            <p>{Arabic?"  اكتشف بونيسيمو، المطعم الإيطالي المُصمّم خصيصًا لك. تذوق أشهى الأطباق":"Discover Buonissimo, the bespoke Italian restaurant. Savor dishes"}</p>
            <p>{Arabic?" مصنوع من أجود المكونات، ليمنحك المذاق الحقيقي لإيطاليا.":"made with the finest ingredients, delivering a true taste of Italy."}</p>
          
          </div>
        </section>
        {/*  */}
        <section className='w-full py-10 bg-[#EBDAC8] text-black min-h-[100vh] flex justify-center gap-15 flex-wrap'>
          <div>
            <img className='w-[500px] h-[400px]' src="https://www.goldensandscreek.com/wp-content/uploads/elementor/thumbs/Copy-of-Copy-of-IMG_2990-r1y2f50hdyhqa9msz987xbnfh8vlnle27hu94tchny.jpeg" alt="image" />
            <h4 className='text-2xl my-4'>{Arabic?"مطعم جريت أوكس":"Great Oaks Restaurant"}</h4>
            <p>{Arabic?" تنبض مأكولات العالم بالحياة في The Great Oaks، تناول الطعام على ذوقك":"Cuisines of the world come to life at The Great Oaks, eat to your"}</p>
            <p>{Arabic?"استمتع بوجبة الإفطار على البوفيه أو اطلبها من قائمة الطعام.":"hearts content at the breakfast buffet or order à la carte.."}</p>
          
          </div>
          {/*  */}
          <div>
            <img className='w-[500px] h-[400px]' src="https://www.goldensandscreek.com/wp-content/uploads/elementor/thumbs/Dolci-w-r1y2f6w5rmkaxhk2oa1h2b6co0mc2zlivr583d9pbi.jpg" alt="image" />
            <h4 className='text-2xl my-4'>{Arabic?"Buonissimo Dolci":"Buonissimo Dolci"}</h4>
            <p>{Arabic?"قهوة جاهزة! مشروبات ومأكولات شهية مصنوعة يدويًا في":"Coffee on the go! Hand crafted beverages and delicacies in the"}</p>
            <p>{Arabic?" ردهة فندق جولدن ساندز كريك.":"Golden Sands Hotel Creek Lobby."}</p>
          
          </div>
          {/*  */}
          <div>
            <img className='w-[500px] h-[400px]' src="https://www.goldensandscreek.com/wp-content/uploads/elementor/thumbs/Skyviews_small-r1y2f42n74gfyno64qtlctvyvv08fwabvd6rnjdvu6.jpg" alt="image" />
            <h4 className='text-2xl my-4'>{Arabic?" بار حمام السباحة سكاي فيوز":"Skyviews Pool Bar"}</h4>
            <p>{Arabic?"استمتع بـ Sky Views، بار المسبح الذي يوفر إطلالات خلابة على":"Experience Sky Views, pool bar offering breathtaking vistas of the"}</p>
            <p>{Arabic?" أفق دبي والخور. استمتع بتشكيلتنا المختارة.":"Dubai skyline and the creek. Refresh yourself with our selection of."}</p>
            <p>{Arabic?"مشروبات لذيذة أثناء الاستمتاع بالمناظر الخلابة. ":"delightful beverages while soaking in the stunning scenery.."}</p>
          
          </div>
        </section>
      <section className=' w-full overflow-hidden min-h-[80vh] pt-[5vh]'>
        <LazyLoad/>
      </section>
    </div>
    </PageWrapper>
  )
}

export default page