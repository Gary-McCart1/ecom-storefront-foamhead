"use client";

import React, { useEffect, useState } from "react";
import Loading from "../loading";
import Image from "next/image";
import { Product } from "../types/product";
import Stars from "./Stars";
import Link from "next/link";

interface Props {
  productId: number;
}

const ProductCard = ({ productId }: Props) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://foamhead-a8f24bda0c5b.herokuapp.com/api/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <Loading />;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full min-w-[280px] max-w-2xl m-5 overflow-hidden">
      <figure className="w-full h-[250px] lg:h-[450px] bg-gray-100 flex items-center justify-center">
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={400}
          height={400}
          className="object-contain max-h-[220px] lg:max-h-[400px]"
        />
      </figure>
      <div className="p-5">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
          {product.name}
        </h2>
        <div className="flex items-center text-md text-yellow-500 mb-3">
          <Stars num={String(product.rating)} />
          <span className="ml-2 text-gray-700">{product.rating % 1 === 0 ? product.rating + ".0" : product.rating}/5.0</span>
        </div>
        <p className="text-gray-600 text-md mb-4" dangerouslySetInnerHTML={{ __html: product.description.substring(0, 150) + "..."}}>
        </p>
        <div className="flex justify-start">
          <Link href={`products/${product.id}`}>
            <button className="px-6 py-3 bg-[#e89160] text-white rounded-lg hover:bg-[#659f9c] hover:px-7 hover:py-4 text-md">
              View Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
