import React, { useState } from "react";
import { Star, ThumbsUp, Filter } from "lucide-react";
import CardListingHeading from "../CardListingHeading/CardListingHeading";

const CustomerReviews = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  // Sample data - in a real app this would come from props or API
  const reviewData = {
    averageRating: 4.5,
    totalReviews: 128,
    ratingDistribution: {
      5: 75,
      4: 32,
      3: 12,
      2: 6,
      1: 3,
    },
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        rating: 5,
        date: "2025-01-15",
        title: "Excellent product!",
        content:
          "This exceeded my expectations in every way. The quality is outstanding and it works perfectly.",
        helpful: 24,
        verified: true,
      },
      {
        id: 2,
        author: "Michael Chen",
        rating: 4,
        date: "2025-01-10",
        title: "Good but room for improvement",
        content:
          "Overall satisfied with the purchase. There are a few minor issues but nothing dealbreaking.",
        helpful: 12,
        verified: true,
      },
    ],
  };

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

  const calculatePercentage = (count) => {
    return Math.round((count / reviewData.totalReviews) * 100);
  };

  return (
    <>
      
      <h2 className="text-2xl xl:text-3xl text-center mb-9 xl:mb-40 font-bold">Customer Reviews</h2>
      <div className="max-w-4xl mx-auto  px-10 xl:px-0 ">
      
        <div className="flex items-center justify-between mb-8">
          {/* <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <select 
            className="border rounded-md px-3 py-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Overall Rating Summary */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold mb-2">
              {reviewData.averageRating}
            </div>
            <div className="flex justify-center md:justify-start mb-2">
              {renderStars(reviewData.averageRating)}
            </div>
            <div className="text-sm text-gray-600">
              Based on {reviewData.totalReviews} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="col-span-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() =>
                  setSelectedRating(rating === selectedRating ? 0 : rating)
                }
                className="w-full flex items-center space-x-2 mb-2 hover:bg-gray-50 p-1 rounded"
              >
                <span className="w-8 text-sm text-gray-600">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{
                      width: `${calculatePercentage(
                        reviewData.ratingDistribution[rating]
                      )}%`,
                    }}
                  />
                </div>
                <span className="w-12 text-sm text-gray-600">
                  {calculatePercentage(reviewData.ratingDistribution[rating])}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-8">
          {reviewData.reviews.map((review) => (
            <div key={review.id} className="border-b pb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{review.author}</span>
                    {review.verified && (
                      <span className="text-sm text-green-600">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-600">{review.date}</span>
              </div>

              <h3 className="font-medium mb-2">{review.title}</h3>
              <p className="text-gray-600 mb-4">{review.content}</p>

              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerReviews;
