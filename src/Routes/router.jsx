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
import AddProduct from "../Components/Admin/AllSections/ProductSection/Add&EditProduct/AddProduct.jsx";
import SignUpPage from "../Pages/UserPages/SingnUpPage.jsx";
import LoginPage from "../Pages/UserPages/LoginPage.jsx";
import OtpPage from "../Pages/UserPages/OtpPage.jsx";
import AuthGuard from "../Components/GuardComponent/AuthGuard.jsx";
import AdminLoginPage from "../Pages/AdminPages/LoginPage.jsx";
import AdminAuthGuard from "../Components/GuardComponent/AdminAuthGuard.jsx";
import AdminLoginGuard from "../Components/GuardComponent/AdminLoginGuard.jsx";
import EditProduct from "../Components/Admin/AllSections/ProductSection/Add&EditProduct/EditProduct.jsx";
import UserLayout from "../Components/User/UserLayout/UserLayout.jsx";
import AuthLoginGuard from "../Components/GuardComponent/AuthLogin.jsx";
import { createBrowserRouter } from "react-router-dom";
import AccountOverview from "../Components/User/UserProfile/AccountOverView/AccountOverview.jsx";
import ProfileLayout from "../Components/User/UserProfile/ProfileLayout/ProfileLayout.jsx";
import ManageAddress from "../Components/User/UserProfile/ManageAddress/ManageAddress.jsx";
import Cart from "../Components/User/Cart/Cart.jsx";
import Checkout from "../Components/User/CheckoutPage/Checkout.jsx";
import SuccessPage from "../Components/User/CheckoutPage/OrderSuccefull/OrderSuccefull.jsx";
import CheckoutForBuyNow from "../Components/User/CheckoutPage/BuyNowCheckout.jsx";
import Orders from "../Components/User/UserProfile/Orders/Orders.jsx";
import OrderDetailed from "../Components/User/UserProfile/Orders/OrderDetailed/OrderDetailed.jsx";
import SearchPage from "../Pages/UserPages/SearchPage.jsx";
import ProductSearchResult from "../Components/User/ProductSearchResult/ProductSearchResult.jsx";
import OrderDetails from "../Components/Admin/AllSections/OrderSection/OrderDetails.jsx";
import CancelRequests from "../Components/Admin/AllSections/OrderSection/CancelRequests.jsx";
import ForgetPasswordPage from "../Pages/UserPages/ForgetPassword.jsx";
import ResetPasswordPage from "../Pages/UserPages/ResetPasswordPage.jsx";
import ShopPage from "../Pages/UserPages/ShopPage.jsx";
import Wishlist from "../Components/User/Wishlist/Wishlist.jsx";
import Wallet from "../Components/User/UserProfile/Wallet/Wallet.jsx";
import WalletHistory from "../Components/User/UserProfile/Wallet/WalletHistory.jsx";
import SalesReport from "../Components/Admin/AdminDashboard/SalesReport.jsx";
import OrderFailed from "../Components/User/CheckoutPage/OrderFailed/OrderFailed.jsx";
import BrandSection from "../Components/Admin/AllSections/Brand/BrandSection.jsx";
import BrandListPage from "../Pages/UserPages/BrandListPage.jsx";
import ReturnRequests from "../Components/Admin/AllSections/OrderSection/ReturnRequest.jsx";
import Referral from "../Components/User/UserProfile/Refferal/Refferal.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthLoginGuard>
        <LoginPage />
      </AuthLoginGuard>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLoginGuard>
        <SignUpPage />
      </AuthLoginGuard>
    ),
  },
  {
    path: "/otp/:id",
    element: <OtpPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/reset-password/:id",
    element: <ResetPasswordPage />,
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
        path: "/search",
        element: <SearchPage />,
        children: [
          {
            path: "/search/:query",
            element: <ProductSearchResult />,
          },
        ],
      },
      {
        path: "/checkout/failed/:id",
        element: <OrderFailed />,
      },
      {
        path: "/brand",
        element: <BrandListPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/user",
        element: (
          <AuthGuard>
            <ProfileLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: "/user/account-overview",
            element: <AccountOverview />,
          },
          {
            path: "/user/order",
            element: <Orders />,
          },
          {
            path: "/user/order/:id",
            element: <OrderDetailed />,
          },
          {
            path: "/user/manage-address",
            element: <ManageAddress />,
          },
          {
            path: "/user/wallet",
            element: <Wallet />,
          },
          {
            path: "/user/referral",
            element: <Referral />,
          },
          {
            path: "/user/wallet/history",
            element: <WalletHistory />,
          },
        ],
      },
      {
        path: "/user/cart",
        element: (
          <AuthGuard>
            <Cart />
          </AuthGuard>
        ),
      },
      {
        path: "/user/wishlist",
        element: (
          <AuthGuard>
            <Wishlist />
          </AuthGuard>
        ),
      },
      {
        path: "/user/checkout",
        element: (
          <AuthGuard>
            <Checkout />
          </AuthGuard>
        ),
      },
      {
        path: "/user/checkout/success/:id",
        element: (
          <AuthGuard>
            <SuccessPage />
          </AuthGuard>
        ),
      },
      {
        path: "/user/checkout/:id/:vId",
        element: (
          <AuthGuard>
            <CheckoutForBuyNow />
          </AuthGuard>
        ),
      },
    ],
  },

  // Admin side paths

  {
    path: "/admin/login",
    element: (
      <AdminLoginGuard>
        <AdminLoginPage />
      </AdminLoginGuard>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminAuthGuard>
        <AdminLayout />
      </AdminAuthGuard>
    ),
    // child components
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/sales-report",
        element: <SalesReport />,
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
        path: "/admin/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "/admin/orders/cancel",
        element: <CancelRequests />,
      },
      {
        path: "/admin/orders/return",
        element: <ReturnRequests />,
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
        path: "/admin/brand",
        element: <BrandSection />,
      },
      {
        path: "/admin/product/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/product/edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
]);

export default router;
