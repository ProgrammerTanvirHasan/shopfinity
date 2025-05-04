import { FaShopify } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="bg-linear-to-r from-orange-300 to-orange-200 flex items-center">
      <div className="flex gap-2 py-2 ml-4 text-white items-center">
        <FaShopify className="text-2xl" />
        <p className="text-xl">Shopfinity</p>
      </div>
      <div className="ml-auto pr-4">
        <form className="bg-white rounded-full flex items-center px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition">
          <input
            className="outline-none bg-transparent text-black placeholder-gray-500 px-2 w-48"
            type="search"
            required
            placeholder="Search"
          />
          <CiSearch className="text-gray-600 text-xl" />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
