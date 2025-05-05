import { FaShopify } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";
const Footer = () => {
  return (
    <div className="relative w-full h-[250px] bg-[#15202B] text-white ">
      <div className="grid grid-cols-3 gap-4 container mx-auto flex pt-8 px-4">
        <div>
          <div className="flex gap-2 py-2 ml-4 text-white items-center">
            <FaShopify className="text-2xl text-orange-400" />
            <p className="text-xl">Shopfinity</p>
          </div>
          <p className=" text-gray-500">
            Discover the most popular outfits loved by our customers.
          </p>
        </div>

        <div className="py-2">
          <p className=" text-xl">Important Links</p>
          <div className="text-sm text-gray-500 ">
            <p>Home</p>
            <p>About</p>
            <p>Contract</p>
            <p>Blog</p>
          </div>
        </div>

        <div className="py-2">
          <div className="flex space-x-2 text-xl">
            <FaInstagram></FaInstagram>
            <FaFacebook></FaFacebook>
            <CiLinkedin></CiLinkedin>
          </div>
          <div className="flex space-x-2 mt-2  text-gray-500">
            <CiLocationArrow1 className="mt-1"></CiLocationArrow1>
            <p> Boshundhara,dhaka</p>
          </div>
          <div className="flex space-x-2 mt-2   text-gray-500">
            <IoIosPhonePortrait className="mt-1"></IoIosPhonePortrait>
            <p>01790000000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
