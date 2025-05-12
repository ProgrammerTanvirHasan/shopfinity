"use client";

import axios from "axios";
import Swal from "sweetalert2";

const AdminPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const amount = form.amount.value;
    const imageFile = form.image.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    let postImage;
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
        formData
      );
      postImage = response.data.data.display_url;
    } catch (error) {
      Swal.fire({
        title: "Image Upload Failed",
        text: error.response?.data?.error?.message || "Could not upload image.",
        icon: "error",
      });
      return;
    }

    const postData = { title, category, amount, postImage };

    try {
      const resp = await axios.post(
        `http://localhost:3000/api/admin`,
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Added",
          text: "Published your post successfully",
          icon: "success",
        });
        e.target.reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error posting data",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 shadow-xl px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <input
              type="text"
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
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
