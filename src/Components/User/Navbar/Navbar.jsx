import React, { useState } from "react";
import { UserRound, Search, Heart, ShoppingCart, Menu, X, ShoppingCartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

//   for mobile size menu Open or Close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

// for Account or SignIn Navigate 
const redirectToAccountOrSignIn =()=>{
    navigate("/login")
}

  return (
    <>
    <div className="w-full h-auto md:h-24 flex justify-center items-end fixed z-50">
      <div className="bg-white w-full md:w-4/5 min-h-16 md:h-2/3 rounded-none md:rounded-full shadow-sm flex flex-col md:flex-row relative">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 left-4 md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div  className="absolute top-4 right-4 md:hidden" >
          <ShoppingCartIcon/>
        </div>

        {/* Nav Left */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex w-full md:w-1/3 h-full flex-col md:flex-row`}
        >
          <div className="flex flex-col md:flex-row w-full md:w-3/4 h-full items-center justify-center md:justify-between md:pl-10 space-y-4 md:space-y-0 py-4 md:py-0 sm:text-xs xl:text-base">

            <h4 className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer select-none">
              Shop
            </h4>
            <h4 className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer select-none ">
              Best Deals
            </h4>
            <h4 className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer  md:hidden lg:block select-none">
              Brands
            </h4>
          </div>
        </div>

        {/* Nav Centre */}
        <div className="w-full md:w-1/3 h-16 md:h-full flex md:items-end items-center justify-center order-first md:order-none">
          <img  className="w-32 md:w-52" src="./logo.png" alt="Logo" />
        </div>

        {/* Nav Right */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex w-full md:w-1/3 h-full items-center justify-center md:justify-end md:pe-10 pb-4 md:pb-0`}
        >
          <div className="flex w-full md:w-2/4 justify-center md:justify-between space-x-6 md:space-x-4">
            <Search className="cursor-pointer hover:text-gray-600" width={20} />
            <Heart className="cursor-pointer hover:text-gray-600" width={20} />
            <ShoppingCart
              className="cursor-pointer hover:text-gray-600 hidden md:block"
              width={20}
            />
            {/* User login or Account */}
            <UserRound
              className="cursor-pointer hover:text-gray-600"
              width={20}
              onClick={redirectToAccountOrSignIn}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="w-full sm:h-36 h-20 "></div>
    </>
  );
};

export default Navbar;
