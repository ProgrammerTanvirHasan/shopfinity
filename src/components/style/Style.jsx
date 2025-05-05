import Link from "next/link";
import Marquee from "react-fast-marquee";
const Style = () => {
  const categories = [
    {
      title: "Favorites",
      route: "/favorites",
      image:
        "https://i.ibb.co.com/CpgT1rsz/woman-choosing-orange-striped-dress-329181-9208.jpg",
    },
    {
      title: "Continues",
      route: "/continues",
      image:
        "https://i.ibb.co.com/r2SQGzZ7/attractive-young-woman-blue-dress-straw-hat-walking-tropical-spa-villa-hotel-vacation-summer-style-o.jpg",
    },
    {
      title: "New Arrivals",
      route: "/new-arrivals",
      image:
        "https://i.ibb.co.com/4nBHLYjN/beautiful-indian-young-girl-holding-posing-with-shopping-bags-grey-background-136354-14522.jpg",
    },
    {
      title: "Top Sellers",
      route: "/top-sellers",
      image:
        "https://i.ibb.co.com/bMZW5b8C/attractive-stylish-woman-choosing-apparel-clothing-store-285396-4624.jpg",
    },
    {
      title: "Accessories",
      route: "/accessories",
      image:
        "https://i.ibb.co.com/0pqVJxKQ/chic-beach-bag-with-accessories-isolated-transparent-background-191095-17855.jpg",
    },
    {
      title: "Sneakers",
      route: "/sneakers",
      image:
        "https://i.ibb.co.com/LzvxwFfW/mens-sneakers-isolated-white-mens-footwear-441923-522.jpg",
    },
  ];

  return (
    <div className="lg:flex ">
      <Marquee speed={80} gradient={false} className="text-lg font-semibold">
        <div className="p-6 flex gap-8 ">
          {categories.map((cat, index) => (
            <Link href={cat.route} key={index}>
              <div className="block shadow-lg rounded-xl overflow-hidden hover:scale-115 transition cursor-pointer">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-48 h-48 object-cover"
                />
                <div className="p-2 text-center font-semibold">{cat.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Style;
