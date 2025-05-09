"use client";

import React, { useEffect, useState } from "react";
import { Order } from "../types/order";
import { Product } from "../types/product";
import Loading from "../loading";
import ProductCard from "./ProductCard";

const countProductOrders = (orders: Order[], products: Product[]) => {
  const counts: { [key: string]: { count: number; id: number } } = {};

  orders.forEach((order) => {
    order.products.forEach((orderedProduct) => {
      console.log(orderedProduct)
      const product = products.find((p) => p.id === orderedProduct);
      if (!product) return;

      if (!counts[product.name]) {
        counts[product.name] = { count: 1, id: product.id };
      } else {
        counts[product.name].count += 1;
      }
    });
  });

  return Object.entries(counts)
    .map(([name, { count, id }]) => ({ name, count, id }))
    .sort((a, b) => b.count - a.count);
};

const TopProductsBlock = () => {
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState<
    { name: string; count: number; id: number }[]
  >([]);

  const [, setProducts] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderResponse = await fetch("https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders");
        const orderData = await orderResponse.json();

        const productResponse = await fetch(
          "https://foamhead-a8f24bda0c5b.herokuapp.com/api/products"
        );
        const productData = await productResponse.json();
        setProducts(productData.results);

        const ordersByProduct = countProductOrders(
          orderData.results,
          productData.results
        );
        setTopProducts(ordersByProduct.slice(0, 4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto">
        {topProducts.map((product, index) => (
          <div key={index} className="mt-1 flex justify-center">
            <ProductCard productId={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsBlock;
