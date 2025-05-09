"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import CheckoutButton from "../components/CheckoutButton";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import Image from "next/image";

const Checkout = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const cart = useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const checkoutButtonRef = useRef<HTMLButtonElement | null>(null); // Ref for the Stripe button

  if (!cart) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cartItems, cartTotal } = cart;

  useEffect(() => {
    setIsHydrated(true); // Mark as hydrated after the component mounts
  }, []);

  useEffect(() => {
    if (isSubmitting && checkoutButtonRef.current) {
      checkoutButtonRef.current.click(); // Trigger the hidden checkout button
    }
  }, [isSubmitting]);

  if (!isHydrated) {
    return <div>Loading...</div>; // Provide a loading state while hydrated
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !address || !phone) {
      alert("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);

    const orderData = {
      name,
      email,
      address,
      phone,
      date: new Date().toISOString(),
      status: "Pending",
      shippingMethod,
      trackingNumber: "----", // Placeholder for tracking number
      total: cartTotal,
      products: cartItems.map((item) => item.product.id), // Send only product IDs
    };

    try {
      const res = await fetch("https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to add order:", errorData);
      } else {
        console.log("Order created successfully");
        setIsSubmitting(false); // Stop submitting once order is created
      }
    } catch (error) {
      console.log("Error:", error);
      setIsSubmitting(false); // Stop submitting in case of an error
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h2 className="text-4xl font-semibold mb-10">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-medium mb-4">Shipping Details</h3>

          <input
            className="w-full p-3 border border-gray-300 rounded-md"
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md"
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md"
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            name="shippingMethod"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option value="Standard">Standard Shipping</option>
          </select>

          <div className="flex justify-between mt-6">
            <Link href="/cart">
              <button
                type="button"
                className="px-5 py-3 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                &larr; Back to Cart
              </button>
            </Link>
            {cartItems.length > 0 && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#e89160] text-white px-6 py-3 rounded-md hover:bg-[#d47c47]"
              >
                {isSubmitting ? "Processing..." : <p>To Payment &rarr;</p>}
              </button>
            )}
          </div>
        </form>

        {/* Cart Summary Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-4">Your Order</h3>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex">
                    <div>
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-right font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {cartItems.length > 0 && (
            <div className="border-t mt-6 pt-4 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>
                $
                {cartItems
                  .reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Invisible Stripe trigger */}
      {isSubmitting && (
        <div className="hidden">
          <CheckoutButton ref={checkoutButtonRef} id="checkout-button" />
        </div>
      )}
    </div>
  );
};

export default Checkout;
