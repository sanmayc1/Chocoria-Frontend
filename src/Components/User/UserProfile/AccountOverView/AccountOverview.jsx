import React, { useEffect, useState } from "react";
import { getUser } from "../../../../Services/api/api.js";
import { toast } from "react-toastify";
import yupSchema from "../../../../utils/yupSchema.jsx";
import { forgetUserPassword, updateUserProfile } from "../../../../Services/api/userApi.js";
import { CircularProgress } from "@mui/material";

const AccountOverview = () => {
  const [user, setUser] = useState({});
  const [updateBtn, setUpdateBtn] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const response = await getUser();
      if (response.status === 200) {
        setUser(response.data.user);      
        setIsLoading(false)
        return;
      }
      setIsLoading(false)
      toast.error(response.response.data.message);
    };
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchUser();
  }, []);
  // handlechange
  const handlechange = (e) => {
    setUpdateBtn(true);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // handle update
  const handleUpdate = async () => {
    try {
      const promise = [
        yupSchema.validateAt("username", user),
        yupSchema.validateAt("phone", user),
      ];
      await Promise.all(promise);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    setIsLoading(true)
    const response = await updateUserProfile(user);
    if (response.status === 200) {
      setIsLoading(false)
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
      });
      setUpdateBtn(false);
      return;
    }
    setIsLoading(false)
    toast.error(response.response.data.message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const resetPassword = async () => {
    setIsLoading(true)
    const response = await forgetUserPassword({ email: user.email });
    if (response.status !== 200) {
      toast.error(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        style:{ width: "100%" },
      });
      setIsLoading(false)
      return;
    }
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 2000,
      style:{ width: "100%" },
    });
    setIsLoading(false)
  };

    if (isLoading) {
        return (
          <div className="h-full w-full flex justify-center items-center">
            <CircularProgress color="inherit" size={30} />
          </div>
        );
      }
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.username || ""}
              onChange={handlechange}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mobile</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.phone || ""}
              onChange={handlechange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              max={new Date().toISOString().split("T")[0]}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.date_of_birth || ""}
              onChange={handlechange}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              value={user.email || ""}
              disabled
            />
          </div>
        </div>
        <button className={`hover:bg-black p-1 hover:text-white px-3 text-blue-500 transition-colors ${isLoading && "cursor-not-allowed"} duration-300`}
        onClick={resetPassword}
        disabled={isLoading}
        >
          Rest Password
        </button>
      </div>

      <div className="mt-6 flex justify-end">
        {updateBtn && (
          <button
            className="w-full md:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </div>
    </>
  );
};

export default AccountOverview;
