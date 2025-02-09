import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        // Listen for popstate event to prevent going back
        const handleBeforeUnload = (e) => {
          e.preventDefault();
          e.returnValue = ''; // Show the browser's default prompt for leaving the page
        };
    
        // Prevent back navigation
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, '', window.location.href);
        };
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.onpopstate = null;
        };
      }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-sm w-full text-center">
        <div className="mb-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-6 w-6 text-green-500 animate-bounce" />
          </div>
        </div>
        
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Success!
        </h1>
        
        <p className="text-gray-600 ">
          Your order has been successfully placed
          
        </p>
        <p className="text-gray-600 mb-6">
          Order Id: {id}
          
        </p>
        
        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;