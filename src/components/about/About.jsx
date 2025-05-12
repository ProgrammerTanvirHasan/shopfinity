import Link from "next/link";

const About = () => {
  return (
    <section className="bg-[#f9f4f1] py-20 px-6 text-gray-900 font-serif">
      <div>
        <div className="bg-white shadow-lg rounded-xl p-8 mt-12 text-center space-y-4">
          <h2 className="text-2xl font-bold">
            Become a part of the Shopfinity story
          </h2>
          <p className="text-gray-700 text-base">
            Sign up to unlock early access, exclusive drops, and fashion made
            just for you. Join a community where your style speaks
            volumes—before you even say a word.
          </p>
          <Link
            href={"/signup"}
            className="inline-block mt-4 px-8 py-3 bg-gray-900 text-white text-lg font-medium rounded-full shadow-md hover:bg-gray-800 transition"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
