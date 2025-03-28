import { useState } from "react";
import CouponAddEditForm from "./CouponForm.jsx";
import { toast } from "react-toastify";
import { addCoupon } from "../../../../Services/api/coupon.js";

const AddCoupon = ({onClose,setUpdate}) => {
    const [couponData, setCouponData] = useState({
        couponTitle: "",
        couponCode: "",
        limit: "",
        expiryDate: "",
        couponType: "",
        discountValue: "",
        minimumPurchaseAmount: "",
        maximumDiscount: "",
        description: "",
    })

    const handleSubmit = async() => {
       for(const key in couponData){
        if(!couponData[key].trim()){
            toast.error("Please fill all the fields",{
                position: "top-center",
                theme: "dark",
                autoClose: 1000
            });
            return;
        }
       }
       onClose();
       const response = await addCoupon(couponData);
       if(response.status === 200){
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 1000,
            theme: "dark",
        });
       setUpdate((prev) => !prev);
        return 
       }

       toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
       })
    
    };
    return (
        
            <CouponAddEditForm couponData={couponData} setCouponData={setCouponData} btnName="Add Coupon" title={"Add Coupon"} handleSubmit={handleSubmit} />
        
    );
};

export default AddCoupon;