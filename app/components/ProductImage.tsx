import React from "react";
import { Product } from "../types/product";
import Image from "next/image";
import ReviewBlock from "./ReviewBlock";

interface Props {
  product: Product;
  secondaryImages: string[];
  mainImage: string;
  setMainImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProductImage = ({
  product,
  secondaryImages,
  mainImage,
  setMainImage,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg h-[500px] relative flex justify-center mb-4">
        {mainImage && (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain rounded-lg bg-gray-100"
          />
        )}
      </div>
      <div>
        {secondaryImages.length > 0 && (
          <div className="flex gap-5">
            {secondaryImages.map((image, index) => (
              <div
                key={index}
                className="relative w-[100px] h-[100px] rounded bg-gray-100 flex flex-start"
              >
                <Image
                  onClick={() => setMainImage(image)}
                  src={image}
                  alt={`${product.name} - ${index}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="hidden lg:flex mt-15 w-full">
        <ReviewBlock product={product}/>
      </div>
    </div>
  );
};

export default ProductImage;
