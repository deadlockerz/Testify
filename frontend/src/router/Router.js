
import Hero from "../components/Hero";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import LoginForm from "../pages/Login";
import SignupForm from "../pages/Signup";
import Courses from "../pages/Courses";
import Practice from "../pages/Practice";
import Cart from "../pages/Cart";
import NotFound from "../components/NotFound";
import Error from "../components/Error";
import AdminHome from "../admin/AdminHome";
import AdminPractice from "../admin/AdminPractice";
import UpdateCourse from "../admin/UpdateCourse";
import CardPayment from "../pages/CardPayment";
import UpiPayment from "../pages/UpiPayment";
import BankPayment from "../pages/BankPayment";
import PayPalPayment from "../pages/PayPalPayment";
import CourseDetail from "../pages/CourseDetail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from "../App";

// const Router = () => {
  const router = createBrowserRouter(
    [{
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Hero />,
        },
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/signup",
          element: <SignupForm />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        { path: "/practice", element: <Practice /> },
        { path: "/cart", element: <Cart /> },
        { path: "/admin", element: <AdminHome /> },
        { path: "/adminpractice", element: <AdminPractice /> },
        { path: "/updatecourse/:id", element: <UpdateCourse /> },
        { path: "/credit-card-payment", element: <CardPayment /> },
        { path: "/upi-payment", element: <UpiPayment /> },
        { path: "/bank-transfer-payment", element: <BankPayment /> },
        { path: "/paypal-payment", element: <PayPalPayment /> },
        { path: "/course/:id", element: <CourseDetail /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password/:id/:token", element: <ResetPassword /> },
        { path: "/dashboard", element: <Dashboard/>},

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const AppWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="658716736046-lrhfa8d733m376vdf0n8mqerpoct6o1v.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    );
  };
  
  export default AppWrapper;

// export default Router;