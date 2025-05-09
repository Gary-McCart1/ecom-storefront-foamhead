import React, { useContext } from "react";
import TrustBadge from "./TrustBadge";
import Accordian from "./Accordian";
import { Product } from "../types/product";
import Stars from "./Stars";
import DiscountValue from "./DiscountValue";
import { CartContext } from "../context/CartContext";
import ReviewBlock from "./ReviewBlock";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const ProductText = ({ product, quantity, setQuantity }: Props) => {
  const router = useRouter();
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { setCartItems } = cart;

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => [...prev, { product: product, quantity: quantity }]);
    router.push("/cart")
  };
  return (
    <div>
      <h1 className="font-black text-5xl">{product.name}</h1>
      <div className="flex text-2xl items-center justify-center lg:justify-start my-2">
        <Stars num={String(product.rating)} />
        <p className="text-lg pl-3">{product.rating % 1 === 0 ? product.rating + ".0" : product.rating} / 5.0</p>
      </div>
      <div className="flex justify-center lg:justify-start items-center">
        <p className="text-xl font-sans">${product.price}</p>
        <p className="text-lg mx-5 line-through text-gray-500 font-sans">
          ${product.originalPrice}
        </p>
        <div>
          <DiscountValue product={product} />
        </div>
      </div>
      <div className="list-none my-3 mt-8 text-lg">
        <li>🌊 Built for Performance</li>
        <li>🛡️ Durable & Lightweight</li>
        <li>🇺🇸 Designed in the USA</li>
      </div>
      <div className="mt-5">
        <p className="font-medium text-lg mb-2">Quantity</p>
        <div className="flex items-center gap-4 justify-center lg:justify-start">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center lg:items-start justify-start">
        <button
          onClick={() => addToCart(product, quantity)}
          className="w-full px-6 py-4 bg-[#e89160] hover:cursor-pointer hover:bg-[#659f9c] text-white rounded-lg font-bold"
        >
          Add To Cart
        </button>
        <div className="w-full">
          <TrustBadge />
        </div>
      </div>
      <div className="w-full">
        <Accordian />
      </div>
      <div>
        <div
          className="prose w-full  mt-10 text-start list-disc"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center lg:hidden mt-10 w-full">
          <ReviewBlock product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductText;
