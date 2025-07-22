'use client';

import React, { useState, useRef } from 'react';
import { MdOutlineVideoSettings } from 'react-icons/md';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Image from 'next/image';

interface VideoOverlayProps {
  videoId?: string;   // for Youtube videos
  videoUrl?: string;  // for other video sources
  startTime?: number; // in seconds 
  thumbnailUrl?: string;  // URL for the thumbnail image
}

export default function VideoOverlay({ videoId, videoUrl, startTime = 0, thumbnailUrl }: VideoOverlayProps) {
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isYouTube = !!videoId;

  const handleDemoClick = () => {
    setShowVideoOverlay(true);
  };

  const closeVideoOverlay = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideoOverlay(false);
    setShowPlayer(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'videoOverlay') {
      closeVideoOverlay();
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && startTime > 0) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  const handleStartPlayback = () => {
    setShowPlayer(true);
  };

  return (
    <section className="w-full h-auto flex ml-2">
      <div className="flex relative">
        <button
          onClick={handleDemoClick}
          className="flex items-center justify-center gap-2 w-full md:w-auto text-black border-black border p-1 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          aria-label="Demo video"
        >
          <MdOutlineVideoSettings className="text-3xl text-indigo-600" aria-hidden="true" />
        </button>
      </div>

      {showVideoOverlay && (
        <div
          id="videoOverlay"
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[300]"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={closeVideoOverlay}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-red-700 focus:outline-none"
              aria-label="Close video"
            >
              <IoCloseCircleOutline />
            </button>

            <div className="rounded-lg overflow-hidden aspect-video bg-black">
              {!showPlayer ? (
                <div className="relative w-full h-full flex items-center justify-center cursor-pointer" onClick={handleStartPlayback}>
                  {/* Thumbnail */}
                  {thumbnailUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={thumbnailUrl}
                        alt="Video thumbnail"
                        className="object-cover"
                        fill
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white bg-gray-800">
                      No thumbnail available
                    </div>
                  )}
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 84 84">
                      <circle cx="42" cy="42" r="42" opacity="0.5" />
                      <polygon points="34,26 58,42 34,58" fill="white" />
                    </svg>
                  </div>
                </div>
              ) : (
                <>
                  {isYouTube ? (
                    <iframe
                      key={`${videoId}-${startTime}`}
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&mute=1`}
                      title="YouTube Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : videoUrl ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full"
                      controls
                      autoPlay
                      muted
                      onLoadedMetadata={handleLoadedMetadata}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-white text-center p-4">No video source provided.</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
