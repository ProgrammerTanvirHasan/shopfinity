"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You’ve successfully signed up for the newsletter.",
    });

    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      <section className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/images/about-hero.jpg" 
          alt="About Hero Image"
          fill={true} 
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Shopfinity
          </motion.h1>
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-4 py-16 space-y-6">
        <motion.h2
          className="text-4xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Shopfinity <br /> More than a brand. It’s a feeling.
        </motion.h2>
        <div className="space-y-4 text-xl leading-relaxed text-gray-700">
          <p>
            At Shopfinity, we believe that fashion should do more than just
            fit—it should resonate with you...
          </p>
          <p>
            We design for the soft rebels, the quiet leaders, the midnight
            dreamers...
          </p>
          <p>From curated essentials to elevated statements...</p>
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="https://i.imgur.com/3lkxALB.jpeg"
            alt="Shopfinity Lifestyle"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
        <div className="md:w-1/2 space-y-4">
          <h3 className="text-3xl font-semibold">Our Mission</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            To empower individuality and self-expression through effortless
            fashion...
          </p>
        </div>
      </section>

      
      <section className="bg-gray-100 py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <blockquote className="text-2xl italic font-medium text-gray-700">
            "Shopfinity didn’t just change how I dress, it changed how I feel
            about myself."
          </blockquote>
          <p className="mt-4 text-gray-500">— A loyal customer</p>
        </motion.div>
      </section>

     
      <section className="bg-gray-50 py-16 px-4">
        <motion.div
          className="max-w-6xl mx-auto text-center space-y-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold">What We Stand For</h3>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                title: "Intentional Design",
                desc: "Every piece we create serves a purpose...",
              },
              {
                title: "Sustainable Mindset",
                desc: "We’re committed to mindful production...",
              },
              {
                title: "Community First",
                desc: "You’re more than a customer—you’re part of the Shopfinity story.",
              },
            ].map((item, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

    
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2">
            <img
              src="https://i.ibb.co.com/Gv4MXpQH/brunette-girl-gray-dress-yellow-jacket-is-standing-near-table-workshop-studio-she-has-lot-creative-s.jpg"
              alt="Behind the scenes at Shopfinity"
              width={600}
              height={400}
              className="rounded-2xl shadow-md"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-3xl font-semibold">Behind the Scenes</h3>
            <p className="text-lg text-gray-700">
              From initial sketches to final fittings, every step in our process
              reflects our passion for detail and quality. Step inside the world
              of Shopfinity and see where inspiration becomes reality.
            </p>
          </div>
        </motion.div>
      </section>

      
      <section className="bg-orange-50 py-20 px-4">
        <motion.div
          className="max-w-xl mx-auto text-center space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold">Stay in the Loop</h3>
          <p className="text-gray-700 text-lg">
            Sign up for our newsletter to receive updates, exclusive offers, and
            style inspiration.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 w-full sm:w-64 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>

      
      <footer className="pt-10 border-t border-gray-300 text-sm text-gray-600 text-center pb-6">
        Established with purpose. Created with care. Worn with pride.
      </footer>
    </div>
  );
};

export default page;
