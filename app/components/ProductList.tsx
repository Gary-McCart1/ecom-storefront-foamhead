"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import Loading from "../loading";
import ProductCard from "./ProductCard";

interface Props {
    filter: string;
}

const ProductList = ({filter}: Props) => {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/products?search=${filter}`);
        const data = await response.json();
        setProducts(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]);
  if (!products || loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full mx-auto">
        {products.map((product, index) => (
          <div key={index} className="mt-1 flex justify-center">
            <ProductCard productId={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
