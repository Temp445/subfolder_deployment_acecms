
import { CheckCircle, MoveRight } from 'lucide-react'
import Image from 'next/image'
import CMS from '../assets/CMS_thumbnail.webp'
import CMS1 from '../assets/image5.jpg'
import arrow from '../assets/arrow1.png'
import Link from 'next/link'
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';


const Why_Choose = () => {
  
  const t = useTranslations('WhyChoose');

  const locale = useLocale();

  const width = {
    en: 'md:w-36',
    zh: 'md:w-32',
    hi: 'md:w-32',
    it: 'md:w-36',
    ja: 'md:w-40',
    ru: 'md:w-44',
  }[locale] || 'md:w-40';

  const breakpoint = {
    en: 'xl:block',
    zh: 'xl:block',
  }[locale] || 'hidden';


  return (
    <section className="pt-16 container mx-auto ">
      <div className=" mx-auto px-2 md:px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 xl:gap-16 container">
          <div className="w-full md:w-8/12 lg:w-10/12  xl:w-6/12 relative">
            <div className="relative z-10  xl:bg-none lg:shadow-none p-1 rounded-lg shadow-lg transform  transition-transform duration-300">
              <div className="mx-auto  relative">
                <Image
                  src={arrow}
                  alt="ACE CMS"
                  className="hidden lg:block h-52 w-32 absolute lg:w-28 lg:right-0 xl:right-20 2xl:right-48 top-10  xl:-rotate-12 "
                />
                <Image
                  src={CMS1}
                  alt="ACE CMS"
                  className="hidden lg:block object-cover w-80 h-52 rounded-lg hover:scale-105"
                />
              </div>
              <div className="mx-auto  relative mt-5">
                <Image
                  src={CMS}
                  alt="ACE CMS"
                  className="object-cover w-full h-80 rounded-lg hover:scale-105"
                />
              </div>
            </div>

            <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70 z-0"></div>
          </div>


          <div className="w-full xl:w-7/12 space-y-6  border border-gray-200  sm:border-0 pt-5 pb-10 px-2 lg:px-12 xl:px-2 rounded">
            <div className="inline-block bg-blue-50 text-sky-800 px-4 py-1 rounded-full font-medium">
              {t('badge')}
            </div>

            <h2 className="text-xl md:3xl  2xl:text-4xl font-bold text-gray-800 leading-tight">
              {t('heading.part1')} <span className='text-sky-800 mr-2'>{t('heading.part2')}</span> <br className={`hidden ${breakpoint}`}  />{t('heading.part3')}
              <span className="text-blue-600"></span>
            </h2>

            <p className="text-sm lg:text-lg text-gray-600">
             {t('description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                t('point1'),
                t('point2'),
                t('point3'),
                t('point4'),
                t('point5'),
                t('point6')
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-violet-100 border border-gray-100"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className={`w-[130px] ${width} `}>
              <Link href="#features" className=" text-sm  mt-6 bg-sky-600 text-white font-medium py-2 px-2 gap-3 md:py-2 md:px-3 rounded shadow-md transition-colors duration-300  flex items-center md:gap-5">
                {t('learnMore')}
                <MoveRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why_Choose