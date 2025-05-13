"use client";

import { FaQuoteLeft } from "react-icons/fa";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../../components/testimonial/styles.css";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    story:
      "Shopfinity made my Eid shopping effortless. The outfits were trendy, affordable, and arrived right on time!",
    location: "Dhanmondi, Dhaka",
  },
  {
    id: 2,
    name: "Tanvir Alam",
    story:
      "I’ve never had such a smooth return process. Shopfinity's support team was helpful—definitely shopping here again.",
    location: "Kazir Dewri, Chattogram",
  },
  {
    id: 3,
    name: "Faria Hossain",
    story:
      "The dress I bought was exactly as shown—perfect fit and quality. Shopfinity has become my go-to for all things fashion.",
    location: "Shibbari Mor, Khulna",
  },
  {
    id: 4,
    name: "Rezaul Karim",
    story:
      "As a busy professional, I appreciate the fast delivery and reliable sizing. Shopfinity saves me time every season.",
    location: "Banani, Dhaka",
  },
  {
    id: 5,
    name: "Mahiya Islam",
    story:
      "The accessories I ordered were stunning! I got so many compliments during my wedding week. Thank you, Shopfinity!",
    location: "Rangpur City, Rangpur",
  },
  {
    id: 6,
    name: "Nashid Mahmud",
    story:
      "Shopping online always made me nervous, but Shopfinity changed that. The product matched the photos perfectly!",
    location: "Agrabad, Chattogram",
  },
  {
    id: 7,
    name: "Sumaiya Akter",
    story:
      "I ordered gifts for my sister’s birthday—beautiful packaging, fast shipping, and she loved every item!",
    location: "Rajshahi City, Rajshahi",
  },
  {
    id: 8,
    name: "Jamil Hossain",
    story:
      "From casualwear to formal, Shopfinity always delivers quality. My entire wardrobe is now from this site!",
    location: "Sylhet Sadar, Sylhet",
  },
  {
    id: 9,
    name: "Farzana Begum",
    story:
      "I’ve recommended Shopfinity to all my colleagues. The quality and price balance is just right.",
    location: "Gulshan, Dhaka",
  },
];

const Testimonial = () => {
  return (
    <div className="container mx-auto px-4 py-14 bg-white">
      <div className="text-center ">
        <h1 className="text-4xl font-bold text-black">
          Testimonials & Success Stories
        </h1>
        <p className="mt-4 text-lg text-gray-700 ">
          Hear from happy customers about their favorite Shopfinity experiences.
        </p>
      </div>

      <div className="mt-12">
        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="transition-all duration-300 w-screen ease-in-out hover:-translate-y-2 hover:bg-gray-50 hover:shadow-xl shadow-md p-6 bg-white rounded-lg border flex flex-col justify-between h-full text-center">
                <FaQuoteLeft className="text-[#fea928]/50 text-3xl mb-4 mx-auto" />
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.story}"
                </p>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-black">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
