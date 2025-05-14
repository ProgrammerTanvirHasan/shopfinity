"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../components/banner/banner.css";

const slides = [
  {
    title: "Welcome to Shopfinity",
    subtitle: "Your one-stop destination for fashion, tech, home, and more.",
    img: "https://i.ibb.co.com/YvChDXZ/elegant-brunette-womans-wears-black-dress-holding-shopping-bags-118454-16821-removebg-preview.png",
  },
  {
    title: "Unmissable Offers",
    subtitle: "Daily deals and limited-time steals—only on Shopfinity.",
    img: "https://i.ibb.co.com/twLnMkzB/two-happy-girls-sweaters-having-fun-with-shopping-trolley-megaphone-white-wall-171337-2714-removebg.png",
  },
  {
    title: "Fast & Free Shipping",
    subtitle: "Enjoy free delivery on orders over $50 — always on time.",
    img: "https://i.ibb.co.com/B2NnqC4d/happy-beautiful-couple-posing-with-shopping-bags-violet-496169-2215-removebg-preview.png",
  },
  {
    title: "Top Brands, Handpicked for You",
    subtitle: "Shopfinity curates only the best in quality and style.",
    img: "https://i.ibb.co.com/1JtJw6NF/flat-colorful-sale-background-23-2147724692-removebg-preview.png",
  },
  {
    title: "Flash Frenzy",
    subtitle: "Act fast — trending items at jaw-dropping prices.",
    img: "https://i.ibb.co.com/YvChDXZ/elegant-brunette-womans-wears-black-dress-holding-shopping-bags-118454-16821-removebg-preview.png",
  },
  {
    title: "Smart Living Starts Here",
    subtitle: "Explore innovative gadgets designed for modern life.",
    img: "https://i.ibb.co.com/93c1PcbG/birtday-girl-amazing-outfit-looking-straight-holding-gifts-176420-8953-removebg-preview.png",
  },
  {
    title: "Make Your Home Shine",
    subtitle: "Decor, essentials, and cozy comforts — all in one place.",
    img: "https://i.ibb.co.com/fzmw0Xv3/surprised-girl-pink-culottes-posing-with-trolley-full-multi-colored-packages-with-new-clothes-197531.png",
  },
  {
    title: "Refresh Your Wardrobe",
    subtitle: "Trendy, confident, and uniquely you — only at Shopfinity.",
    img: "https://i.ibb.co.com/VcS1yLg2/shopping-two-women-holding-colored-bags-black-friday-118454-5035-removebg-preview.png",
  },
  {
    title: "We’re Here for You",
    subtitle: "24/7 support, hassle-free returns, and total peace of mind.",
    img: "https://i.ibb.co.com/5DYYtTy/beautiful-young-hipster-woman-holding-colorful-paper-shopping-bags-285396-1884-removebg-preview.png",
  },
];

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

  return (
    <div className="w-screen h-[75vh] overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-screen h-[75vh] flex justify-between lg:justify-around px-4 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full -z-10">
                <div className="bg-[#fea928]/40 w-[200vw] h-[200vh] rounded-3xl rotate-45 translate-x-1/4 -translate-y-1/2"></div>
              </div>

              <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between text-white text-center lg:text-left gap-6 z-10">
                <div className="max-w-xl p-2 text-black">
                  <h2 className="text-black text-4xl lg:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-black text-lg mb-6">{slide.subtitle}</p>
                </div>
                <div className="max-w-[500px] max-h-[600px]">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="min-w-[300px] max-w-[350px] min-h-[400px] max-h-[450px]"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20" />
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
