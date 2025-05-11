"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/api/products/${id}`);
        const json = await resp.json();
        setData(json);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const category = form.category.value;
    const amount = form.amount.value;
    const imageFile = form.image.files[0];

    let postImage = data.postImage;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
          formData
        );
        postImage = response?.data?.data?.display_url;
      } catch (err) {
        return Swal.fire({
          title: "Image Upload Failed",
          text: "Could not upload image. Try again.",
          icon: "error",
        });
      }
    }

    const updateData = {
      title,
      category,
      postImage,
      amount,
    };

    try {
      const resp = await axios.post(
        `${process.env.local.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Product updated successfully!",
          icon: "success",
        });
        router.back();
      }
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">Please wait...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Your Product
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              defaultValue={data.title}
              name="title"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <input
              type="text"
              defaultValue={data.category}
              name="category"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
            />
            <img
              src={data.postImage}
              alt="Current"
              className="mt-2 w-20 h-20 object-cover rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              defaultValue={data.amount}
              name="amount"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
