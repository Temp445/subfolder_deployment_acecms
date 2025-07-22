'use client'

import Header from "@/components/Navbar";
import { eventTracking } from '@/lib/gtm';

import React from "react";
import { InlineWidget } from "react-calendly";
import { useTranslations } from "next-intl";
const LI_DEMO_CONVERSION_LABEL = process.env.NEXT_PUBLIC_LI_DEMO_CONVERSION_ID!;
if (!LI_DEMO_CONVERSION_LABEL) {
  console.error('❌ LinkedIn Conversion Label missing. Set NEXT_PUBLIC_LI_DEMO_CONVERSION_ID in .env.');
}

const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL!;
if (!CONVERSION_LABEL) {
  console.error('❌ Google Conversion Label missing. Set NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL in .env.');
}

const CalendlyEmbed = () => {
  const t = useTranslations('Hero')
  const url = "https://calendly.com/dmadmin";

  // Trigger LinkedIn Conversion
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: LI_DEMO_CONVERSION_LABEL });
  }

  // book-a-demo conversion tracking
  eventTracking({
    action: 'cms_bookdemo_view',
    category: 'engagement',
    label: 'CMS BookDemo Visit',
  })

  return (
    <div className="bg-gray-900 " >
      <div className="container mx-auto" >
        <Header />
      </div>
      <h1 className="mt-10 text-xl md:text-2xl font-bold md:font-extrabold  text-center text-shadow-lg/20 text-white">{t('BookADemo')}</h1>
      <div className="pb-32">
        <InlineWidget url={url}
          styles={{ height: '700px' }} />
      </div>
    </div>
  );
};

export default CalendlyEmbed;