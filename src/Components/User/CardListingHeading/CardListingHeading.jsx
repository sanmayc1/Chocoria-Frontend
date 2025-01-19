import {ChevronRight } from "lucide-react";
const CardListingHeading=({heading,viewMore})=>{
    return (
        <div>
        <div className="sm:px-16 sm:pt-12 md:pt-6 px-5 pt-4 flex justify-between items-center">
          <h2 className="text-md sm:text-xl md:text-2xl xl:text-3xl font-bold">
            {heading}
          </h2>
          {viewMore&&<p className="flex text-sm items-center sm:text-md md:text-md xl:text-md gap-2 cursor-pointer text-gray-700 hover:text-black transition-colors"  >
            View More <ChevronRight className="h-4 md:h-5 xl:h-8"  />
          </p>}
        </div>
      </div>
    )
}
export default CardListingHeading
