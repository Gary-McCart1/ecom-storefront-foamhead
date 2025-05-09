"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Truck, Sparkles } from "lucide-react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Shipping & Returns",
      icon: <Truck className="w-5 h-5 text-[#e89160] mr-2" />,
      content:
        "We offer free shipping on all orders. All purchases include a 60-day money-back guarantee.",
    },
    {
      title: "Care Instructions",
      icon: <Sparkles className="w-5 h-5 text-[#e89160] mr-2" />,
      content:
        "Clean with a damp cloth and store in a cool, dry place. Avoid direct sunlight for extended periods.",
    },
  ];

  return (
    <div className="my-8 rounded-lg border border-gray-200 overflow-hidden text-left text-gray-800 w-full">
      {items.map((item, index) => (
        <div key={index} className="border-b last:border-b-0">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center px-4 py-4 text-lg font-semibold bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="flex items-center">
              {item.icon}
              {item.title}
            </span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 bg-white text-base text-gray-700 leading-relaxed">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
