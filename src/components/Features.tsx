
import Image from 'next/image'

import { useTranslations } from 'next-intl'

const featureIcons: string[] = [
    '/acecms/icon1.png',
    '/acecms/icon2.png',
    '/acecms/icon3.png',
    '/acecms/icon4.png',
    '/acecms/icon5.png',
    '/acecms/icon6.png',
    '/acecms/icon7.png',
    '/acecms/icon8.png',
    '/acecms/icon9.png',
  ];
type Feature = {
  title: string;
  description: string;
};

const Features = () => {
  const t = useTranslations('Features');
   const features: Feature[] = t.raw('List');
  return (
    <div className="py-10 md:py-16   md:mt-10" id="features">
      <div className=" px-4 sm:px-6 lg:px-8 container mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 ">
           {t('Heading')}
          </h2>
          <p className="md:text-lg text-slate-700 max-w-5xl mx-auto text-justify md:text-center">
           {t('Subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:translate-y-1 border border-blue-100"
            >
              <div className="flex items-start">
                <div className="w-24 md:w-28 mr-4">
                  <Image src={featureIcons[index]} alt={feature.title} width={100} height={100} />
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-sm md:text-base">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
