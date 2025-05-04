"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";

import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const slides = [
    {
      title: "Shop the Latest Trends",
      subtitle: "Discover new arrivals daily at Shopfinity.",
    },
    {
      title: "Unbeatable Prices",
      subtitle: "High-quality products at prices you’ll love.",
    },
    {
      title: "Fast & Free Shipping",
      subtitle: "On all orders over $50. Get it delivered fast!",
    },
    {
      title: "Top Brands",
      subtitle: "Only the best brands curated for you.",
    },
    {
      title: "Limited Time Offers",
      subtitle: "Grab exclusive deals before they're gone!",
    },
    {
      title: "Smart Electronics",
      subtitle: "Upgrade your life with the latest gadgets.",
    },
    {
      title: "Home Essentials",
      subtitle: "Everything you need for a cozy home.",
    },
    {
      title: "Style Redefined",
      subtitle: "Shopfinity: Your fashion destination.",
    },
    {
      title: "Customer First",
      subtitle: "24/7 support and easy returns always.",
    },
  ];

  return (
    <div
      className="min-h-[700px]"
      style={{
        backgroundImage: "url('../background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: "url('../background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="lg:flex justify-center items-center  min-w-full min-h-[700px]"
            >
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold">{slide.title}</h2>
                <p className="text-lg">{slide.subtitle}</p>

                <button className="mt-4 px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg transition hover:bg-gray-100">
                  Shop Now
                </button>
              </div>

              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <img
                  src="/logo.png"
                  alt="Shopfinity Logo"
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
