import { ImageType } from "./image";
import { Review } from "./review";

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    stock: number,
    rating: number,
    description: string;
    images: ImageType[];
    product_reviews: Review[]
  };