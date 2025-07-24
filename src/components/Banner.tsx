
import Image from 'next/image';
import React from 'react';
import image1 from '@/assets/app.svg'
import image2 from '@/assets/icon10.png'
import Link from 'next/link';
import { useTranslations } from 'next-intl';
const Banner = () => {

  const t = useTranslations('Banner');

  return (
    <div className='bg-blue-600 mt-8 md:mt-10'>

      <div className="min-h-fit  flex flex-col lg:flex-row items-center justify-center p-6 py-5 md:px-10  container mx-auto relative">
        <div className='hidden lg:block absolute w-5 h-5 border border-gray-400 z-10 bottom-5 left-5 rotate-12 rounded-full'></div>
        <div className='hidden lg:block absolute w-10 h-10 border border-gray-900 z-10 top-20 left-20 rotate-45'></div>
        <div className='hidden lg:block absolute w-16 h-16 border border-gray-400 z-10 bottom-32 lg:left-72 xl:left-[450px] rotate-12 rounded-full'></div>
        <div className='hidden lg:block absolute w-14 h-14 border border-gray-400 z-10 bottom-5 left-5 rotate-12 rounded-full'></div>
        <div className='hidden lg:block absolute w-3 h-3  border border-gray-400 z-10 lg:bottom-10 xl:bottom-20 left-80 rotate-12 rounded-full'></div>
        <div className='hidden lg:block absolute w-3 h-3  border border-gray-800 z-10 lg:top-20 xl:top-10 left-72 rounded-full'></div>
        <div className='hidden lg:block absolute w-10 h-32 border border-gray-800 z-10 top-5  xl:left-[600px]  rounded-full rotate-90'></div>
        <div className='hidden xl:block absolute w-10 h-28 border border-gray-400 z-10 bottom-5 right-0  rounded-full rotate-90'></div>
        <div className='hidden 2xl:block absolute w-24 h-24 border border-gray-700 z-10 top-20 right-0  rounded-full rotate-90'></div>
        <div className='hidden lg:block absolute w-20 h-20 border border-gray-400 z-10 bottom-24  rotate-45'></div>
        <div className='hidden lg:block absolute w-12 h-12 border border-gray-400 z-10 bottom-28  rotate-45 '></div>
        <div className='hidden lg:block absolute w-2 h-10 border border-gray-800 z-10 top-28 left-96 rotate-90 rounded-full '></div>



        <div className="lg:w-1/2 md:text-center lg:text-left space-y-4">
          <h1 className=" text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold  lg:block  text-white text-center lg:text-left ">
            {t('Heading')} <span className='flex text-center lg:text-left lg:justify-start mx-auto justify-center  '><span className='bg-clip-text text-transparent bg-orange-600  font-bold'>{t('device')}</span>  <Image src={image2} alt="icon" width={100} height={100} className='w-6 h-6 md:w-10 mt-2 md:h-10 ml-2' /></span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg text-justify 2xl:w-11/12">
            {t('Description')}
          </p>
          <div className='mt-5 md:mt-10 hidden md:block'>
            <Link href="https://www.acecms.in/" className=" text-sm md:text-base  mt-4 p-1.5 md:p-0 md:px-3 md:py-2 border border-white text-white hover:border-indigo-700 hover:text-white rounded shadow-lg hover:bg-indigo-700  transition">
               {t('Tap')}
            </Link>
          </div>
        </div>


        <div className=" mt-8 lg:mt-0 lg:flex justify-center hidden">
          <Image
            src={image1}
            alt="Android Support"
            width={100}
            height={100}
            className="w-[500px] h-[500px] object-cover drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
