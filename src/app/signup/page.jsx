"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser, FaLock, FaRegEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const imageFile = form.image.files[0];

    if (!imageFile) {
      return Swal.fire({
        title: "Image Required",
        text: "Please upload a profile image.",
        icon: "warning",
      });
    }

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
        formData
      );

      const image = imgRes?.data?.data?.display_url;
      const user = { name, email, password, image };

      // Submit to backend
      const res = await axios.post(`/signup/api`, user, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        Swal.fire({
          title: "Welcome!",
          text: res?.data?.message,
          icon: "success",
        });
        router.push("/signin");
      }
    } catch (error) {
      Swal.fire({
        title: "Signup Failed",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-300 px-4 pt-4 pb-12">
      <div className="w-[75vh] h-[100vh] bg-white border rounded-lg shadow-md px-6 py-8 overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold text-center text-red-800 mb-4">
          Create Account
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              name="name"
              type="text"
              placeholder="Username"
              required
              className="w-full pl-10 p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <input
              name="image"
              type="file"
              required
              className="w-full p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
            <div
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <RxEyeOpen />}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition"
          >
            SIGN UP
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-grow border-t"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-grow border-t"></div>
          </div>
        </form>

        {/* Link to Sign In */}
        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{" "}
          <Link href="/signin" className="text-red-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
