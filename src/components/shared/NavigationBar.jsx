"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { RiMenu2Line } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavigationBar = () => {
  const session = useSession();
  const user = session?.data?.user;
  const isAdmin = user?.role === "admin";

  const [menuOpen, setMenuOpen] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const pathname = usePathname();

  const commonLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Top Rated", path: "/topRated" },
    { title: "Kids Wear", path: "/kidswear" },
    { title: "Mens Wear", path: "/menswear" },
    { title: "Trending Items", path: "/tranding" },
  ];

  const categoryLinks = [
    { title: "Womens collection", path: "/womens-collection" },
    { title: "Casual Wear", path: "/casual-ware" },
    { title: "Winter ware", path: "/winter-ware" },
    { title: "Summer ware", path: "/summer-ware" },
    { title: "Festive ware", path: "/festive-ware" },
  ];

  return (
    <div className="shadow-xl flex bg-white z-50 justify-between lg:justify-around items-center px-4 py-2 relative">
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-black"
        >
          <RiMenu2Line />
        </button>
      </div>

      <ul className="hidden lg:flex gap-6 text-black font-medium items-center">
        {commonLinks.map((link) => (
          <Link
            className={`hover:text-orange-300 ${
              pathname === link.path ? "text-orange-500" : ""
            }`}
            key={link.path}
            href={link.path}
          >
            {link.title}
          </Link>
        ))}

        <div className="relative">
          <button
            onClick={() => setCategoryDropdown(!categoryDropdown)}
            className="hover:text-orange-400 flex items-center gap-1 focus:outline-none"
          >
            Other Categorys{" "}
            <FiChevronDown
              className={`transition-transform ${
                categoryDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          {categoryDropdown && (
            <div className="absolute mt-2 py-2 w-40 z-50 bg-white shadow-md rounded">
              {categoryLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-4 py-2 text-sm hover:text-orange-300 ${
                    pathname === link.path ? "text-orange-500" : ""
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {user && isAdmin ? (
          <div className="relative">
            <button
              onClick={() => setAdminDropdown(!adminDropdown)}
              className="hover:text-orange-400 flex items-center gap-1 focus:outline-none"
            >
              Admin Panel{" "}
              <FiChevronDown
                className={`transition-transform ${
                  adminDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {adminDropdown && (
              <div className="absolute mt-2 py-2 w-40 z-50 bg-white shadow-md rounded">
                <Link
                  href="/admin"
                  className={`block px-4 py-2 text-sm hover:text-orange-300 ${
                    pathname === "/admin" ? "text-orange-400" : ""
                  }`}
                >
                  Create form
                </Link>
                <Link
                  href="/product"
                  className={`block px-4 py-2 text-sm hover:text-orange-300 ${
                    pathname === "/product" ? "text-orange-500" : ""
                  }`}
                >
                  Product
                </Link>
              </div>
            )}
          </div>
        ) : user ? (
          <Link
            href="/orders"
            className={`hover:text-orange-300 ${
              pathname === "/orders" ? "text-orange-500" : ""
            }`}
          >
            My Product
          </Link>
        ) : null}
      </ul>

      <div>
        {user ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-xl px-4 py-2 bg-red-500/70 text-white hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/signin"
            className="rounded-xl px-4 py-2 bg-red-500/70 text-white hover:bg-red-600"
          >
            Login
          </Link>
        )}
      </div>

      {menuOpen && (
        <div className="top-full left-0 w-64 border-t lg:hidden z-50  absolute">
          <ul className="flex flex-col gap-4 p-4 text-black font-medium">
            {commonLinks.map((link) => (
              <Link
                className={`hover:text-orange-300 hover:bg-black hover:text-white pl-2 rounded-xl ${
                  pathname === link.path ? "text-orange-500" : ""
                }`}
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}

            <div>
              <button
                onClick={() => setCategoryDropdown(!categoryDropdown)}
                className="text-left hover:text-orange-400 pl-2 flex items-center gap-1 w-full"
              >
                Other Categorys{" "}
                <FiChevronDown
                  className={`transition-transform ${
                    categoryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {categoryDropdown && (
                <div className="ml-16 mt-2 space-y-2">
                  {categoryLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`block px-2 py-1 text-sm hover:bg-black hover:text-white hover:text-orange-300 rounded ${
                        pathname === link.path ? "text-orange-500" : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {user && isAdmin ? (
              <div>
                <button
                  onClick={() => setAdminDropdown(!adminDropdown)}
                  className="text-left hover:text-orange-400 pl-2 rounded-xl flex items-center gap-1 w-full"
                >
                  Admin Panel{" "}
                  <FiChevronDown
                    className={`transition-transform ${
                      adminDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {adminDropdown && (
                  <div className="ml-16 mt-2 space-y-2 ">
                    <Link
                      href="/admin"
                      className={`block px-2 py-1 text-sm hover:bg-black hover:text-white rounded ${
                        pathname === "/admin" ? "text-orange-500" : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Create form
                    </Link>
                    <Link
                      href="/product"
                      className={`block px-2 py-1 text-sm hover:bg-black hover:text-white rounded ${
                        pathname === "/product" ? "text-orange-500" : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Product
                    </Link>
                  </div>
                )}
              </div>
            ) : user ? (
              <Link
                href="/orders"
                className={`hover:bg-slate-950 hover:text-white pl-2 rounded-xl ${
                  pathname === "/orders" ? "text-orange-300" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                My Product
              </Link>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
