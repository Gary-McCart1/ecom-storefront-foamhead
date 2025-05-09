// components/CheckoutButton.tsx
"use client";

// import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../context/CartContext";
import { forwardRef, useContext } from "react";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

interface CheckoutButtonProps {
  id: string;
}

const CheckoutButton = forwardRef<HTMLButtonElement, CheckoutButtonProps>(
  ({ id }, ref) => {
    const cart = useContext(CartContext);

    if (!cart) {
      console.log(id);
      throw new Error("CartContext must be used within a CartProvider");
    }

    const { cartItems } = cart;
    console.log(cartItems);
    const handleCheckout = async () => {
      const response = await fetch(
        "https://foamhead-a8f24bda0c5b.herokuapp.com/api/create-checkout-session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              product: {
                name: item.product.name,
                price: Math.round(Number(item.product.price) * 100),
              },
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed:", data.error);
      }
    };

    return (
      <button
        ref={ref}
        id={id}
        onClick={handleCheckout}
        className="btn px-6 py-4 bg-[#e89160] rounded-lg text-white hover:cursor-pointer hover:bg-[#659f9c]"
      >
        Proceed to Checkout
      </button>
    );
  }
);

CheckoutButton.displayName = "CheckoutButton";

export default CheckoutButton;
