import { Button } from "@mui/material";

const OrderCancelRequest = ({ cancel, confirm }) => {
  return (
    <div className="px-">
      <h1 className="text- font-semibold"> Cancel Request </h1>
      <p className=" text-gray-500 text-sm py-2">
        Please select a reason for canceling the order
      </p>
      <select
        name="reason"
        id=""
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="Product not available">Product not available</option>
        <option value="Product quality not good">
          Product quality not good
        </option>
        <option value="Wrong product ordered">Wrong product ordered</option>
        <option value="Other">Other</option>
      </select>
      <p className=" text-gray-500 text-sm py-3">
        Write a brief reason for cancelling the order
      </p>
      <textarea
        className="w-full  border border-gray-300 rounded "
        rows="5"
      ></textarea>
      <div className="flex justify-end pt-2">
        <Button size="small" onClick={cancel}>
          cancel
        </Button>
        <Button size="small" onClick={confirm}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OrderCancelRequest;
