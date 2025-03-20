


const CancelReturnReason = ({ reason, title }) => {
  return (
    <div className="px-7 p-4">
      <h1 className="font-medium text-sm sm:text-lg pb-1 w-full ">
        {title}
      </h1>
      <p className="text-sm font-medium">Reason : {reason?.reason}</p>

      <p className="text-sm font-medium ">
        Status :{" "}
        <span
          className={`font-bold uppercase ${
            reason?.status === "pending"
              ? "text-orange-500"
              : reason.status === "approved"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {reason?.status}
        </span>
      </p>

      <p className="text-sm font-medium">Details : {reason?.response}</p>
    </div>
  );
};

export default CancelReturnReason;
