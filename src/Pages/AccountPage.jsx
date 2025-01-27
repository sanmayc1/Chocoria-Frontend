import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { auth_False } from "../Store/Slice/authSlice.jsx";
import { get_user, user_logout } from "../Services/api/api";
import { useEffect, useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await user_logout();
    dispatch(auth_False());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await get_user();
      if (response?.data?.success) {
        setUser(response.data.user);
      }
    };
    fetchUser();
  },[]);

  return (
    <div className="h-screen w-full">
      <div className="flex justify-end items-center p-10">
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div>
        <div className="p-10">
          <h2 className="text-xl font-semibold uppercase ">{user?.username}</h2>
          <p className="text-gray-500">Account Overview</p>

            <div className="mt-5">
                <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-semibold ">{user?.email}</p>
                </div>
                <div>
                    <p className="text-gray-500 mt-5">Phone</p>
                    <p className="font-semibold">{user?.phone ? user?.phone :"SignUp In with google please Enter Phone"}</p>
                </div>

            </div>
        </div>
        
      </div>
    </div>
  );
};

export default AccountPage;
