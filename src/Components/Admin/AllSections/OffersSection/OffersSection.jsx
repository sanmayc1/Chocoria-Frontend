import { useEffect, useState } from "react";
import { Button, Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../../../HelperComponents/Modal.jsx";
import OfferAddEditForm from "./OfferAddEdit.jsx";
import AddOffer from "./AddOffer.jsx";
import { getAllOffers } from "../../../../Services/api/offerApi.js";
import { baseUrl } from "../../../../Services/api/constants.js";
import { Trash2 } from "lucide-react";

const OffersSection = () => {
  const [update, setUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productsOffer, setProductsOffer] = useState([]);
  const [categoriesOffer, setCategoriesOffer] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await getAllOffers();
      if (response.status === 200) {
      const productsOfferData = response.data.productsOffers.filter((offer) => offer.specificProduct !== null);
      const categoriesOfferData = response.data.categoryOffers.filter((offer) => offer.specificProduct !== null);
        
        setProductsOffer(productsOfferData);
        setCategoriesOffer(categoriesOfferData);
      }
    };
    fetchOffers();
  }, [update]);

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex justify-end">
          <Button
            style={{ backgroundColor: "black", color: "white" }}
            onClick={() => setIsOpen(true)}
          >
            Add Offer
          </Button>
        </div>
        {/* Main Customer List Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <h2 className="text-lg font-semibold">Products Offers</h2>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Percentage
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Expire Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Maximum Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productsOffer.map((offer) => (
                  <tr
                    key={offer._id}
                    className="hover:bg-gray-50 "
                  >
                    <td className="px-6 py-4 ">
                      <img
                        src={`${baseUrl}${offer.specificProduct.images[0]}`}
                        alt=""
                        className="w-10 h-10"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {offer.specificProduct.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {offer.offerTitle}
                    </td>

                    <td className="pl-4">
                      <span className="px-2 text-sm">{offer.percentage}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        {offer.expiresAt.split("T")[0]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      ₹{offer.maximumDiscount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     <Trash2 size={16} color="red" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination count={1} />
        </div>
      </div>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Main Customer List Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <h2 className="text-lg font-semibold">Category Offers</h2>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    percentage
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    expires date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    maximum discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categoriesOffer.map((offer) => (
                  <tr
                    key={offer._id}
                    className="hover:bg-gray-50 "
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {offer.specificCategory.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      {offer.offerTitle}
                    </td>

                    <td className="pl-4">
                      <span className="px-2 text-sm">{offer.percentage}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     {offer.expiresAt.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900">₹{offer.maximumDiscount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     <Trash2 size={16} color="red" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center">
    
            <Pagination count={1} />
        
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddOffer onClose={() => setIsOpen(false)} setUpdate={setUpdate} />
      </Modal>
    </>
  );
};

export default OffersSection;
