import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderCancelRequest = ({ cancel, confirm }) => {
  const [reason, setReason] = useState({ reason: "", explanation: "" });
  const handleChange = (e) => {
    setReason({ ...reason, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!reason.reason) {
      toast.error("Please select a reason", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }
    if (reason.explanation.trim().length < 10) {
      toast.error("Explanation must be at least 10 characters long", {
        position: "top-center",
        autoClose: 1000,
        style: { width: "100%" },
      });
      return;
    }
    await confirm(reason);
  };
  return (
    <div className="px-">
      <h1 className="text- font-semibold"> Cancel Request </h1>
      <p className=" text-gray-500 text-sm py-2">
        Please select a reason for canceling the order
      </p>
      <select
        name="reason"
        value={reason.reason}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select reason</option>
        <option value="Ordered by Mistake">Ordered by Mistake</option>
        <option value="Found a Better Price Elsewhere">
          Found a Better Price Elsewhere
        </option>
        <option value="Change of Mind">Change of Mind</option>
        <option value="Other">Other</option>
      </select>
      <p className=" text-gray-500 text-sm py-3">
        Write a brief reason for cancelling the order
      </p>
      <textarea
        name="explanation"
        value={reason.explanation}
        onChange={handleChange}
        className="w-full  border border-gray-300 rounded "
        rows="5"
      ></textarea>
      <div className="flex justify-end pt-2">
        <Button size="small" onClick={cancel}>
          cancel
        </Button>
        <Button size="small" onClick={handleSubmit} type="button">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OrderCancelRequest;
