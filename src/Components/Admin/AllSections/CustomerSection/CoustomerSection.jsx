import { useEffect, useState } from "react";
import { Search, Filter, Users, RefreshCwIcon, Trash2 } from "lucide-react";
import QuickStatCard from "../../HelperComponents/QuickCard";
import { CircularProgress, Pagination, Switch } from "@mui/material";
import {
  blockUser,
  deleteUser,
  fetchUsers,
} from "../../../../Services/api/adminApi.js";
import { toast } from "react-toastify";

const CustomerSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [update, setUpdate] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchUsers()
      .then((res) => {
        
        setData(res.data.users);
        setLoading(false)
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setLoading(false)
      });
  }, [update]);

  useEffect(() => {
    const results = data.filter(
      (customer) =>
        (selectedFilter === "all"
          ? true
          : selectedFilter === "active"
          ? customer.is_Blocked === false
          : customer.is_Blocked === true) &&
        (customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setPageCount(Math.ceil(results.length / 5));
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    setCustomers(results.slice(startIndex, endIndex));
  }, [searchTerm, data, selectedFilter, currentPage]);

  //  handle block
  const handleBlock = async (e, id) => {
    const response = await blockUser(id);

    if (response.status === 200) {
      setUpdate(!update);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // delete the user
  const deleteUserData = async (id) => {
    const response = await deleteUser(id);
    if (response.status === 200) {
      setUpdate(!update);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
    } else {
      toast.error(response.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <CircularProgress color="inherit" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard
          title="Total Customers"
          value={data.length}
          icon={<Users />}
        />
        <QuickStatCard
          title="Active Customers"
          value={
            customers.filter((customer) => customer.is_Blocked !== true).length
          }
        />
        {/* <QuickStatCard title="New This Month" value="1" /> */}
      </div>

      {/* Main Customer List Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-start gap-4">
            <h2 className="text-lg font-semibold">Customers</h2>
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
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 ">
                <Filter size={16} />
                <span>Filter</span>
              </div>
              <select
                className="px-4 py-2 border rounded-lg bg-white"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div
              className="px-4 py-2 border rounded-lg bg-white flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setUpdate(!update)}
            >
              <RefreshCwIcon size={16} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Block
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Last Login
                </th>
                <th className="px-6 py-3 relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {customer.username.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {customer.phone}
                      </div>
                    </td>

                    <td className="pl-4">
                      <Switch
                        color="error"
                        checked={customer.is_Blocked}
                        onChange={(e) => handleBlock(e, customer._id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          customer.is_Blocked === false
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.is_Blocked === false ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-900">
                        {customer.last_login ? customer.last_login : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Trash2
                        size={20}
                        className="text-red-600"
                        onClick={() => deleteUserData(customer._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <td className="text-lg p-4 text-center w-full" colSpan={5}>
                  No Customer Found !
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CustomerSection;
