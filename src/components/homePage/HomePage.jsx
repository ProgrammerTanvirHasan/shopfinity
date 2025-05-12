import About from "../about/About";

import Banner from "../banner/Banner";
import FeaturedHighlight from "../FeaturedHighlight/FeaturedHighlight";

import SellingProduct from "../sellingProduct/SellingProduct";
import Style from "../style/Style";
import Testimonial from "../testimonial/Testimonial";
import TopRated from "../topRated/TopRated";

const HomePage = () => {
  return (
    <div className="space-y-8 ">
      <Banner></Banner>
      <About></About>
      <SellingProduct></SellingProduct>
      <FeaturedHighlight></FeaturedHighlight>
      <TopRated></TopRated>
      <Testimonial></Testimonial>
      <Style></Style>
    </div>
  );
};
export default HomePage;
