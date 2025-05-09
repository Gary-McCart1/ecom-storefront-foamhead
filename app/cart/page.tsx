"use client";
import { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Link from "next/link";


export default function Cart() {
  const [isHydrated, setIsHydrated] = useState(false);
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cartItems, setCartItems, cartTotal } = cart;

  useEffect(() => {
    setIsHydrated(true); // Mark as hydrated after the component mounts
  }, []);

  if (!isHydrated) return null;

  return (
    <div>
      <Navigation opaque={true} home={false} />
      <div className="page">
        <div className="mt-50 mb-5">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-[900]">Cart</h2>
            {cartItems.length > 0 && (
              <div className="flex">
                <h3 className="text-2xl font-[900] pr-3">Total:</h3>
                <h4 className="text-2xl font-sans">
                  ${cartTotal.toFixed(2)}
                </h4>
              </div>
            )}
          </div>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {cartItems.map((item, index) => (
                <div className="flex" key={index}>
                  <CartItem index={index} item={item} setCartItems={setCartItems} />
                </div>
              ))}
            </div>
          ) : (
            <p>No items are currently in the cart.</p>
          )}
        </div>
        <div className="mt-5 flex justify-between">
          <Link href="/products">
            <button className="btn px-6 py-4 rounded-lg border hover:cursor-pointer hover:bg-[#e89160] hover:border-none hover:text-white">
              &larr; Keep Shopping
            </button>
          </Link>
          {cartItems.length > 0 && (
            <Link href="/checkout">
              <button
                className="btn px-6 py-4 bg-[#e89160] rounded-lg text-white hover:cursor-pointer hover:bg-[#659f9c]"
              >
                Proceed to Checkout &rarr;
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
