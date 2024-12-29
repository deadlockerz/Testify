
// import Hero from "../components/Hero";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import LoginForm from "../pages/Login";
import SignupForm from "../pages/Signup";
import NotFound from "../components/NotFound";
import Error from "../components/Error";
import Courses from "../pages/courses";
import AdminPractice from "../pages/problems";
import UpdateCourse from "../pages/UpdateCourse";
import Payments from "../pages/payments";
import Users from "../pages/users";
import Home from "../pages/Home";
// import ForgotPassword from "../pages/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from "../App"; 

  const router = createBrowserRouter(
    [{
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/admin_courses", element: <Courses /> },
        {
          path: "/admin_login",
          element: <LoginForm />,
        },
        {
          path: "/admin_signup",
          element: <SignupForm />,
        },
        { path: "/admin_problems", element: <AdminPractice /> },
        { path: "/admin_updatecourse/:id", element: <UpdateCourse /> },
        { path: "/admin_payments", element: <Payments /> },
        { path: "/admin_users", element: <Users /> },
        // { path: "/forgot-password", element: <ForgotPassword /> },
        // { path: "/reset-password/:id/:token", element: <ResetPassword /> },         

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