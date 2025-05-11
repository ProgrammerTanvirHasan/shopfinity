"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = "womens-collection";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/allRoute/${category}`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="bg-white shadow-lg lg:h-64 hover:border-2 hover:border-[#673DE6] p-4  overflow-hidden flex flex-col lg:flex-row gap-4 "
            >
              <div className="flex-shrink-0 w-full lg:w-1/2">
                <img
                  src={product.postImage}
                  alt={product.title}
                  className="object-cover w-full h-64 lg:h-full"
                />
              </div>

              <div className="flex flex-col justify-between p-4 lg:w-1/2">
                <h2 className="text-xl font-semibold text-gray-800 hover:border-2 hover:border-[#673DE6] p-1 hover:shadow-[0px_4px_15px_rgba(103,_61,_230,_0.5)]">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1 hover:border-2 hover:border-[#673DE6] p-1 hover:shadow-[0px_4px_15px_rgba(103,_61,_230,_0.5)]">
                  {product.category}
                </p>
                <p className="text-lg text-gray-900 font-bold mt-2 hover:border-2 hover:border-[#673DE6] p-1 hover:shadow-[0px_4px_15px_rgba(103,_61,_230,_0.5)]">
                  {product.amount}
                </p>
                <button className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition-all duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
