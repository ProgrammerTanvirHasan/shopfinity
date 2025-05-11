const products = [
  {
    id: 1,
    title: "Casual Wear",
    image: "https://i.ibb.co.com/jv2rrX2B/render.png",
    description: "Light, breezy, and perfect for hot days.",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Printed Shirt",
    image: "https://i.ibb.co.com/FqXKPrVQ/render-1.png",
    description: "Comfort meets style for daily wear.",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Women shirt",
    image: "https://i.ibb.co.com/hR3RmzDQ/render-2.png",
    description: "Trendy accessories to complete your look.",
    rating: 4.2,
  },
];

const TopRated = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl text-black font-bold mb-2">Top Rated Products</h2>
      <p className="mb-6 text-gray-600">
        Check out the most loved items from our collection.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100  shadow-xl hover:scale-105 transition py-4"
          >
            <figure className="px-4 pt-4">
              <img
                src={product.image}
                alt={product.title}
                className="rounded-xl h-52 object-cover w-full"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title text-black">{product.title}</h2>
              <div className="text-yellow-500 text-sm mb-2">
                {"★".repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && "½"}
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
