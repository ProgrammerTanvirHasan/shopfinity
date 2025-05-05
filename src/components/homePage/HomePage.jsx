import Banner from "../banner/Banner";
import SeasonedWear from "../seasonedWear/SeasonedWer";

import SellingProduct from "../sellingProduct/SellingProduct";
import Style from "../style/Style";
import Testimonial from "../testimonial/Testimonial";
import TopRated from "../topRated/TopRated";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <Banner></Banner>
      <SellingProduct></SellingProduct>
      <TopRated></TopRated>
      <SeasonedWear></SeasonedWear>
      <Testimonial></Testimonial>
      <Style></Style>
    </div>
  );
};
export default HomePage;
