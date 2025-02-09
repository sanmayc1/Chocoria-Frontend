const OrderProgressBar = ({ index, setIndex }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Progress Stepper */}
      <div className="relative w-full">
        {/* Container for circles and lines */}
        <div className="flex justify-between items-center relative">
          {/* Background line */}
          <div className="absolute h-1 w-full bg-gray-200 top-1/2 -translate-y-1/2" />

          {/* Progress line */}
          <div
            className={`absolute h-1 ${
              index === 4 ? "bg-red-600" : "bg-green-600"
            } top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out`}
            style={{
              width:
                index === 1
                  ? "0%"
                  : index === 2
                  ? "50%"
                  : "100%",
            }}
          />

          {/* Step circles */}
          <div className="relative flex justify-between w-full">
            {[1, 2, 3, 4].map((step) =>
              index === 4 ? (
                <div
                  key={step}
                  className={`w-4 h-4 md:w-5 md:h-5  rounded-full flex items-center justify-center z-10 transition-colors duration-300 cursor-pointer ${
                    step <= index ? "bg-red-600" : "bg-gray-200"
                  } ${
                    index === 4
                      ? step === 4
                        ? "block"
                        : step === 1
                        ? "block"
                        : "hidden"
                      : "hidden"
                  }`}
                ></div>
              ) : (
                <div
                  key={step}
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center z-10 transition-colors duration-300 cursor-pointer ${
                    step <= index ? "bg-green-600" : "bg-gray-200"
                  } ${step === 4 ? "hidden" : "block"}`}
                ></div>
              )
            )}
          </div>
        </div>

        {/* Step labels */}
        <div className="flex justify-between mt-2">
          {["Pending", "Shipped", "Delivered", "Cancelled"].map((label, i) => (
            <div
              key={label}
              className={`text-xs ${
                i + 1 <= index ? "text-green-900" : "text-gray-400"
              } ${
                index === 4
                  ? i + 1 === 4
                    ? "block"
                    : i + 1 === 1
                    ? "block"
                    : "hidden"
                  : i + 1 > 3 ? "hidden" : "block"
              } `}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProgressBar;
