import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
