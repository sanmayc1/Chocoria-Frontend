import { useEffect, useState } from "react";
import { Search,MoreVertical, FolderTree } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import { IconButton, Menu, MenuItem, Pagination, Switch } from "@mui/material";
import { AddCircleOutline  } from "@mui/icons-material";
import Modal from "../../../HelperComponents/Modal.jsx";
import CategoryAddEditForm from "./AddEditModal/AddEditModal.jsx";
import {
  addCategory,
  deleteCategory,
  editCategories,
  getCategories,
  categoryDisable,
} from "../../../../Services/api/category.js";
import { toast } from "react-toastify";

const CategorySection = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState(true);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();

      if (response.status === 200) {
        setData(response.data.categories);
        return;
      }
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
    }
    fetchCategories();
  }, [update]);

  useEffect(() => {
    const results = data.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPageCount(Math.ceil(results.length / 4));
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;
    setCategories(results.slice(startIndex, endIndex));
  }, [searchTerm, data, currentPage]);

  //add  modal close
  const modalClose = () => {
    setIsOpen(false);
    setName("");
  };

  // edit modal close
  const editModalClose = () => {
    setEditIsOpen(false);
    setName("");
  };
  //
  const handleChange = (e) => {
    setName(e.target.value);
  };
  // edit modal open
  const OpenEditModal = () => {
    setAnchorEl(null);
    if (selectedCategory) {
      setName(selectedCategory.name);
    }
    setEditIsOpen(true);
  };
  // add new category
  const categoryAdd = async () => {
    const response = await addCategory({ name: name.trim() });

    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      setIsOpen(false);
      setName("");
      setUpdate(!update);
      return null;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1000,
    });
  };
  // edit category

  const editCategory = async () => {
    const response = await editCategories({ id: selectedCategory._id, name });

    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      editModalClose();
      setUpdate(!update);
      return null;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  // delete category

  const deleteUser = async () => {
    setAnchorEl(null);
    const response = await deleteCategory(selectedCategory._id);

    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      setUpdate(!update);

      return null;
    }

    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      style: { width: "100%" },
    });
  };

  // disable category
  const disableCategory = async(e,id)=>{
    const response =  await categoryDisable(id)
   
       if(response.status === 200){
         setUpdate(!update)
         toast.success(response.data.message, {
           position: "top-center",
           autoClose: 1000,
         });
       }else{
         toast.error(response.response.data.message, {
           position: "top-center",
           autoClose: 2000,
         });
       }
    
  }

  // edit or delete menu
  const handleMenu = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  // edit or delete menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickStatCard
            title="Total Category"
            value={data.length}
            icon={<FolderTree />}
          />
        </div>

        {/* Main Category List Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <h2 className="text-lg font-semibold">Category</h2>
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder="Search Category"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>

              <button
                className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
                onClick={() => setIsOpen(true)}
              >
                <AddCircleOutline />
                <span>Add Category</span>
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
                    Category name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    disable
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    Status
                  </th>
                  <th className="px-6 py-3 relative">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category,index) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    {/* numbrer */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{index+1}</div>
                    </td>
                    {/* Category Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                      </div>
                    </td>
                    {/* disable button  */}
                    <td className="pl-4">
                      <Switch
                        color="error"
                         checked={category.is_deleted}
                         onChange={(e)=>disableCategory(e,category._id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.is_deleted === false
                            ? "bg-green-100 text-green-800"
                            : category.is_deleted === true
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {category.is_deleted ? "Disabled" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        aria-controls="menu-appbar"
                        onClick={(e) => handleMenu(e, category)}
                        color="inherit"
                      >
                        <MoreVertical size={20} />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
              
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={deleteUser}>Delete</MenuItem>
                        <MenuItem onClick={OpenEditModal}>Edit</MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
       
          <div className="flex justify-center">
            <Pagination count={pageCount} page={currentPage} onChange={(e,page)=>setCurrentPage(page) } />
          </div>
      
      </div>
      <Modal
        isOpen={isOpen}
        children={
          <CategoryAddEditForm
            onClose={modalClose}
            addOrUpdate={categoryAdd}
            value={name}
            title={"Add Category"}
            handleChange={handleChange}
          />
        }
        onClose={modalClose}
      />
      <Modal
        isOpen={editIsOpen}
        children={
          <CategoryAddEditForm
            onClose={editModalClose}
            addOrUpdate={editCategory}
            value={name}
            title={"Edit Category"}
            handleChange={handleChange}
          />
        }
        onClose={editModalClose}
      />
    </>
  );
};

export default CategorySection;
