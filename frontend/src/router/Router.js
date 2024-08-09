//Components
import Hero from "../components/Hero";
//Routers
import { createBrowserRouter } from "react-router-dom";
//Pages
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
import App from "../App";

const Router = () => {
  const router = createBrowserRouter([
    {
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

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return router;
};

export default Router;
