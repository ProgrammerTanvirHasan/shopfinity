"use client";

import { FaShopify } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === "admin";

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
        );
        const data = await res.json();
        setNotifications(data.users || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    if (isAdmin) fetchNotifications();
  }, [isAdmin]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/searchProduct?query=${encodeURIComponent(searchTerm)}`
    );
    setSearchTerm("");
  };

  return (
    <div className="flex bg-[#fea928]/40 justify-between items-center px-4 py-2 relative">
      <Link href="/">
        <div className="flex gap-2 text-white items-center">
          <FaShopify className="text-2xl text-indigo-700" />
          <p className="text-xl text-indigo-900">Shopfinity</p>
        </div>
      </Link>

      <div className="flex items-center gap-4 ml-auto relative">
        <form onSubmit={handleSearch} className="relative ">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-10 py-1 rounded-md border border-4 border-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <FaSearch className="text-sm" />
          </button>
        </form>

        {isAdmin && (
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <IoMdNotificationsOutline className="text-2xl text-gray-800" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-18 w-64 bg-white shadow-xl z-50 max-h-80 overflow-y-auto">
                <div className="p-2 text-xl font-semibold text-gray-700">
                  Notifications
                </div>
                {notifications.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-1 text-sm hover:bg-black hover:text-white"
                  >
                    <p className="text-sm ">
                      <span className="font-semibold ">{item.userEmail}</span>{" "}
                      booked <span className="font-medium ">{item.title}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
