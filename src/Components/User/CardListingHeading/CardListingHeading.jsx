import {ChevronRight } from "lucide-react";
const CardListingHeading=({heading})=>{
    return (
        <div>
        <div className="sm:px-16 lg:px-21 xl:px-24 sm:pt-12 md:pt-6 px-5 pt-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-xl md:text-2xl xl:text-3xl font-bold">
            {heading}
          </h2>
        
        </div>
      </div>
    )
}
export default CardListingHeading
