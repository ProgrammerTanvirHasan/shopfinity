"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Banner.css";

const slides = [
  {
    title: "Step Into Style",
    subtitle: "Explore the hottest trends and elevate your wardrobe today.",
    img: "https://i.ibb.co.com/xqKrqx5N/vertical-two-cheerful-girls-sweaters-with-packages-rejoices-white-wall-171337-2679-1-removebg-previe.png",
  },
  {
    title: "Deals You Can't Miss",
    subtitle: "Catch exclusive discounts on fashion and lifestyle essentials.",
    img: "https://i.ibb.co.com/twLnMkzB/two-happy-girls-sweaters-having-fun-with-shopping-trolley-megaphone-white-wall-171337-2714-removebg.png",
  },
  {
    title: "Shipping That Delights",
    subtitle: "Free, fast, and reliable delivery on every order above $50.",
    img: "https://i.ibb.co.com/B2NnqC4d/happy-beautiful-couple-posing-with-shopping-bags-violet-496169-2215-removebg-preview.png",
  },
  {
    title: "Trusted Brands, Top Quality",
    subtitle: "Shop from a curated selection of the world’s best brands.",
    img: "https://i.ibb.co.com/1JtJw6NF/flat-colorful-sale-background-23-2147724692-removebg-preview.png",
  },
  {
    title: "Flash Sale Frenzy",
    subtitle: "Limited-time offers you won’t want to miss. Act fast!",
    img: "https://i.ibb.co.com/YvChDXZ/elegant-brunette-womans-wears-black-dress-holding-shopping-bags-118454-16821-removebg-preview.png",
  },
  {
    title: "Tech That Excites",
    subtitle: "Discover the latest gadgets built for smarter living.",
    img: "https://i.ibb.co.com/93c1PcbG/birtday-girl-amazing-outfit-looking-straight-holding-gifts-176420-8953-removebg-preview.png",
  },
  {
    title: "Cozy Up Your Home",
    subtitle: "From décor to daily essentials — all in one place.",
    img: "https://i.ibb.co.com/fzmw0Xv3/surprised-girl-pink-culottes-posing-with-trolley-full-multi-colored-packages-with-new-clothes-197531.png",
  },
  {
    title: "Redefine Your Style",
    subtitle: "Modern fashion designed to turn heads and inspire confidence.",
    img: "https://i.ibb.co.com/VcS1yLg2/shopping-two-women-holding-colored-bags-black-friday-118454-5035-removebg-preview.png",
  },
  {
    title: "Here for You Always",
    subtitle: "24/7 support and effortless returns for stress-free shopping.",
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
            <div
              className="w-screen h-[75vh] flex justify-between lg:justify-around px-4"
              style={{
                backgroundImage: "url('/background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between text-white text-center lg:text-left gap-6">
                <div className="max-w-xl  p-2 text-white opacity-70">
                  <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 text-lg mb-6">{slide.subtitle}</p>
                  <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                    Order Now
                  </button>
                </div>
                <div className="max-w-[500px] max-h-[600px] ">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="min-w-[300px] max-w-[350px] min-h-[400px] max-h-[450px] "
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
