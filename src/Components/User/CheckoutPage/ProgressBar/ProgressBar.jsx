


const ProgressBar = ({index,setIndex}) => {
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
              className={`absolute h-1 bg-orange-900 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out`}
              style={{
                width: index === 1 ? "0%" : index === 2 ? "50%" : "100%",
              }}
            />

            {/* Step circles */}
            <div className="relative flex justify-between w-full">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 cursor-pointer ${
                    step <= index ? "bg-orange-900" : "bg-gray-200"
                  }`}
                  onClick={() => setIndex(step<index?step:index)}
                >
                  <span
                    className={`text-sm md:text-base font-bold ${
                      step <= index ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step labels */}
          <div className="flex justify-between mt-2">
            {["Address", "Order Summary", "Payment"].map((label, i) => (
              <div
                key={label}
                className={`text-xs md:text-sm font-medium ${
                  i + 1 <= index ? "text-orange-900" : "text-gray-400"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default ProgressBar