"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import { Review } from "../types/review";

interface Props {
  product: Product;
}

const calculateDistribution = (reviews: Review[]) => {
  // Initialize an object to store the count for each rating (1-5)
  const distribution: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };

  // Loop through all the reviews and increment the count for the corresponding rating
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[review.rating] += 1;
    }
  });

  return distribution;
};

const RatingByReview = ({ product }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [distribution, setDistribution] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://foamhead-a8f24bda0c5b.herokuapp.com/api/reviews/${product.id}`
        );
        const data = await response.json();
        setReviews(data);
        const dist = calculateDistribution(data);
        setDistribution(dist);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [product.id]);

  // Calculate the total number of reviews for percentage calculation
  const totalReviews = reviews.length;

  const calculatePercentage = (rating: number) => {
    if (totalReviews === 0) return 0; // Avoid division by zero
    return (distribution[rating] / totalReviews) * 100;
  };

  return (
    <div className="mt-5 h-50 flex flex-col justify-between">
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="flex items-center justify-between" key={rating}>
          <p>{rating} stars</p>
          <div className="w-6/10 h-4 bg-gray-200 rounded-lg overflow-hidden">
            <div
              className="h-full bg-[#e89160] transition-all duration-300"
              style={{ width: `${calculatePercentage(rating)}%` }}
            ></div>
          </div>
          <div>{Math.round(calculatePercentage(rating))}%</div>
        </div>
      ))}
    </div>
  );
};

export default RatingByReview;
