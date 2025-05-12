"use client";

import React from "react";
import { motion } from "framer-motion";

const products = [
  {
    title: "Women's Summer Dress",
    description: "Lightweight, breathable, and perfect for sunny days.",
    img: "https://i.ibb.co.com/Q7Jr7Nf1/woman-green-dress-beach-1303-10513.jpg",
  },
  {
    title: "Men's Casual Shirt",
    description: "Comfortable and stylish for daily wear.",
    img: "https://i.ibb.co.com/CKPQqHZM/smiling-man-wearing-sunglasses-171337-14990.jpg",
  },
  {
    title: "Denim Jeans",
    description: "Classic fit with premium quality denim.",
    img: "https://i.ibb.co.com/WN60Wjj9/woman-model-demonstrating-winter-cloths-1303-16947.jpg",
  },
  {
    title: "Hooded Sweatshirt",
    description: "Warm fleece hoodie for cool evenings.",
    img: "https://i.ibb.co.com/fdXscp9N/close-up-portrait-man-shirt-mockup-23-2149260949.jpg",
  },
  {
    title: "Kids' Printed T-Shirt",
    description: "Fun and colorful designs kids love.",
    img: "https://i.ibb.co.com/7dgYL0M8/front-view-kid-playing-with-ball-23-2148263208.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5,
      duration: 1,
      ease: "easeOut",
    },
  }),
};

const SellingProduct = () => {
  return (
    <div className="p-6 bg-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Top Selling Products</h1>
        <p className="text-gray-600 mt-2">
          Discover the most popular outfits loved by our customers.
        </p>
      </div>

      <div className="grid grid-cols-2 container mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product, index) => {
          const isMiddle = index === 2;
          return (
            <motion.div
              key={index}
              className={`group bg-white rounded-xl shadow-md overflow-hidden relative transition-transform duration-300 text-center ${
                isMiddle ? "scale-110 z-10" : ""
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={cardVariants}
              whileHover={{ scale: isMiddle ? 1.25 : 1.15, rotate: 1 }}
            >
              <img
                src={product.img}
                alt={product.title}
                className={`mx-auto object-cover rounded ${
                  isMiddle ? "w-52 h-72" : "w-48 h-68"
                }`}
              />
              <h2 className="mt-4 text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SellingProduct;
