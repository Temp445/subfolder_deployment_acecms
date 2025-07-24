"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Clients: React.FC = () => {
  const t = useTranslations("Scenario");

  
  const logos: string[] = Array.from({ length: 30 }, (_, i) => `@/assets/ClientImages/image-${i}.png`);

  const half = Math.ceil(logos.length / 2);
  const firstHalf = logos.slice(0, half);
  const secondHalf = logos.slice(half);

  return (
    <div className="px-5 z-0 container mx-auto" id="client">
      <h1 className="text-center text-2xl md:text-3xl 2xl:text-4xl font-bold md:mb-8 text-gray-900">
        {t("TrustedBrands")}
      </h1>

      <div className="py-2 md:py-4 bg-gradient-to-bl">
        <Marquee gradient={false} speed={50} pauseOnHover={true} direction="left">
          {firstHalf.concat(firstHalf).map((logo, index) => (
            <div key={`first-${index}`} className="flex items-center z-0">
              <Image
                src={logo}
                alt={`Client Logo ${index + 1}`}
                width={128}
                height={80}
                className="w-32 h-16 md:h-20 mx-5 object-contain border border-gray-100 rounded-lg shadow-md p-3 bg-white mt-5 mb-5 transition-transform duration-300 ease-in-out hover:scale-110 z-0"
              />
            </div>
          ))}
        </Marquee>

        <Marquee gradient={false} speed={50} pauseOnHover={true} direction="right" className="mt-0 md:mt-4">
          {secondHalf.concat(secondHalf).map((logo, index) => (
            <div key={`second-${index}`} className="flex items-center z-0">
              <Image
                src={logo}
                alt={`Client Logo ${half + index + 1}`}
                width={128}
                height={80}
                className="w-32 h-16 md:h-20 mx-5 object-contain border border-gray-100 rounded-lg shadow-md p-3 bg-white mt-5 mb-5 transition-transform duration-300 ease-in-out hover:scale-110 z-0"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Clients;