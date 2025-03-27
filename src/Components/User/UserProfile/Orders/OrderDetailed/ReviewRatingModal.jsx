import { Button } from "@mui/material";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { orderReview } from "../../../../../Services/api/orders";

const ReviewRatingModal = ({onClose,userId,productId,orderItemId,setUpdate}) => {
  const [rating, setRating] = useState(0);
  const [review ,setReview] = useState("")
  
  const handleSumbit = async ()=>{
    if(!rating ){
        toast.error("Please Give Rating",{
          position:"top-center",
          autoClose:1000,
          theme:"dark"
        })
        return
    }
    if(!review.trim()){
      toast.error("Please Write Review",{
        position:"top-center",
        autoClose:1000,
        theme:"dark"
      })
      return
    }
    const response = await orderReview({productId,userId,review,rating,orderItemId})
    if(response.status === 200){
      toast.success(response.data.message,{
        position:"top-center",
        autoClose:1000,
        theme:"dark"
      })
      onClose()
      setUpdate((prev)=>!prev)
      return
    }
    toast.error(response.response.data.message,{
      position:"top-center",
      autoClose:1000,
      theme:"dark"
    })

  }

  return (
    <div>
      <h1 className="font-bold text-xl text-center">Review & Rating</h1>
      <div className="flex p-6 gap-3 justify-center">
        {[1, 2, 3, 4, 5].map((star, index) => {
          return (
            <Star
              key={index}
              size={27}
              onClick={() => setRating(star)}
              className={`hover:scale-110 cursor-pointer hover:-translate-y-2  hover:text-yellow-600 transition-all duration-300 ${
                star <= rating ? "fill-yellow-300 text-yellow-300  " : ""
              }  `}
            />
          );
        })}
      </div>
      <textarea
        name="review"
        value={review}
        onChange={(e)=>setReview(e.target.value)}
        className="border border-black rounded-md w-full h-32 p-2 mb-4"
        placeholder="Write Review"
      ></textarea>
      <button className="bg-black text-white w-full h-12 rounded-xl" onClick={handleSumbit}>
        Submit
      </button>
    </div>
  );
};

export default ReviewRatingModal;
