import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Services/api/constants.js";

const BrandCard = ({ src,id }) => {
    const navigate = useNavigate()
  return (
    <>
      <div className="w-full max-w-[150px] sm:max-w-[200px]  h-auto  rounded-2xl overflow-hidden" onClick={()=>navigate(`/shop?brand=${id}`)}>
        <img
          src={baseUrl + src}
          alt="bradlogo"
          className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
        />
      </div>
    </>
  );
};

export default BrandCard;
