import axios from "axios";
import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const { logo } = require("../utils/constant");

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    profilePhoto: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });
  const menuRef = useRef(null);
  const crossRef = useRef(null);

  const authToken = Cookies.get("token");

  const fetchUserId = useCallback(async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/verify-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUser(response.data.userId); // Fetch user data using the userId
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  }, []);

  const fetchUser = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/profile/userprofile/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        crossRef.current &&
        !crossRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchUserId(authToken);
    } else {
      console.error("No auth token found");
    }
  }, [authToken, fetchUserId]);


  return (
    <header className="sticky top-0 bg-white bg-opacity-80 pr-5 pl-5 z-50 select-none">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center flex-row">
            <Link to="/" className="flex w-auto py-3">
              <img src={logo} alt="Testify" className="h-auto max-h-10 mr-4" />
              <div className="text-blue-500 text-2xl custom-font p-1">
                Testify
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              ref={crossRef}
              className="h-8 w-12 absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[3px] ring-primary focus:ring-2 lg:hidden"
            >
              <div
                className={`h-2 w-6 flex items-center justify-between transition-transform ${
                  mobileMenuOpen ? "rotate-45 translate-y-1" : "rotate-0"
                }`}
              >
                <span className="h-[2px] w-6 bg-black transform origin-right"></span>
              </div>
              <div
                className={`h-2 w-6 flex items-center justify-between transition-transform ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1" : "rotate-0"
                }`}
              >
                <span className="h-[2px] w-6 bg-black transform origin-right"></span>
              </div>
            </button>
            <nav
              ref={menuRef}
              className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-2 shadow-2 ${
                mobileMenuOpen ? "" : "hidden"
              } lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:bg-transparent`}
            >
              <ul className="block lg:flex">
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link
                    to="/courses"
                    className="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex"
                  >
                    Courses
                  </Link>
                </li>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link
                    to="/practice"
                    className="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex"
                  >
                    Practice 
                  </Link>
                </li>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link
                    to="/compiler"
                    className="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex"
                  >
                    compiler
                  </Link>
                </li>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link
                    to="/cart"
                    className="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex"
                  >
                    Cart
                  </Link>
                </li>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link
                    to="/documentation"
                    className="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex"
                  >
                    Doc
                  </Link>
                </li>
                <li onClick={() => setMobileMenuOpen(false)}>
                  <Link
                    to="/blog"
                    className="flex py-2 text-base font-medium text-body-color hover:text-dark lg:ml-12 lg:inline-flex"
                  >
                    Vlogs
                  </Link>
                </li>                
              </ul>
            </nav>
          </div>

          <div className="flex justify-end">
  {user.name ? (
    <Fragment>
      <div className="hidden sm:flex justify-end pr-16 lg:pr-0">
        <button
          // onClick={logout}
          className="px-7 py-2 text-base font-medium text-dark hover:text-primary dark:text-black"
        >
          {user.name}
        </button>
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 px-4 py-2 text-base font-medium text-dark hover:text-primary dark:text-black"
        >
          <img
            src={`${process.env.REACT_APP_BASE_URL}${user.profilePhoto}`}
            alt={`${user.name}'s Profile`}
            className="w-16 h-16 rounded-full object-cover mb-1 border border-indigo-500"
          />
        </Link>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="hidden sm:flex justify-end pr-16 lg:pr-0">
        <Link
          to="/login"
          className="px-7 py-2 text-base font-medium text-dark hover:text-primary dark:text-black"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-7 py-2 text-base font-medium text-dark hover:text-primary dark:text-black"
        >
          SignUp
        </Link>
      </div>
    </Fragment>
  )}
</div>

        </div>
      </div>
    </header>
  );
};

export default Header;
