import React, { useEffect, useState } from "react";
import { Star, ThumbsUp, Filter } from "lucide-react";
import { getAllReviews } from "../../../Services/api/orders";
import { toast } from "react-toastify";

const CustomerReviews = ({ id, averageRating }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await getAllReviews(id);
      if (response.status === 200) {
        setReviews(response.data.reviews);
        console.log(response);

        return;
      }
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    };
    fetchReview();
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 fill-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <h2 className="text-2xl xl:text-3xl text-center mb-9 xl:mb-28 font-bold">
        Customer Reviews
      </h2>
      <div className="max-w-4xl mx-auto   px-10 xl:px-0 ">
        <div className="flex  justify-center mb-8">
          {/* Overall Rating Summary */}
          <div className="text-center md:text-left">
            <div className="text-5xl text-center font-bold mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center  mb-2">
              {renderStars(averageRating)}
            </div>
            <div className="text-sm text-gray-600">
              Based on {reviews.length} reviews
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-8 grid grid-cols-2 gap-7">
          {reviews.map((review) => (
            <div key={review._id} className="border pb-8 p-7 shadow-md hover:scale-105 items-start justify-center flex flex-col  transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">
                      {review.userId.username}
                    </span>
                  </div>
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerReviews;
