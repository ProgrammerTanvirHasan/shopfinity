import Products from "./Products";

const page = () => {
  return (
    <div className="min-h-screen py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
          🛒 Our Products
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Browse our exclusive collection of top-selling products!
        </p>
      </div>
      <Products></Products>
    </div>
  );
};
export default page;
