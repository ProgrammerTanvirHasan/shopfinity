"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };
  const handleDelete = async (id) => {
    setLoading(true);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (resp.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          setProducts(products.filter((product) => product._id !== id));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-orange-500 space-y-4">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-lg font-medium animate-pulse">
            Loading Products...
          </p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col justify-between hover:border-2 hover:border-[#673DE6] hover:shadow-lg p-4 rounded-lg bg-white min-h-[430px]"
                >
                  <div>
                    <img
                      src={product.postImage}
                      alt={product.title}
                      className="w-full h-64 object-cover rounded"
                    />
                    <h3 className="text-lg font-semibold mt-2 text-gray-800 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Category: {product.category}
                    </p>
                    <p className="text-orange-600 font-bold mt-1">
                      ${product.amount}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <Link href={`/product/updateForm/${product._id}`}>
                      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-all duration-300">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

       
          <div className="text-center mt-8 flex flex-wrap justify-center gap-2 items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                  page === currentPage
                    ? "bg-orange-800 text-white scale-105"
                    : "bg-orange-200 text-gray-800 hover:bg-orange-500 hover:text-white"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">
          No products found.
        </p>
      )}
    </div>
  );
};

export default Products;
