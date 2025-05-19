"use client";

import { useEffect, useContext } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext"; // adjust the import path

const Success = () => {
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (cartContext) {
      cartContext.setCartItems([]); // clear cart in context and localStorage
    }
  }, [cartContext]);

  return (
    <div className="flex justify-center items-center h-screen bg-[#659f9c]">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-[#659f9c]">Payment Successful!</h1>
        <p className="mt-4 text-lg">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <p className="mt-6">
          <Link href="/">
            <button className="px-6 py-2 text-white bg-[#659f9c] rounded-lg hover:bg-black transition">
              Go to Homepage
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
