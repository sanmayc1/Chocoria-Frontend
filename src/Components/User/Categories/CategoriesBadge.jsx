import { useNavigate } from "react-router-dom";


const CategoriesBadge = ({ name, id }) => {
    const navigate = useNavigate()
  return (
    <>
      <div className=" flex justify-center items-center border border-yellow-600 h-8 sm:h-10 w-28 sm:w-[15%] rounded-full hover:scale-105 transition-all duration-300 hover:bg-amber-900 hover:text-white " onClick={()=>navigate(`/shop?category=${id}`)} >
        {name}
      </div>
    </>
  );
};

export default CategoriesBadge;
