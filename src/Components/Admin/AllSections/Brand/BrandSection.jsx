import { useEffect, useState } from "react";
import { Search, MoreVertical, Crown, Trash, Trash2 } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import { CircularProgress, IconButton, Menu, MenuItem, Pagination, Switch } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

import { toast } from "react-toastify";
import Modal from "../../../HelperComponents/Modal";
import BrandAddEdit from "./AddEdit";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
} from "../../../../Services/api/brand.js";
import { baseUrl } from "../../../../Services/api/constants";
import DeleteDailog from "../../../HelperComponents/DeleteDailog";

const BrandSection = () => {
  const [brands, setBrands] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [brandName, setBrandName] = useState("");
  const [update, setUpadate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [pageCount,setPageCount] = useState(1);
  const [currentPage,setCurrentPage] = useState(1);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true)
      const response = await getAllBrands();
      if (response.status === 200) {
        setData(response.data.brands);
        setLoading(false)
      }
    };
    fetchBrand();
  }, [update]);

  useEffect(() => {
    const results = data.filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPageCount(Math.ceil(results.length / 4));
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    setBrands(results.slice(startIndex, endIndex));
  }, [searchTerm, data,currentPage]);

  const handlePageChange = (e,value) => {
    setCurrentPage(value);
  }

  const addBrand = async () => {
    if (!brandName.trim()) {
      toast.error("Please Enter Brand Name", {
        position: "top-center",
        style: { width: "100%" },
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }
    if (!image) {
      toast.error("Please Upload Brand Logo", {
        position: "top-center",
        style: { width: "100%" },
        theme: "dark",
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", brandName.trim());
    formData.append("image", image);
    setIsOpen(false);
    const response = await createBrand(formData);
    if (response.status === 200) {
      toast.success("Brand Created Successfully", {
        position: "top-center",
        style: { width: "100%" },
        theme: "dark",
        autoClose: 1000,
      });
      setUpadate(!update);
      onClose();
      return;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      style: { width: "100%" },
      theme: "dark",
      autoClose: 1000,
    });
  };

  const onClose = () => {
   
    setImage("");
    setBrandName("");
  };

  const openDeleteConfirmation = (brand) => {
    setSelectedBrand(brand);
    setIsOpenDelete(true);
  };
  const closeDeleteConfirmation = () => {
    setSelectedBrand(null);
    setIsOpenDelete(false);
  };

  const confirmDelete = async () => {
    closeDeleteConfirmation();
    const response = await deleteBrand(selectedBrand._id);
    if (response.status === 200) {
      
      toast.success(response.data.message, {
        position: "top-center",
        style: { width: "100%" },
        theme: "dark",
        autoClose: 1000,
      });
      setUpadate(!update);
      
      return;
    }
    closeDeleteConfirmation();
    toast.error(response.response.data.message, {
      position: "top-center",
      style: { width: "100%" },
      theme: "dark",
      autoClose: 1000,
    });
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
            title="Total Brands"
            value={data.length}
            icon={<Crown />}
          />
        </div>

        {/* Main Category List Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <h2 className="text-lg font-semibold">Brands</h2>
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  type="text"
                  placeholder="Search "
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>

              <button
                className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
                onClick={() => setIsOpen(true)}
              >
                <AddCircleOutline />
                <span>Add Brand</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    no.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    Brand name
                  </th>

                  <th className="px-6 py-3 relative">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {brands.length >0 ? brands.map((brand, index) => (
                  <tr key={brand._id} className="hover:bg-gray-50">
                    {/* numbrer */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{index + 1}</div>
                    </td>
                    {/* logo */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-14 h-14 flex">
                        <img
                          src={`${baseUrl}${brand.image}`}
                          alt="logo"
                          className="object-scale-down "
                        />
                      </div>
                    </td>
                    {/* Brand Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 uppercase">
                          {brand.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <div className="flex justify-end items-center">
                        <Trash2
                          className="hover:text-red-600  transition-colors duration-300"
                          size={20}
                          onClick={() => openDeleteConfirmation(brand)}
                        />
                      </div>
                    </td>
                  </tr>
                )): <td className="text-lg p-4 text-center w-full" colSpan={4}>No Brand Found !</td>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
       
          <div className="flex justify-center">
            <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
          </div>
       
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <BrandAddEdit
          brandName={brandName}
          setBrandName={setBrandName}
          create={addBrand}
          image={image}
          setImage={setImage}
          title={"Create New Brand"}
          onClose={onClose}
        />
      </Modal>
      <Modal isOpen={isOpenDelete} onClose={closeDeleteConfirmation}>
        <DeleteDailog
          title={"Delete Brand"}
          message={`Are you sure you want to delete "${selectedBrand?.name.toUpperCase()}" brand?`}
          cancel={closeDeleteConfirmation}
          confirm={confirmDelete}
        />
      </Modal>
    </>
  );
};

export default BrandSection;
