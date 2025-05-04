"use client";

import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import Link from "next/link";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="shadow-xl flex bg-white z-index justify-between lg:justify-around items-center px-4 py-2 bg-white relative z-50">
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-black"
        >
          <RiMenu2Line />
        </button>
      </div>

      <ul className="hidden lg:flex gap-6 text-black font-medium">
        {links.map((link) => (
          <Link
            className="hover:text-orange-400"
            key={link.path}
            href={link.path}
          >
            {link.title}
          </Link>
        ))}
      </ul>

      <div>
        <Link
          href="/login"
          className="rounded-xl px-4 py-1 bg-orange-400 text-white"
        >
          Login
        </Link>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-48  opacity-100 border-t shadow-lg lg:hidden">
          <ul className="flex flex-col gap-4 p-4 text-black   font-medium">
            {links.map((link) => (
              <Link
                className="hover:bg-slate-950 pl-2 text-white rounded-xl"
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const links = [
  { title: "Home", path: "/" },
  { title: "Find a Donor", path: "/donor" },
  { title: "Blood Banks", path: "/bloodBanks" },
  { title: "Today's Patient", path: "/todaysBloodRequest" },
  { title: "Dashboard", path: "/dashboard" },
];

export default NavigationBar;
