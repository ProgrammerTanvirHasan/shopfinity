import Link from "next/link";
import Marquee from "react-fast-marquee";

const Style = () => {
  const topCategories = [
    {
      title: "Favorites",
      route: "/favorites",
      image:
        "https://i.ibb.co/CpgT1rsz/woman-choosing-orange-striped-dress-329181-9208.jpg",
    },
    {
      title: "Continues",
      route: "/continues",
      image:
        "https://i.ibb.co/r2SQGzZ7/attractive-young-woman-blue-dress-straw-hat-walking-tropical-spa-villa-hotel-vacation-summer-style-o.jpg",
    },
    {
      title: "New Arrivals",
      route: "/new-arrivals",
      image:
        "https://i.ibb.co/4nBHLYjN/beautiful-indian-young-girl-holding-posing-with-shopping-bags-grey-background-136354-14522.jpg",
    },
    {
      title: "Top Sellers",
      route: "/top-sellers",
      image:
        "https://i.ibb.co/bMZW5b8C/attractive-stylish-woman-choosing-apparel-clothing-store-285396-4624.jpg",
    },
    {
      title: "Accessories",
      route: "/accessories",
      image:
        "https://i.ibb.co/0pqVJxKQ/chic-beach-bag-with-accessories-isolated-transparent-background-191095-17855.jpg",
    },
  ];

  const bottomCategories = [
    {
      title: "Sneakers",
      route: "/sneakers",
      image:
        "https://i.ibb.co/LzvxwFfW/mens-sneakers-isolated-white-mens-footwear-441923-522.jpg",
    },
    {
      title: "Ethnic Wear",
      route: "/ethnic",
      image: "https://i.ibb.co.com/GQwFXCp8/image.png",
    },
    {
      title: "Bags & Purses",
      route: "/bags",
      image: "https://i.ibb.co.com/xt03yRC6/image.png",
    },
    {
      title: "Watches",
      route: "/watches",
      image: "https://i.ibb.co.com/MwpcxSt/image.png",
    },
    {
      title: "Beauty & Skincare",
      route: "/beauty",
      image: "https://i.ibb.co.com/ZRn4BNBj/image.png",
    },
  ];

  return (
    <div className="flex flex-col space-y-10 px-4 md:px-8 py-12 bg-[#fefefe]">
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Shop by Style</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Whether you're chasing the classics or discovering something bold and
          new, find the pieces that speak your style. From streetwear to
          timeless elegance— your next favorite look starts here.
        </p>
      </div>

      
      <div className="w-full">
        <Marquee speed={70} gradient={false}>
          <div className="p-6 flex gap-8">
            {topCategories.map((cat, index) => (
              <Link href={cat.route} key={index}>
                <div className="block shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-48 h-48 object-cover"
                  />
                  <div className="p-2 text-center font-semibold">
                    {cat.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Marquee>
      </div>

      
      <div className="w-full">
        <Marquee speed={70} gradient={false} direction="right">
          <div className="p-6 flex gap-8">
            {bottomCategories.map((cat, index) => (
              <Link href={cat.route} key={index}>
                <div className="block shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-48 h-48 object-cover"
                  />
                  <div className="p-2 text-center font-semibold">
                    {cat.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Style;
