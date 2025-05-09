// pages/success.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";

const Success = () => {
  useEffect(() => {
    // You can add more logic here to handle the success,
    // like verifying the session with your backend or using query params
    // Example: Make an API call to your server to confirm the order is processed
    console.log("Payment was successful!");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#659f9c]">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-[#659f9c]">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg">
          Thank you for your purchase. Your payment has been successfully
          processed.
        </p>
        <p className="mt-6">
          <Link href="/">
            <button
              className="px-6 py-2 text-white bg-[#659f9c] rounded-lg hover:bg-black transition"
            >
              Go to Homepage
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
