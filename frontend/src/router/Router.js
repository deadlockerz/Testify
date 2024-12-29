
import Hero from "../components/Hero";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import LoginForm from "../pages/Login";
import SignupForm from "../pages/Signup";
import Courses from "../pages/Courses";
import Practice from "../pages/Practice";
import Cart from "../pages/Cart";
import NotFound from "../components/NotFound";
import Error from "../components/Error";
import CourseDetail from "../pages/CourseDetail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Paymentsucess from "../pages/paymentsucess";                             
import Paymentfail from "../pages/paymentfail";
import Profile from "../pages/Profile";
import Blog from "../pages/blog";
import Documentation from "../pages/Documentation"
import Compiler from "../pages/compiler"
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
        { path: "/course-detail/:id", element: <CourseDetail /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password/:id/:token", element: <ResetPassword /> },
        { path: "/dashboard", element: <Dashboard/>},
        { path: "/success", element: <Paymentsucess/>},
        { path: "/cancel", element: <Paymentfail/>},
        { path: "/blog", element: <Blog/>},
        { path: "/profile", element: <Profile/>},
        { path: "/documentation" , element: <Documentation/>},
        { path: "/compiler" , element: <Compiler/>},
               

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const AppWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    );
  };
  
  export default AppWrapper;

// export default Router;