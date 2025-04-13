'use client';
import React from 'react';
import './side.css';
import { FaUserEdit } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { RiFunctionAddLine } from "react-icons/ri";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoHomeSharp } from "react-icons/io5";
import Link from 'next/link';

const SideBar = () => {
  return (
    <div className="w-[80%] side  max-sm:w-[95%] max-sm:left-[2.5%] left-[10%] fixed top-0 z-10 border-b border-gray-200 py-6 px-4 bg-white backdrop-blur-md text-black shadow-md rounded-b-[70px]">
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
        
        <Link
          href="/admin/users"
          className="icon-btn"
          title="إدارة المستخدمين"
        >
          <FaUserEdit />
        </Link>

        <Link
          href="/admin/roommangment"
          className="icon-btn"
          title="إدارة الغرف"
        >
          <IoBed />
        </Link>

        <Link
          href="/admin/addroom"
          className="icon-btn"
          title="إضافة غرفة"
        >
          <RiFunctionAddLine />
        </Link>

        <Link href='/admin/allbooking'
          className="icon-btn"
          title="الحجوزات"
        >
          <CiBookmarkCheck />
        </Link>

        <Link
          href="/"
          className="icon-btn"
          title="الرئيسية"
        >
          <IoHomeSharp />
        </Link>

      </div>
    </div>
  );
};

export default SideBar;
