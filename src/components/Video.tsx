"use client";

import React, { useState, useRef } from "react";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from "next/image";
import CMS from "../assets/CMS4.png";
import { useTranslations } from "next-intl";

export default function Video() {
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleDemoClick = () => {
    setShowVideoOverlay(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const closeVideoOverlay = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideoOverlay(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "videoOverlay") {
      closeVideoOverlay();
    }
  };
  const t = useTranslations('Hero');

  return (
    <div className="container mt-5 md:mt-12 mx-auto">
      <div className="w-full  flex  justify-center container mx-auto p-4 ">
        <div className="relative w-full max-w-5xl">
          <Image
            src={CMS}
            alt="CMS"
            className="w-full md:h-[450px] rounded-xl shadow-lg object-cover border border-sky-600"
          />
          <button
            onClick={handleDemoClick}
            className="absolute inset-0 m-auto flex items-center justify-center gap-1 md:gap-2 px-3 py-2 md:px-6 md:py-3 bg-sky-600 text-white rounded-full  transition-transform hover:scale-105 shadow-lg w-max h-max animate-pulse"
            aria-label="Watch demo video"
          >
            <SiGoogledisplayandvideo360 className="text-base md:text-2xl" />
            <span className="text-base font-semibold">{t('watchDemo')}</span>
          </button>
        </div>

        {/* Video Overlay */}
        {showVideoOverlay && (
          <div
            id="videoOverlay"
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[300]"
            onClick={handleOverlayClick}
          >
            <div className="relative w-full max-w-5xl mx-4 aspect-video">
              <button
                onClick={closeVideoOverlay}
                className="absolute -top-10 right-0 text-white text-4xl hover:text-red-500 transition"
                aria-label="Close video"
              >
                <IoCloseCircleOutline />
              </button>
              <div className="rounded-lg overflow-hidden shadow-2xl h-full">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/qMGI1r4SUIo?autoplay=1&rel=0"
                  title="CMS Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
