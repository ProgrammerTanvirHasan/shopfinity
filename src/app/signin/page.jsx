"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center mt-8  items-center bg-base-300 pt-4 pb-12">
      <div className="w-[85vh] h-[100vh] border-t-64 border-red-600  rounded-2xl shadow-md flex flex-col justify-center px-10 py-6 bg-white">
        <h2 className="text-2xl font-bold text-center text-red-800 mb-6">
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-600">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-red-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full border-b-2 border-gray-300 outline-none py-2 pr-10 focus:border-red-500"
            />
            <div
              className="absolute right-2 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <RxEyeOpen />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-red-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
