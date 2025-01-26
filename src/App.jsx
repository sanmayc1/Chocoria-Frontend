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
import ProductSection from "./Components/Admin/AllSections/ProductSection/ProductSection.jsx";
import Dashboard from "./Components/Admin/AdminDashboard/DashboardContent.jsx";
import CustomerSection from "./Components/Admin/AllSections/CustomerSection/CoustomerSection.jsx";
import CategorySection from "./Components/Admin/AllSections/CategorySection/CategorySection.jsx";
import OrderSection from "./Components/Admin/AllSections/OrderSection/OrderSection.jsx";
import OfferSection from "./Components/Admin/AllSections/OffersSection/OffersSection.jsx";
import ReviewSection from "./Components/Admin/AllSections/ReviewSection/ReviewSection.jsx";
import NotificationSection from "./Components/Admin/AllSections/NotificationSection/NotificationSection.jsx";
import ContactUsSection from "./Components/Admin/AllSections/ContactUs/ContactUs.jsx";
import CouponSection from "./Components/Admin/AllSections/CouponSection/CouponSection.jsx";
import BannerManagementSection from "./Components/Admin/AllSections/BannerManagementSection/BannerManagementSection.jsx";
import AdminLogin from "./Components/Admin/Login/Login.jsx";
import AddProduct from "./Components/Admin/AllSections/ProductSection/Add&EditProduct/AddProduct.jsx";
import SignUpPage from "./Pages/SingnUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import OtpPage from "./Pages/OtpPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/signup",
      element: <SignUpPage/>,
    },
    {
      path:"/otp/:id",
      element:<OtpPage/>
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/productdetailed",
      element: <ProductDetailedPage />,
    },
    // Admin side paths

    {
path:"/admin/login",
element:<AdminLogin/>
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      // child components
      children: [
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin/product",
          element: <ProductSection />,
        },
        {
          path: "/admin/customers",
          element: <CustomerSection />,
        },
        {
          path: "/admin/category",
          element: <CategorySection />,
        },
        {
          path: "/admin/orders",
          element: <OrderSection />,
        },
        {
          path: "/admin/offers",
          element: <OfferSection />,
        },
        {
          path: "/admin/reviews",
          element: <ReviewSection />,
        },
        {
          path:"/admin/notification",
          element:<NotificationSection/>
        },
        {
          path:"/admin/contact-us",
          element:<ContactUsSection/>
        },
        {
          path:"/admin/coupon",
          element:<CouponSection/>
        },
        {
          path:"/admin/banner-management",
          element:<BannerManagementSection/>
        },
        {
          path:"/admin/product/add-product",
          element:<AddProduct/>
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
