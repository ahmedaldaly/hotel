'use client'
import React from 'react'
import { useLocale } from 'next-intl'
import { FaFacebookF, FaInstagram, FaYoutube, FaTripadvisor } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
const Footer = () => {
  const locale = useLocale();
  const Arabic = locale === 'ar';
 const router = useRouter();
  const pathname = usePathname();

  const hideHeader = pathname.includes('/admin');
  
  if (hideHeader) return null;
  return (
    <footer className='bg-[#EBDAC8] text-black pt-16 pb-8 px-6 md:px-20'>
      <div className='flex flex-wrap justify-between gap-10'>

        {/* Sections */}
        <div>
          <h4 className='text-xl font-semibold mb-4'>{Arabic ? "الأقسام" : "Sections"}</h4>
          <ul className='space-y-2'>
            <li>{Arabic ? "غرفنا" : "Our Rooms"}</li>
            <li>{Arabic ? "تواصل معنا" : "Contact Us"}</li>
            <li>{Arabic ? "من نحن" : "About Us"}</li>
            <li>{Arabic ? "الصحة" : "Wellness"}</li>
            <li>{Arabic ? "تناول الطعام" : "Dining"}</li>
          </ul>
        </div>

        {/* Important */}
        <div>
          <h4 className='text-xl font-semibold mb-4'>{Arabic ? "مهم" : "Important"}</h4>
          <ul className='space-y-2'>
            <li>{Arabic ? "كيفية الوصول" : "Get Directions"}</li>
            <li>{Arabic ? "أسئلة شائعة" : "Frequent Questions"}</li>
            <li>{Arabic ? "الاستدامة" : "Sustainability"}</li>
            <li>{Arabic ? "خريطة الموقع" : "Sitemap"}</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className='text-xl font-semibold mb-4'>{Arabic ? "تواصل" : "Contact"}</h4>
          <p className='mb-2'>
            Golden Sands Hotel Creek,<br />
            Dubai, UAE, P.O.Box 33397
          </p>
          <p className='mb-2'>Tel: +971 4 212 7000</p>
          <p>reservations@goldensands.ae</p>
        </div>

        {/* Social */}
        <div>
          <h4 className='text-xl font-semibold mb-4'>{Arabic ? "اجتماعي" : "Social"}</h4>
          <div className='flex gap-4 text-2xl'>
            <FaFacebookF />
            <FaTripadvisor />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>

      </div>

      {/* Divider and bottom info */}
      <div className='mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4'>
        <div className='flex items-center gap-2'>
          <span>©</span>
          <p>Golden Sands Hotel Creek. {Arabic ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
        </div>
        <div className='flex gap-4'>
          <a href="#" className="hover:underline">{Arabic ? "سياسة الخصوصية" : "Privacy Policy"}</a>
          <a href="#" className="hover:underline">{Arabic ? "الشروط والأحكام" : "Terms & Conditions"}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
