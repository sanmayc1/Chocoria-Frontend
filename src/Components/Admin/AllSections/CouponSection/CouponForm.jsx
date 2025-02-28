import { Button } from "@mui/material";
import SingleInputField from "../../../HelperComponents/SingleInputField";

const CouponAddEditForm = ({ couponData, setCouponData, btnName,handleSubmit,title }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "couponCode") {
      setCouponData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
      return;
    } else {
      setCouponData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  return (
    <div>
      <h1 className="font-semibold text-xl text-center pb-5 ">{title}</h1>
      <div className="flex flex-col justify-center space-y-3 ">
        <div className="flex gap-4 ">
          <label
            htmlFor="couponTitle"
            className="text-sm  flex flex-col gap-1 w-1/2 "
          >
            Coupon Title
            <SingleInputField
              placeholder={"Coupon Title"}
              name={"couponTitle"}
              value={couponData.couponTitle}
              handleChange={handleChange}
            />
          </label>
          <label
            htmlFor="CouponCode"
            className="text-sm   flex flex-col gap-1 w-1/2 "
          >
            Coupon Code
            <SingleInputField
              placeholder={"Coupon Code"}
              filedType="text"
              name={"couponCode"}
              value={couponData.couponCode}
              handleChange={handleChange}
            />
          </label>
        </div>

        {/* coupon code & expiry date */}
        <div className="flex gap-4 ">
          <label
            htmlFor="limit"
            className="text-sm  flex flex-col gap-1 w-1/2 "
          >
            Coupon Limit
            <SingleInputField
              placeholder={"Coupon Limit"}
              filedType="number"
              name={"limit"}
              value={couponData.limit}
              handleChange={handleChange}
            />
          </label>
          <label
            htmlFor="expiryDate"
            className="text-sm   flex flex-col gap-1 w-1/2 "
          >
            Expiry Date
            <input
              type="date"
              className="w-full p-3 text-xs rounded-md border border-gray-200 bg-gray-200"
              min={new Date().toISOString().split("T")[0]}
              name="expiryDate"
              value={couponData.expiryDate}
              onChange={handleChange}
            />
          </label>
        </div>
        {/* Coupon type & discount value */}
        <div className="flex gap-4 ">
          <label
            htmlFor="couponType"
            className="text-sm flex flex-col gap-1 w-1/2 "
          >
            Coupon Type
            <select
              name="couponType"
              className="w-full p-3  rounded-md border border-gray-200 bg-gray-200"
              value={couponData.couponType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
          </label>
          <label
            htmlFor="discountValue"
            className="text-sm   flex flex-col gap-1 w-1/2 "
          >
            Discount Value
            <SingleInputField
              placeholder={"Discount Value"}
              filedType="number"
              name="discountValue"
              value={couponData.discountValue}
              handleChange={handleChange}
            />
          </label>
        </div>
        {/* Minimum purchase amount  */}
        <div className="flex gap-4 ">
          <label
            htmlFor="minimumPurchaseAmount"
            className="text-sm flex flex-col gap-1 w-1/2 "
          >
            Minimum Purchase Amount
            <SingleInputField
              placeholder={"Min Purchase Amount"}
              filedType="number"
              name="minimumPurchaseAmount"
              value={couponData.minimumPurchaseAmount}
              handleChange={handleChange}
            />
          </label>
          <label
            htmlFor="discountValue"
            className="text-sm   flex flex-col gap-1 w-1/2 "
          >
            Maximum Discount Value
            <SingleInputField
              placeholder={"Maximum Discount"}
              filedType="number"
              name="maximumDiscount"
              value={couponData.maximumDiscount}
              handleChange={handleChange}
            />
          </label>
        </div>
        <label htmlFor="description" className="text-sm  flex  flex-col gap-1 ">
          Description
          <textarea
            className="w-full h-18 p-3  rounded-md border border-gray-300 bg-gray-200 mb-5"
            placeholder="Coupon Description"
            name="description"
            value={couponData.description}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
      <Button
        size="medium"
        className=" w-full"
        style={{ backgroundColor: "black", color: "white" }}
        onClick={handleSubmit}
      >
        {btnName}
      </Button>
    </div>
  );
};

export default CouponAddEditForm;
