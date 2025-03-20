

const CancelReturnModal = ({ title, selectedRequest, handleRejectAndApprove ,handleReject}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold pb-5">{title}</h2>

        <p className="pb-2 font-medium text-sm md:text-base">
          <span className="text-gray-600">Order ID:</span>{" "}
          <span className="break-all">
            {selectedRequest?.orderId?.uniqueOrderId || "N/A"}
          </span>
        </p>

        <p className="pb-2 text-sm md:text-base">
          <span className="text-gray-600">Reason:</span>{" "}
          {selectedRequest?.reason || "N/A"}
        </p>

        <p className="pb-2 text-sm md:text-base">
          <span className="text-gray-600">Explanation:</span>{" "}
          {selectedRequest?.explanation || "N/A"}
        </p>

        <p className="pb-2 text-sm md:text-base">
          <span className="text-gray-600">Date:</span>{" "}
          {selectedRequest?.createdAt
            ? selectedRequest.createdAt.split("T")[0]
            : "N/A"}
        </p>

        <p className="pb-2 text-sm md:text-base">
          <span className="text-gray-600">Product:</span>{" "}
          {selectedRequest?.orderItem?.name || "N/A"}
        </p>

        <p className="pb-2 text-sm md:text-base">
          <span className="text-gray-600">Quantity:</span>{" "}
          {selectedRequest?.orderItem?.quantity || "N/A"}
        </p>

        <p className="pb-2 text-sm md:text-base">
          <span className="text-gray-600">Price:</span>{" "}
          {selectedRequest?.orderItem?.variant?.price
            ? `₹${
                selectedRequest.orderItem.variant.price *
                selectedRequest.orderItem.quantity
              }`
            : "N/A"}
        </p>

        <p className="font-medium text-sm md:text-base">
          <span className="text-gray-600">Customer Name:</span>{" "}
          {selectedRequest?.orderId?.shippingAddress?.name || "N/A"}
        </p>

        <p className="pb-2 font-medium text-sm md:text-base">
          <span className="text-gray-600">Shipping Address:</span>{" "}
          <span className="break-words">
            {selectedRequest?.orderId?.shippingAddress?.detailed_address ||
              "N/A"}
          </span>
        </p>

        <p className="font-medium text-sm md:text-base">
          <span className="text-gray-600">Status:</span>{" "}
          {selectedRequest?.orderItem?.status || "N/A"}
        </p>

        <p className="font-medium text-sm md:text-base">
          <span className="text-gray-600">Payment Method:</span>{" "}
          {selectedRequest?.orderId?.paymentMethod || "N/A"}
        </p>
        <div className="flex space-x-3 mt-7 justify-end">
          <button
            className=" bg-black text-white px-4 py-2 rounded"
            onClick={handleReject}
          >
            Reject
          </button>
          <button
            className=" bg-black text-white px-4 py-2 rounded"
            onClick={() => handleRejectAndApprove("approved",selectedRequest._id,`Approved ${title === "Cancel Request" ? "Cancel":"Return"} Request`)}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelReturnModal;
