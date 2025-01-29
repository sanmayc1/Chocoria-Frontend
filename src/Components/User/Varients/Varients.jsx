import { useEffect } from "react";

const Varients = ({ varients,setSelectedVariant,selectedVariant}) => {
  const handleChange = (variant)=>{ 
    setSelectedVariant(variant)
  }
  useEffect(()=>{
     setSelectedVariant(varients[0])
  },[varients])
  return (
    <>
      <div>
        <p className="font-medium py-4 ">SELECT VARIENT</p>
        <div className="flex gap-2">
          {varients.map((variant) => {
            return (
              <label key={variant?.id} className="cursor-pointer">
                <input
                checked={selectedVariant?.id === variant?.id}
                  type="radio"
                  name="variant"
                  value={variant.weight}
                  onChange={()=>handleChange(variant)}
                  className="hidden peer"
                />
                <div className="w-16 h-10 flex items-center justify-center rounded-lg border-2 peer-checked:text-white border-orange-950 peer-checked:border-orange-950 peer-checked:bg-orange-950 transition">
                  <span className="text-sm font-medium font-serif transition ">
                   {variant.weight}g
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Varients;
