const Varients = () => {
  return (
    <>
      <div>
        <p className="font-medium py-4 ">SELECT VARIENT</p>
        <div className="flex gap-2">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="variant"
              value="variant1"
              className="hidden peer"
            />
            <div className="w-16 h-10 flex items-center justify-center rounded-lg border-2 peer-checked:text-white border-orange-950 peer-checked:border-orange-950 peer-checked:bg-orange-950 transition">
              <span className="text-sm font-medium font-serif transition ">
                390 g
              </span>
            </div>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="variant"
              value="variant1"
              className="hidden peer"
            />
            <div className="w-16 h-10 flex items-center justify-center rounded-lg border-2 peer-checked:text-white border-orange-950 peer-checked:border-orange-950 peer-checked:bg-orange-950 transition">
              <span className="text-sm font-medium font-serif transition ">
                390 g
              </span>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Varients;
