import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth_False } from "./Store/Slice/authSlice.jsx";
import { user_logout } from "./Services/api/api.js";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let socket = null ;
  useEffect(() => {
    if (auth.auth && !socket) {
      socket = io("http://localhost:8080", {
        withCredentials: true,
        extraHeaders: {
          "Access-Control-Allow-Credentials": true,
        },
      });

      socket.on("block_user", async() => {
        toast.error("Account Blocked By Admin", {
          position: "top-center",
          autoClose: 2000,
        });
        await user_logout();
        dispatch(auth_False());  
      });

      
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
     
    if (!auth.auth && socket) {
      socket.disconnect();
      socket = null;
    }


  }, [auth.auth]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
