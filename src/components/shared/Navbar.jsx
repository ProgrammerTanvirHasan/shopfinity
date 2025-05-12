"use client";

import { FaShopify } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === "admin";

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(`/api/product`);
        const data = await res.json();
        setNotifications(data.users || []);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="flex bg-[#fea928]/40 items-center px-4 py-2 relative">
      <Link href="/">
        <div className="flex gap-2 text-white items-center">
          <FaShopify className="text-2xl" />
          <p className="text-xl">Shopfinity</p>
        </div>
      </Link>

      {isAdmin && (
        <div className="ml-auto relative">
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
            <div className="absolute right-0 mt-18 w-64 bg-white shadow-xl  z-50 max-h-80 overflow-y-auto">
              <div className="p-2 text-xl font-semibold text-gray-700">
                Notifications
              </div>
              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-1 text-sm hover:bg-gray-100"
                >
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-800">
                      {item.userEmail}
                    </span>{" "}
                    booked{" "}
                    <span className="font-medium text-gray-900">
                      {item.title}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
