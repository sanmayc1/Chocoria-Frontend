import { useEffect, useState } from "react";
import { Search, Layers, Trash } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import { CircularProgress, Pagination } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "../../../HelperComponents/Modal.jsx";
import AddCoupon from "./AddCoupon.jsx";
import {
  deleteCoupon,
  getAllCoupons,
} from "../../../../Services/api/coupon.js";
import DeleteDailog from "../../../HelperComponents/DeleteDailog.jsx";

const CouponSection = () => {
  const [update, setUpdate] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const response = await getAllCoupons();
      if (response.status === 200) {
        setData(response.data.coupons);
        setLoading(false)
        return;
      }
      setLoading(false)
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    };
    fetchOrders();
  }, [update]);

  useEffect(() => {
    const results = data.filter(
      (coupon) =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPageCount(Math.ceil(results.length / 5));
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    setCoupons(results.slice(startIndex, endIndex));
  }, [searchTerm, data,currentPage]);

  const openDeleteModal = (coupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedCoupon(null);
  };

  const handleDelete = async () => {
    closeDeleteModal();
    const response = await deleteCoupon(selectedCoupon._id);
    if (response.status === 200) {
      setUpdate(!update);
      
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }
  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStatCard
            title="Total Coupons"
            value={coupons.length}
            icon={<Layers />}
          />
          {/* <QuickStatCard title="New This Month" value="1" /> */}
        </div>
        <div className="bg-white rounded-lg shadow"></div>

        {/* Main Customer List Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <h2 className="text-lg font-semibold">Coupons</h2>
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Coupons"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>

              <div
                className="px-4 py-2 border rounded-lg bg-black text-white  hover:bg-gray-800  transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                Add Coupon
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Coupon Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Usage Limit
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Discount Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Minimum Purchase amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coupons.length > 0 ? coupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm  text-gray-900">
                        {coupon.code}
                      </div>
                      <div className="text-sm text-gray-500"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900 uppercase">
                        {coupon.type}
                      </div>
                    </td>

                    <td className="px-6 py-3">
                      <span className="px-2 text-sm">{coupon.usageLimit}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <span
                        className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                      >
                        {coupon.value}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell  justify-center">
                      <div className="text-sm text-gray-900 ">
                        ₹{coupon.minPurchaseAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {coupon.expiresAt.split("T")[0] >=
                      new Date().toISOString().split("T")[0] ? (
                        <span
                          className={`px-2 inline-flex text-sm leading-5 rounded-full`}
                        >
                          {coupon.expiresAt.split("T")[0]}
                        </span>
                      ) : (
                        <span className="text-red-500">Expired</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <Trash
                        size={14}
                        color="red"
                        className="cursor-pointer"
                        onClick={() => openDeleteModal(coupon)}
                      />
                    </td>
                  </tr>
                )): <td className="text-lg p-4 text-center w-full" colSpan={6}>No Coupon Found !</td>}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddCoupon onClose={() => setIsOpen(false)} setUpdate={setUpdate} />
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DeleteDailog
          title={"Delete Coupon"}
          message={`Are you sure you want to delete this "${selectedCoupon?.code}" coupon?`}
          cancel={closeDeleteModal}
          confirm={handleDelete}
        />
      </Modal>
    </>
  );
};

export default CouponSection;
