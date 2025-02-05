import Home from "../Pages/UserPages/Home.jsx";
import ProductDetailedPage from "../Pages/UserPages/ProductDetailedPage.jsx";
import AdminLayout from "../Components/Admin/AdminLayout/AdminLayout.jsx";
import ProductSection from "../Components/Admin/AllSections/ProductSection/ProductSection.jsx";
import Dashboard from "../Components/Admin/AdminDashboard/DashboardContent.jsx";
import CustomerSection from "../Components/Admin/AllSections/CustomerSection/CoustomerSection.jsx";
import CategorySection from "../Components/Admin/AllSections/CategorySection/CategorySection.jsx";
import OrderSection from "../Components/Admin/AllSections/OrderSection/OrderSection.jsx";
import OfferSection from "../Components/Admin/AllSections/OffersSection/OffersSection.jsx";
import ReviewSection from "../Components/Admin/AllSections/ReviewSection/ReviewSection.jsx";
import NotificationSection from "../Components/Admin/AllSections/NotificationSection/NotificationSection.jsx";
import ContactUsSection from "../Components/Admin/AllSections/ContactUs/ContactUs.jsx";
import CouponSection from "../Components/Admin/AllSections/CouponSection/CouponSection.jsx";
import BannerManagementSection from "../Components/Admin/AllSections/BannerManagementSection/BannerManagementSection.jsx";
import AddProduct from "../Components/Admin/AllSections/ProductSection/Add&EditProduct/AddProduct.jsx";
import SignUpPage from "../Pages/UserPages/SingnUpPage.jsx";
import LoginPage from "../Pages/UserPages/LoginPage.jsx";
import OtpPage from "../Pages/UserPages/OtpPage.jsx";
import AuthGuard from "../Components/GuardComponent/AuthGuard.jsx";
import AdminLoginPage from "../Pages/AdminPages/LoginPage.jsx";
import AdminAuthGuard from "../Components/GuardComponent/AdminAuthGuard.jsx";
import AdminLoginGuard from "../Components/GuardComponent/AdminLoginGuard.jsx";
import EditProduct from "../Components/Admin/AllSections/ProductSection/Add&EditProduct/editProduct.jsx";
import UserLayout from "../Components/User/UserLayout/UserLayout.jsx";
import AuthLoginGuard from "../Components/GuardComponent/AuthLogin.jsx";
import { createBrowserRouter } from "react-router-dom";
import AccountOverview from "../Components/User/UserProfile/AccountOverView/AccountOverview.jsx";
import ProfileLayout from "../Components/User/UserProfile/ProfileLayout/ProfileLayout.jsx";
import ManageAddress from "../Components/User/UserProfile/ManageAddress/ManageAddress.jsx";
import Cart from "../Components/User/Cart/Cart.jsx";
import Checkout from "../Components/User/CheckoutPage/Checkout.jsx";


  const router = createBrowserRouter([
    {
      path: "/login",
      element: <AuthLoginGuard> <LoginPage /></AuthLoginGuard> ,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/otp/:id",
      element: <OtpPage />,
    },
     {
      path: "/",
      element: <UserLayout />,
      children: [
       {
        path: "/",
        element: <Home />,
       },
       {
        path: "/product/:id",
        element: <ProductDetailedPage />,
       },
       {
        path: "/user",
        element: 
          <AuthGuard>
            <ProfileLayout/>
          </AuthGuard>
        ,
        children: [
         {
          path: "/user/account-overview",
          element: <AccountOverview/>
         },
         {
          path: "/user/orders",
          element: <div className="flex items-center justify-center h-full">Orders</div>
         } ,
         {
          path: "/user/manage-address",
          element: <ManageAddress/>
         },
         {
          path: "/user/wallet",
          element: <div className="flex items-center justify-center h-full">Wallet</div>
         }
        ]
       }
       ,{
        path: "/user/cart",
        element: <AuthGuard><Cart/></AuthGuard>
       },
       {
        path: "/user/checkout",
        element: <AuthGuard><Checkout/></AuthGuard>
       }
      ]
     },
    
    // Admin side paths

    {
      path: "/admin/login",
      element:<AdminLoginGuard><AdminLoginPage/></AdminLoginGuard> ,
    },
    {
      path: "/admin",
      element:<AdminAuthGuard> <AdminLayout /></AdminAuthGuard>,
      // child components
      children: [
        {
          path: "/admin/dashboard",
          element:<Dashboard />,
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
          path: "/admin/notification",
          element: <NotificationSection />,
        },
        {
          path: "/admin/contact-us",
          element: <ContactUsSection />,
        },
        {
          path: "/admin/coupon",
          element: <CouponSection />,
        },
        {
          path: "/admin/banner-management",
          element: <BannerManagementSection />,
        },
        {
          path: "/admin/product/add-product",
          element: <AddProduct />,
        },
        {
          path: "/admin/product/edit-product/:id",
          element: <EditProduct/>,
        }
      ],
    },
  ]);


  export default router;