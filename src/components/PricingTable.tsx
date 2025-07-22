'use client';

import React, { useState } from 'react';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';


interface Feature {
  name: string;
  Essential?: boolean;
  EssentialNote?: string;
  BasicPlus?: boolean;
  BasicPlusNote?: string;
  premium?: boolean;
  premiumNote?: string;
}

interface Plan {
  name: string;
  displayname: string;
  desc: string;
  tools?: string;
  Price?: string;
  buttonText: string;
  buttonlink: string;
  buttonClass: string;
  highlighted: boolean;
  tag: string;
}

interface FeatureIconProps {
  available: boolean;
}

const PricingTable: React.FC = () => {
  const t = useTranslations('Pricing');

  const features: Feature[] = [
    { name: t('Features.UserLimit'), Essential: true, EssentialNote: '5', BasicPlus: true, BasicPlusNote: '15', premium: true, premiumNote: 'Unlimited' },
    { name: t('Features.ExternalCertUpload'), Essential: true, BasicPlus: undefined, premium: undefined },
    { name: t('Features.InternalExternalCertUpload'), Essential: undefined, BasicPlus: true, premium: true },
    { name: t('Features.CalibrationHistoryReports'), Essential: true, EssentialNote: '', BasicPlus: true, BasicPlusNote: '', premium: true, premiumNote: '' },
    { name: t('Features.EmailAlerts'), Essential: true, BasicPlus: true, premium: true },
    { name: t('Features.TrackInstrumentsLocations'), Essential: true, BasicPlus: true, premium: true },
    { name: t('Features.QRBarcode'), Essential: true, EssentialNote: '', BasicPlus: true, BasicPlusNote: '', premium: true },
    { name: t('Features.InternalCertModule'), Essential: false, BasicPlus: true, premium: true },
    { name: t('Features.WearPatternAnalysis'), Essential: false, BasicPlus: true, premium: true },
    { name: t('Features.MSACompliance'), Essential: false, EssentialNote: '', BasicPlus: false, BasicPlusNote: '', premium: true },
    { name: t('Features.AndroidAppAccess'), Essential: true, BasicPlus: true, premium: true },
    { name: t('Features.CustomLogos'), Essential: true, BasicPlus: true, premium: true },
    { name: t('Features.CustomUserRoles'), Essential: true, BasicPlus: true, premium: true },
    { name: t('Features.APIExport'), Essential: true, BasicPlus: true, premium: true },
    { name: t('Features.DocumentNumbering'), Essential: true, BasicPlus: true, premium: true },
  ];

  const plans: Plan[] = [
    {
      name: 'Essential',
      displayname: t('Plans.Essential'),
      desc: t('EssentialTagline'),
      buttonText: t('ContactUs'),
      buttonlink: '#contact',
      buttonClass: 'bg-none border text-black hover:bg-sky-600 hover:text-white',
      highlighted: false,
      tag: '',
    },
    {
      name: 'Standard',
      displayname: t('Plans.Standard'),
      desc: t('StandardTagline'),
      buttonText: t('ContactUs'),
      buttonlink: '#contact',
      buttonClass: 'bg-none border text-black hover:bg-sky-600 hover:text-white',
      highlighted: true,
      tag: t('SmartChoice'),
    },
    {
      name: 'Pro',
      displayname: t('Plans.Pro'),
      desc: t('ProTagline'),
      buttonText: t('ContactUs'),
      buttonlink: '#contact',
      buttonClass: 'bg-none border text-black hover:bg-sky-600 hover:text-white',
      highlighted: false,
      tag: t('FullAccess'),
    },
  ];

  const [instrumentCount, setInstrumentCount] = useState<number>(100);
  const percentage = ((instrumentCount - 100) / (1000 - 100)) * 100;

  const [expandedPlans, setExpandedPlans] = useState<{ [key: string]: boolean }>({});

  const togglePlanFeatures = (name: string) => {
    setExpandedPlans(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const FeatureIcon: React.FC<FeatureIconProps> = ({ available }) => (
    <span className={`font-medium ${available ? 'text-green-500' : 'text-red-500'}`}>{available ? '✓' : '✗'}</span>
  );

  const getFeatureKey = (planName: string) => {
    if (planName === 'Standard') return 'BasicPlus';
    if (planName === 'Pro') return 'premium';
    return 'Essential';
  };

  const renderFeatureList = (features: Feature[], key: string, planName: string) =>
    features
      .filter(feature => feature[key as keyof Feature] !== undefined)
      .map((feature, i) => {
        const isAvailable = feature[key as keyof Feature] as boolean;
        const note = feature[`${key}Note` as keyof Feature] as string | undefined;
        return (
          <div key={`${planName}-${i}`} className="flex items-start">
            <div className="mt-0.5 mr-3">
              <FeatureIcon available={isAvailable} />
            </div>
            <span className={isAvailable ? 'text-gray-800' : 'text-gray-500'}>
              {feature.name}
              {note && <span className="text-sky-600  lg:font-bold ml-1">- {note}</span>}
            </span>
          </div>
        );
      });

  const calculatePrice = (plan: string, value: number): number => {
    const baseValues = {
      Essential: 42000,
      Standard: 54000,
      Pro: 66000,
    };

    const tiers = {
      Essential: [
        { min: 101, max: 250, perStep: 1750 },
        { min: 251, max: 500, perStep: 750 },
        { min: 501, max: 750, perStep: 625 },
        { min: 751, max: 1000, perStep: 500 },
      ],
      Standard: [
        { min: 101, max: 250, perStep: 2250 },
        { min: 251, max: 500, perStep: 1250 },
        { min: 501, max: 750, perStep: 1000 },
        { min: 751, max: 1000, perStep: 875 },
      ],
      Pro: [
        { min: 101, max: 250, perStep: 2750 },
        { min: 251, max: 500, perStep: 1750 },
        { min: 501, max: 750, perStep: 1500 },
        { min: 751, max: 1000, perStep: 1375 },
      ],
    };

    const basePrice = baseValues[plan as keyof typeof baseValues];
    if (value <= 100) return basePrice;

    let totalAdd = 0;
    for (const tier of tiers[plan as keyof typeof tiers]) {
      if (value > tier.min) {
        const upper = Math.min(value, tier.max);
        const stepCount = Math.floor((upper - Math.max(tier.min, 101) + 1) / 25);
        totalAdd += stepCount * tier.perStep;
      }
    }

    return basePrice + totalAdd;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-8 sm:px-6 md:px-4 py-16" id="pricing">
      <div className="text-center mb-10">
        <div className="flex gap-2 justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            {t('Title')}
          </h1>
        </div>
        <p className="text-lg md:text-3xl text-gray-600 md:mt-3">{t('Subtitle')}</p>
      </div>

      {/* Slider */}
      <div className="mb-6 flex flex-col items-center justify-center text-center w-full mx-auto max-w-xl p-5 rounded-xl bg-white border border-sky-200 shadow">
        <label className="text-base font-medium text-gray-800 mb-4">
          {t('InstrumentRange')}
        </label>

        <div className="relative w-full max-w-lg">
          <div
            className="absolute -top-7 text-sm font-semibold text-white bg-sky-600 px-2 py-1 rounded shadow transition-all"
            style={{ left: `calc(${percentage}% - 20px)` }}
          >
            {instrumentCount}
          </div>

          <div className="relative w-full">
            <input
              type="range"
              min={100}
              max={1000}
              step={25}
              value={instrumentCount}
              onChange={(e) => setInstrumentCount(parseInt(e.target.value))}
              className="w-full h-2 border rounded  cursor-pointer accent-sky-600"
              aria-label="Instrument Count"
            />

            <div className="pointer-events-none absolute top-2.5 left-0 w-full h-[8px]">
              <div
                className="absolute h-full w-px bg-gray-700"
                style={{ left: '16.67%' }}
              />
              <div
                className="absolute h-full w-px bg-gray-700"
                style={{ left: '44.44%' }}
              />
              <div
                className="absolute h-full w-px bg-gray-700"
                style={{ left: '72.22%' }}
              />
            </div>
          </div>

          <div className="flex justify-between w-full text-[12px] text-gray-600 mt-1 px-1">
            <span>min (100)</span>
            <span>max (1000)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`relative bg-white rounded border ${plan.highlighted ? 'border-sky-700 shadow-lg' : 'border-gray-200 shadow'} hover:shadow-xl transition-all`}
          >
            {plan.tag && (
              <div className="absolute top-5 right-0">
                <span className="bg-sky-600 text-white px-3 py-1 rounded-l-full text-sm font-medium shadow-sm">
                  {plan.tag}
                </span>
              </div>
            )}
            <div className="p-5 lg:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.displayname}</h2>
              <p className="text-gray-600 mb-4">{plan.desc}</p>
              <div className="text-xl font-semibold mt-2 text-gray-800">
                ₹{calculatePrice(plan.name, instrumentCount)}{' '}
                <span className="text-sm text-sky-700">{t('PerYearly')}</span>
              </div>

              <a
                href={plan.buttonlink}
                className={`${plan.buttonClass} hidden mt-5 w-full py-2 xl:py-3 rounded-lg font-medium shadow-sm hover:shadow text-center sm:block`}
              >
                {plan.buttonText}
              </a>

              <button
                className="w-full md:hidden bg-sky-600 text-white py-2 rounded-sm font-semibold flex items-center justify-center mt-8 mb-4"
                onClick={() => togglePlanFeatures(plan.name)}
              >
                {t('FeaturesList')} <LuSquareArrowOutUpRight className="ml-3 text-lg" />
              </button>

              <div className={`transition-all duration-300 ${expandedPlans[plan.name] ? 'block' : 'hidden'} md:block`}>
                <h3 className="font-medium text-gray-900 mb-4 md:mt-4">{t('KeyFeatures')} :</h3>
                <div className="space-y-3">
                  {renderFeatureList(features, getFeatureKey(plan.name), plan.name)}
                  <a
                    href={plan.buttonlink}
                    className={`${plan.buttonClass} flex sm:hidden justify-center w-full py-2 rounded-lg font-medium shadow-sm hover:shadow text-center mb-5`}
                  >
                    {plan.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;