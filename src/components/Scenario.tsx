
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import image1 from "@/assets/CMS1.png"
const Scenario = () => {

 const t = useTranslations("Scenario")
const cmsName = "ACE CMS";

  const locale = useLocale();

const textSize={
  de: 'text-3xl'
}[locale] || 'text-5xl';

  return (
    <div className="flex w-full min-h-fit  items-center justify-center py-12 px-4 sm:px-6 lg:px-20 mt-2  ">
      <div className="bg-white rounded md:rounded-2xl shadow-xl w-full max-w-6xl p-4 sm:p-8 md:p-12 flex flex-col lg:flex-row items-center md:items-start relative border border-sky-600">
        <div className='hidden w-2 h-32 inset-0 lg:flex  absolute bg-sky-500  rounded-r left-0 top-10'></div>
        <div className='hidden w-2 h-32  lg:flex  absolute bg-sky-500  rounded-l right-0 bottom-10'></div>

        <div className="lg:w-1/2 mb-6 md:mb-0 md:pr-8 order-2 lg:order-1">
                 <h1 className={`text-xl sm:text-4xl lg:text-3xl xl:${textSize} font-bold mb-4 text-gray-800`}>
            {t('Title')}
          </h1>

          <p className=" text-sm md:text-lg text-justify sm:text-xl lg:text-sm xl:text-xl text-gray-600 leading-relaxed md:mt-5">
           {t.rich('Description', {
              cms: () => <span className="font-semibold text-sky-800">{cmsName}</span>
            })}
          </p>
          <div className='mt-5 md:mt-10'>
            <Link href="#contact" className='text-sm md:text-base mt-6 p-2 rounded bg-sky-600 text-white '>{t('bookDemo')}</Link>
          </div>
        </div>

        <div className="mb-5 lg:w-1/2 order-1 md:mb-0 lg:order-2 md:pb-5">
          <Image src={image1} alt="cms" width={200} height={200} className='rounded-lg md:shadow-xl shadow-indigo-300 w-full' />
        </div>
      </div>
    </div>
  );
};

export default Scenario;
