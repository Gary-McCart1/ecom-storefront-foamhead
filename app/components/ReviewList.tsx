"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import { Review } from "../types/review";
import Stars from "./Stars";

interface Props {
  product: Product;
}

const ReviewList = ({ product }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://foamhead-a8f24bda0c5b.herokuapp.com/api/reviews/${product.id}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [product.id]);
  return (
    <div>
      {reviews.map((review, index) => (
        <div className="" key={index}>
          <div className="flex my-3 items-center justify-start">
            <Stars num={String(review.rating)} />
            <p className="ml-2">{review.rating} / 5</p>
          </div>
          <div className="flex text-start">{review.review}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
