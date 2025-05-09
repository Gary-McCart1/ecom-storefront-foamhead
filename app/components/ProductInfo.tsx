"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import Loading from "../loading";
import { ImageType } from "../types/image";
import ProductImage from "./ProductImage";
import ProductText from "./ProductText"

const ProductInfo = () => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [secondaryImages, setSecondaryImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      if (data.images) setMainImage(data.images[0].url);
      if (data.images.length > 1) {
        const others = data.images.map((img: ImageType) => img.url);
        setSecondaryImages(others);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Loading />;

  return (
    <div className="mt-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 text-center lg:text-start">
        {/* Images */}
        <ProductImage product={product} secondaryImages={secondaryImages} mainImage={mainImage} setMainImage={setMainImage} />

        {/* Text */}
        <ProductText product={product} quantity={quantity} setQuantity={setQuantity} />
      </div>
    </div>
  );
};

export default ProductInfo;
