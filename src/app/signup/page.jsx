"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUser, FaLock, FaRegEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const user = { name, email, password };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          title: "Welcome!",
          text: res?.data?.message || "Signup successful!",
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
    <div className="min-h-screen flex items-center  justify-center bg-gray-100 px-4 py-10">
      <div className="w-[85vh] border-t-68 rounded-2xl border-red-700 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold  h-[25vh] text-center text-red-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              name="name"
              type="text"
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="relative">
            <MdEmail className="absolute left-3 top-3.5 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div
              className="absolute right-3 top-3.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <RxEyeOpen />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition"
          >
            Sign Up
          </button>

          <div className="flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
        </form>

        <p className="text-center text-sm mt-6 text-gray-700">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-red-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
