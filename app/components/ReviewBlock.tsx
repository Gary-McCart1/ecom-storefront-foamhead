"use client";
import React, { useState } from "react";
import { Product } from "../types/product";
import Stars from "./Stars";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { BsSendCheck } from "react-icons/bs";
import RatingByReview from "./RatingByReview";
import ReviewList from "./ReviewList";


interface Props {
  product: Product;
}

const ReviewBlock = ({ product }: Props) => {
  const [toggleReview, setToggleReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const submitReview = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to add this review?"
    );
    if (!confirmed) return;
    const roundedRating = Math.round(reviewRating)
    const newPost = {
      product: product.id,
      rating: roundedRating,
      review: reviewText,
    }
    try{
      console.log("Review Payload:", newPost);
      const res = await fetch("https://foamhead-a8f24bda0c5b.herokuapp.com/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        setToggleReview(false);
      } else {
        console.error("Failed to add review");
      }
    }catch(error){
      console.log(error)
    }
  };

  const deleteReview = () => {
    setReviewText("");
    setToggleReview(false);
  };

  return (
    <div className="w-full sm:mx-5">
      <div className="flex xs:flex-col justify-between items-center w-full flex-wrap">
        <h3 className="font-black text-3xl w-full sm:w-1/2">Reviews</h3>
        <div className="flex items-center text-lg sm:text-xl font-semi-bold w-full sm:w-1/2">
          <Stars num={String(product.rating)} />
          <p className="pl-2">
            {product.rating % 1 === 0 ? product.rating + ".0" : product.rating}{" "}
            / 5.0{" "}
          </p>
        </div>
      </div>
      <div className="w-full">
        <RatingByReview product={product} />
      </div>
      <div className="flex flex-col items-center my-10 w-full">
        {toggleReview && (
          <div className="flex justify-center w-full">
            <form className="w-1/2 flex flex-col items-between">
              <div className="flex items-center justify-between my-5">
                <label className="text-3xl font-black">Rating</label>
                <div className="flex items-center w-1/2">
                  <input
                    autoFocus
                    className="border rounded-lg pl-2 pb-1 w-1/6"
                    type="text"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                  />
                  <div className="flex">
                    <Stars num={String(reviewRating)} />
                  </div>
                </div>
              </div>
              <textarea
                onChange={(e) => setReviewText(e.target.value)}
                value={reviewText}
                autoFocus
                className="rounded-lg flex justify-center w-full h-40 border-1 p-1"
              />
            </form>
          </div>
        )}
        {!toggleReview ? (
          <button
            onClick={() => setToggleReview(true)}
            className="border py-3 px-6 rounded-lg font-bold flex items-center justify-around hover:bg-[#659f9c] hover:text-white mt-5 hover:cursor-pointer"
          >
            <span className="pr-3">
              <FaPlus />
            </span>
            Add A Review
          </button>
        ) : (
          <div className="flex items-center gap-4 p-4 rounded">
            <button
              onClick={submitReview}
              className="border py-3 px-6 rounded-lg font-bold flex items-center justify-center hover:bg-[#659f9c] hover:text-white hover:cursor-pointer"
            >
              <span className="pr-3">
                <BsSendCheck />
              </span>
              Submit Review
            </button>
            <div
              className="text-3xl text-gray-600 hover:text-[#d95f44] hover:cursor-pointer"
              onClick={deleteReview}
            >
              <FaXmark />
            </div>
          </div>
        )}
      </div>
      <div>
        <ReviewList product={product} />
      </div>
    </div>
  );
};

export default ReviewBlock;
