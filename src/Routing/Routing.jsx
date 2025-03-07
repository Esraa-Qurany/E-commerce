import UserContextProvider from "../Context/UserContext";
import Cart from "../pages/cart/Cart";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Layout from "../pages/layout/Layout";
import ProtectedRoutes from "../component/protectedRoutes/ProtectedRoutes";
import Wishlist from "../pages/wishlist/Wishlist";
import ProductDetails from "../component/ProductDetails/ProductDetails";
import Categories from "../pages/categories/Categories";
import Brands from "../pages/brands/Brands";
import Login from "../pages/Auth/login/Login";
import ProtectedAuthRoutes from "../component/protectedRoutes/ProtectedAuthRoutes";
import Register from "../pages/Auth/register/Register";
import CheckOut from "../pages/CheckOut/CheckOut";
import Orders from "../pages/Orders/Orders";
import VerifyCode from "../pages/Auth/Verifycode/VerifyCode";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword';
import Error from '../pages/error/Error';

export const routing = [
  {
    path: "/",
    element: (
      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "product/:productId",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <ProtectedAuthRoutes>
            <ForgetPassword />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "verifyCode",
        element: (
          <ProtectedAuthRoutes>
            <VerifyCode />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "resetpassword",
        element: (
          <ProtectedAuthRoutes>
            <ResetPassword />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoutes>
            <Register />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoutes>
            <Error />
          </ProtectedRoutes>
        ),
      },
    ],
  },
];
