'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import icon1 from '../assets/ClientImages/image-15.png'
import icon2 from '../assets/ClientImages/image-5.png'
import icon3 from '../assets/ClientImages/image-1.png'
import Image from 'next/image';
import { useTranslations } from 'next-intl';



export default function TestimonialCarousel() {
 
  const t = useTranslations('Testimonial')




  const testimonials = [
  {
    id: 1,
    logo:icon1,
    name: t('name1'),
    company: 'Asahi India Glass Ltd',
    quote: t('Quote1')
  },
  {
    id: 2,
    logo:icon2,
    name: t('name2'),
    company: 'Wonjin Autoparts India Pvt Ltd',
    quote: t('Quote2')
  },
  {
    id: 3,
    logo:icon3,
    name: t('name3'),
    company: 'RANE TRW STEERING SYSTEMS Pvt Ltd',
    quote: t('Quote3')
  }
];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);
  const { name, company, quote, logo } = testimonials[currentTestimonial];

  return (
    <div
      className='bg-sky-700 py-10 mt-10 px-2 md:px-10'
    >
      <h1 className='text-center text-2xl md:text-3xl font-bold pb-5 text-white'>
        {t('Title')}
      </h1>

      <div
        className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-100 rounded-lg shadow-lg md:hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <button 
            onClick={prevTestimonial} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2  hidden md:block hover:bg-gray-200 rounded-full md:p-2"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button 
            onClick={() =>
              setCurrentTestimonial(
                (prev) => (prev + 1) % testimonials.length )}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:block  hover:bg-gray-200 rounded-full md:p-2"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div className="text-center py-2 md:py-8 px-4">
            <Quote className="mx-auto mb-4 md:w-12 md:h-12 text-gray-300" />
            <p className="text-sm md:text-lg lg:text-xl text-gray-700 mb-4 px-1 md:px-5">
              &quot; {quote} &quot;
            </p>
            <div>
              <h3 className="text-base md:text-xl font-semibold text-gray-900">{name}</h3>
             <p className="text-gray-500 text-xs md:text-base flex items-center gap-3 mx-auto justify-center">
    <span className="shrink-0">
      <Image src={logo} alt="Logo" width={80} height={80} className="rounded-md object-contain w-12 h-12 md:w-20 md:h-20" />
    </span> {company} </p>

            </div>
          </div>
        </div>

        <div className="flex justify-center md:mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 md:w-5 md:h-1 mx-1 rounded-full ${
                index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
