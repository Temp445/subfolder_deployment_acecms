'use client';

import React, { FormEvent, useRef, useState } from "react";
import { SendHorizontal, User, Mail, MapPin, Building2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { sendWhatsappMessage } from "@/services/whatsapp/whatsappService";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import CB from "@/assets/CB.png";
import { eventTracking } from "@/lib/gtm";
import { useTranslations } from "next-intl";
import { CountryCode } from 'libphonenumber-js';
import Navbar1 from "@/components/Navbar1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocale } from 'next-intl';

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL!;
if (!CONVERSION_LABEL) {
  console.error('❌ Google Conversion Label missing. Set NEXT_PUBLIC_GA_ENQ_CONVERSION_LABEL in .env.');
}

const LI_ENQ_CONVERSION_LABEL = process.env.NEXT_PUBLIC_LI_ENQ_CONVERSION_ID!;
if (!LI_ENQ_CONVERSION_LABEL) {
  console.error('❌ LinkedIn Conversion Label missing. Set NEXT_PUBLIC_LI_ENQ_CONVERSION_ID in .env.');
}

const endpoint = '/api/proxy-validate-email';

const RequestCallback: React.FC = () => {
  const t = useTranslations('Contact');
  const t1 = useTranslations('Notification');
  const locale = useLocale();
  const countryCode = t('code') as CountryCode || 'IN';
  const Text = {
    ru: 'lg:text-3xl'
  }[locale] || 'lg:text-4xl'

  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });


      if (response.status !== 200) return t('Form.EmailError');

      const data = await response.json();
      if (data.success) {
        return data.isValid ? '' : t('Form.EmailError');
      } else {
        return (` Failed: ${data.error}`);
      }
    } catch (err) {
      console.error('Email validation error:', err);
      return t('Messages.ValidationUnavailable');
    }
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formCurrent = form.current;
    if (!formCurrent) return;

    const emailValidationMessage = await validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError('');
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError(t('Form.PhoneError'));
      return;
    } else {
      setPhoneError('');
    }

    // Trigger LinkedIn Conversion
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', { conversion_id: LI_ENQ_CONVERSION_LABEL });
    }

    // form submission tracking
    eventTracking({
      action: 'form_submission',
      category: 'engagement',
      label: 'Call Back Form',
    })

    const phoneWithoutPlus = phone.replace(/[\s+]/g, '');

    const formData = {
      Full_Name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      Company_Name: formCurrent['company']?.value || '',
      Business_Email: email,
      Mobile_Number: phoneWithoutPlus,
      Location: formCurrent['location']?.value || '',
      Message: formCurrent['queries']?.value || '',
      Product_Interested: formCurrent['product']?.value || '',
      Originate_From: 'Ace CMS',
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      alert(t('Messages.Success'));
      formCurrent.reset();
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Email sending failed:', error);
      alert(t('Messages.Failure'));
    } finally {
      setLoading(false);
    }

    try {
      await sendWhatsappMessage(
        "enquiry_form",
        {
          originateFrom: formData.Originate_From,
          fullName: formData.Full_Name,
          companyName: formData.Company_Name,
          businessEmail: formData.Business_Email,
          mobileNumber: formData.Mobile_Number,
          location: formData.Location,
          productInterest: formData.Product_Interested,
          message: formData.Message,
        },
      );

      await sendWhatsappMessage(
        'customer_greetings',
        {
          fullName: formData.Full_Name,
          product: formData.Product_Interested,
          siteUrl: 'https://acesoft.in',
          imageUrl:
            'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
        },
        phoneWithoutPlus,
      );
    } catch (error) {
      console.error('WhatsApp sending error:', error);
    }
  };

  return (
    <div className="min-h-screen ">
      <Navbar1 />

      <div className=" bg-gradient-to-t from-white via-[#a2d1fa] to-blue-500 ">
        <div className="container mx-auto pr-3"><Navbar /></div>
        <div className="flex items-center justify-center pb-24  md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start w-full max-w-6xl">
            <div className="flex flex-col justify-center space-y-6 lg:mt-30">
              <h1 className={`text-2xl md:text-3xl ${Text}  font-bold text-black flex flex-row gap-4`}>{t1('RequestCallback')} <span><Image src={CB} alt="icon" width={100} height={100} className='w-12 h-12 md:w-16 md:h-16 -mt-3 md:-mt-5 rotate-6' /></span></h1>
              <p className="lg:text-lg text-gray-900 leading-relaxed">
                {t1('para')}
              </p>
              <div className="border border-blue-300 rounded-lg p-4 max-w-sm bg-white shadow-sm">
                <p className="text-gray-700 mb-1">{t1('write')}</p>
                <a
                  href="mailto:sales@acesoft.in"
                  className="text-blue-600 underline font-medium hover:text-blue-800 transition"
                >
                  sales@acesoft.in
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-2xl relative lg:max-w-lg z-20 bg-white/70  border py-10 shadow-2xl">
              <div className="relative w-full px-5 xl:px-2 lg:max-w-md">
                <div className="backdrop-blur-lg bg-white/10 rounded">

                  <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                    <label className="lg:text-base font-medium">{t('Form.Name')} :</label>
                    <div className="relative">
                      <div className="absolute left-0 pl-4 top-2 pointer-events-none">
                        <User className="w-5 h-5 text-black" />
                      </div>
                      <input
                        type="text"
                        name="Name"
                        placeholder={`${t('Form.Name')}`}
                        required
                        className="w-full text-sm md:text-md pl-12 py-2 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                      />
                    </div>

                    <label className="lg:text-base font-medium">{t('Form.Company')} :</label>
                    <div className="relative">
                      <div className="absolute left-0 pl-4 top-2 pointer-events-none">
                        <Building2 className="w-4 h-4 text-black" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        placeholder={`${t('Form.Company')}`}
                        required
                        className="w-full text-sm pl-12 py-2 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                      />
                    </div>

                    <label className="lg:text-base font-medium">{t('Form.Email')} :</label>
                    <div className="relative">
                      <div className="absolute left-0 pl-4 top-2 pointer-events-none">
                        <Mail className="w-4 h-4 text-black mt-0.5" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        placeholder={`${t('Form.Email')}`}
                        required
                        className={`w-full pl-12 text-sm py-2 bg-white/10 border ${emailError ? 'border-red-600' : 'border-gray-600'
                          } rounded text-black placeholder-black`}
                      />
                    </div>
                    {emailError && <p className="text-red-500 text-[12px] ml-1">{emailError}</p>}

                    <label className="lg:text-base font-medium">{t('Form.Phone')} :</label>
                    <PhoneInput
                      international
                      defaultCountry={countryCode}
                      value={phone}
                      onChange={setPhone}
                      className="mt-1 text-sm p-2 rounded border border-gray-600 bg-white/10  [&>input]:outline-none [&>input]:bg-transparent"
                    />
                    {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

                    <label className="lg:text-base font-medium">{t('Form.Location')} :</label>
                    <div className="relative">
                      <div className="absolute left-0 pl-4 top-2 pointer-events-none">
                        <MapPin className="w-4 h-4 mt-0.5 text-black" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        placeholder={`${t('Form.Location')}`}
                        required
                        className="w-full text-sm pl-12  py-2 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                      />
                    </div>

                    <div className=" flex-wrap gap-2 w-full ml-1 ">
                      <label className="lg:text-base font-medium">{t('Form.Product')}:</label>
                      <input
                        type="text"
                        name="product"
                        defaultValue="ACE CMS"
                        readOnly
                        className="font-semibold"
                        aria-label="Product Interested"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="lg:text-base font-medium">{t('Form.Queries')} :</label>
                      <textarea name="queries" required placeholder={`${t('Form.Queries')} *`} className="text-sm md:text-sm border p-2 mt-1 rounded w-full h-24" />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className=" bg-gray-800 text-white font-semibold text-sm py-2 px-3 rounded hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {t('Form.Submitting')}
                        </>
                      ) : (
                        <>
                          {t('Form.Submit')}
                          <SendHorizontal className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default RequestCallback;
