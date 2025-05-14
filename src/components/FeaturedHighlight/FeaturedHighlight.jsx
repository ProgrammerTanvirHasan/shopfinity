"use client";

import React from "react";
import "../../components/FeaturedHighlight/flip.css";

const flipCards = [
  {
    title: "Sunset Satin Dress",
    image: "https://i.ibb.co.com/39RcPLcq/image.png",
    backText:
      "A perfect evening gown that captures the essence of golden hour. Flowing satin that catches the light just right.",
  },
  {
    title: "Pinstriped Power Suit",
    image: "https://i.ibb.co.com/1tR4CCYN/image.png",
    backText:
      "Tailored to perfection, this pinstriped suit is for those who command attention with every step they take.",
  },
  {
    title: "Cotton Comfort Dress",
    image: "https://i.ibb.co.com/WpgfQFTG/image.png",
    backText:
      "The ultimate in laid-back luxury, this soft cotton dress feels like a gentle embrace on a perfect day.",
  },
  {
    title: "Noir Evening Gown",
    image: "https://i.ibb.co.com/dJ2gYTZt/image.png",
    backText:
      "A sleek and timeless black gown, designed to make a statement. Embrace the darkness with elegance and allure.",
  },
];

const FeaturedHighlight = () => {
  return (
    <section className="bg-white py-16">
      <h2 className="text-3xl font-semibold text-center text-black mb-10">
        Flip Into Your Next Fashion Adventures
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {flipCards.map((card, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-72 object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-semibold text-center py-4">
                  {card.title}
                </h3>
              </div>
              <div className="flip-card-back flex flex-col items-center justify-center p-4">
                <h4 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h4>
                <p className="text-white text-sm text-center">
                  {card.backText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedHighlight;
