"use client";
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchProductClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const email = session?.data?.user?.email;

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleAddToCart = async (product) => {
    if (!email) {
      alert("Please login first.");
      return;
    }

    const cartItem = {
      userEmail: email,
      productId: product._id,
      title: product.title,
      amount: product.amount,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (res.ok) {
        alert("Product added to cart!");
      } else {
        const data = await res.json();
        console.error("Failed to add to cart:", data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="space-y-6">
        {results.length > 0 ? (
          results.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg lg:h-64 hover:border-2 hover:border-[#673DE6] p-4 overflow-hidden flex flex-col lg:flex-row gap-4"
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
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-black text-xl font-medium">
            No product available
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchProductClient;
