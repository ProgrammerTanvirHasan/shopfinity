"use client";
import { useState } from "react";
import Link from "next/link";
import { FaExpandArrowsAlt } from "react-icons/fa";

const SeasonedWear = () => {
  const [activeCategory, setActiveCategory] = useState("winter");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const total = categories.length;
  const third = Math.ceil(total / 3);

  const getVisibleCategories = () => {
    if (activeCategory === "winter") return categories.slice(0, third);
    if (activeCategory === "summer") return categories.slice(third, third * 2);
    return categories.slice(third * 2);
  };

  const visibleCategories = getVisibleCategories();

  return (
    <div className=" px-6 py-10 flex flex-col lg:flex-row gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-1">
        {visibleCategories.map((cat, index) => (
          <Link href={cat.image} key={index}>
            <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
              <img
                src={cat.image}
                alt={`Wear ${index}`}
                className="w-full h-48 object-cover"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="w-full lg:w-64 space-y-6">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full px-4 py-2 bg-gray-200 rounded-md text-left hover:bg-orange-200 transition"
          >
            Select Season ▼
          </button>
          {dropdownOpen && (
            <div className="absolute z-20 mt-2 w-full bg-white shadow-md rounded-md overflow-hidden border">
              {["winter", "summer"].map((season) => (
                <button
                  key={season}
                  onClick={() => {
                    setActiveCategory(season);
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-orange-100 text-left"
                >
                  {season.charAt(0).toUpperCase() + season.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveCategory("festive")}
          className="w-full px-4 py-2 bg-orange-100 rounded-md hover:bg-orange-200 transition"
        >
          Show Festive
        </button>

        <div className="text-center border-t pt-6">
          <p className="font-semibold text-lg mb-2">Festive Wear</p>
          <FaExpandArrowsAlt className="text-2xl mx-auto mb-2 text-orange-500" />
          <p className="font-semibold text-lg">Seasoned Wear</p>
          <div className="mt-4">
            <p className="text-gray-600 text-sm mb-4">
              Lorem ipsum dolor sit amet.
            </p>
            <button className="bg-orange-300 text-white px-6 py-2 rounded-full hover:bg-orange-400 transition">
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const categories = [
  {
    image:
      "https://i.ibb.co.com/FqWwSHp5/portrait-girl-with-ice-skates-329181-7342.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/RGb47g09/portrait-young-elegance-blonde-woman-fur-coat-pier-foggy-river-winter-ice-151355-1307.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/29CNtQM/beautiful-young-woman-using-smart-phone-while-standing-outdoors-1048944-15581062.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/hxm1VPG9/portrait-young-elegance-blonde-woman-fur-coat-foggy-river-winter-ice-151355-1290.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/DPyFj9H1/posing-blonde-model-with-pink-fur-jacket-purple-hat-snow-some-trees-cut-with-ice-winter-lifestyle-24.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/1tfWh4dm/cute-teenage-girl-wearing-gray-woolen-cap-scarf-252591-1279.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/CpgT1rsz/woman-choosing-orange-striped-dress-329181-9208.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/Mkt79ZFC/woman-wearing-sundress-23-2150388804.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/FkSJKkrH/casual-pretty-girl-front-pose-beach-indian-pakistani-model-561639-3230.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/7dFv81BG/glad-man-with-hot-beverage-resting-near-palm-461973-1537.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/4Z3Byknt/happy-attractive-man-stylish-sunglasses-with-beard-using-mobile-phone-beach-273443-2344.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/dSbNGvs/confused-young-handsome-curly-man-wearing-sunglasses-holding-swim-ring-showing-empty-hand-isolated-b.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/wFmHLwrc/young-beautiful-man-wedding-party-1048944-15878569.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/d0wFnYNr/indian-man-traditional-wear-kurta-pyjama-cloths-male-fashion-model-sherwani-posing-standing-against.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/DgrYm0QS/young-woman-beautiful-red-dress-1303-17503.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/yF4vNxfL/beautiful-indian-young-girl-holding-posing-with-shopping-bags-grey-background-136354-14504.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/gLpHQ51b/two-sister-beautiful-clothers-1186134-4.jpg",
  },
  {
    image:
      "https://i.ibb.co.com/Q7d5SsXT/handsome-man-near-christmas-tree-gentelman-black-suit-1157-45163.jpg",
  },
];

export default SeasonedWear;
