import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({second,third}) => {
    const navigate = useNavigate()
    const navigateToHome =()=>{
        navigate('/')
    }
  return (
    <>
      <div className="xl:px-40 md:px-24 lg:px-28 px-4 pt-1">
        <h6 className="xl:text-base  text-sm  flex items-center select-none">
          <span className="cursor-pointer hover:font-medium " onClick={navigateToHome} >Home</span>
          <ChevronRight className="w-4 h-4 inline mx-1" />
          <span className="cursor-pointer hover:font-medium sm:block hidden"> {second}</span>
          <span className="cursor-pointer hover:font-medium sm:hidden block "> {second.length > 30 ? `${second.slice(0,30)}...`:second}</span>
          <ChevronRight className="w-4 h-4 inline mx-1" />
          <span className="cursor-pointer hover:font-medium ">
           {third}
          </span>
        </h6>
      </div>
    </>
  );
};

export default Breadcrumbs