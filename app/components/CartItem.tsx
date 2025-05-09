"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Item } from "../context/CartContext";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";
import Stars from "./Stars";

interface Props {
  item: Item;
  setCartItems: Dispatch<SetStateAction<Item[]>>;
  index: number;
}

const CartItem = ({ item, setCartItems, index }: Props) => {
  const removeItem = (indexToRemove: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  

  const updateQuantity = (amount: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === item.product.id
          ? { ...i, quantity: Math.max(1, i.quantity + amount) }
          : i
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-2xl shadow-sm w-full bg-white">
      {/* Product Image */}
      <div className="relative w-full md:w-40 h-48 md:h-40 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.product.images[0].url}
          alt={item.product.name}
          fill
          className="object-contain rounded-lg bg-gray-100"
          sizes="(max-width: 768px) 100vw, 160px"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold line-clamp-2">
              {item.product.name}
            </h3>
            <div className="flex">
              <Stars num={String(item.product.rating)} />
            </div>
            <p
              className="text-gray-600 text-sm mt-2 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: item.product.description.substring(0, 150) + "...",
              }}
            ></p>
          </div>
          <button
            onClick={() => removeItem(index)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <FaTrash />
          </button>
        </div>

        {/* Quantity & Price */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
            >
              −
            </button>
            <span className="text-base font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
            >
              +
            </button>
          </div>
          <div className="text-sm text-gray-500 font-sans">
            Product Total: ${item.product.price} × {item.quantity} =
            <span className="ml-2 text-base font-bold text-black">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
