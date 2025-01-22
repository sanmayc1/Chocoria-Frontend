import "./App.css";
import LoginForm from "./Components/User/Login/LoginForm.jsx";
import SignUpForm from "./Components/User/SignUp/SignUpForm.jsx";
import Navbar from "./Components/User/Navbar/Navbar.jsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import ProductDetailedPage from "./Pages/ProductDetailedPage.jsx";
import AdminLayout from "./Components/Admin/AdminLayout/AdminLayout.jsx";
import ProductSection from "./Components/Admin/ProductSection/ProductSection.jsx";
import Dashboard from "./Components/Admin/AdminDashboard/DashboardContent.jsx";
import CustomerSection from "./Components/Admin/CustomerSection/CoustomerSection.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/signup",
      element: <SignUpForm />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/productdetailed",
      element: <ProductDetailedPage />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path:"/admin/dashboard",
          element:<Dashboard/>
        },
        {
          path: "/admin/product",
          element: <ProductSection />,
        },
        {
          path:"/admin/customers",
          element:<CustomerSection/>
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/*      
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/productdetailed" element={<ProductDetailedPage/>}/>
          <Route path="/admin" element={<AdminDashboard/>} children={path:"/" element:<ProductSection/>}  />
        </Routes> */}

      {/* <LoginForm/> */}
    </>
  );
}

export default App;
