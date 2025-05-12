"use client";

import React from "react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    title: "Casual Wear",
    image: "https://i.ibb.co.com/jv2rrX2B/render.png",
    description: "Light, breezy, and perfect for hot days.",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Printed Shirt",
    image: "https://i.ibb.co.com/FqXKPrVQ/render-1.png",
    description: "Comfort meets style for daily wear.",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Women shirt",
    image: "https://i.ibb.co/hR3RmzDQ/render-2.png",
    description: "Trendy accessories to complete your look.",
    rating: 4.2,
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const TopRated = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Top Rated Products</h2>
        <p className="text-gray-500 mt-2">
          Check out the most loved items from our collection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-indigo-500 border border-transparent"
          >
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800 hover:border hover:border-indigo-500 hover:shadow-2xl">
                {product.title}
              </h3>
              <div className="flex justify-center text-yellow-400 mt-1 mb-2 text-base">
                {"★".repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && <span>½</span>}
              </div>
              <p className="text-sm text-gray-600 hover:border hover:border-indigo-500 hover:shadow-2xl">
                {product.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
