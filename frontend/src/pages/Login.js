// export default LoginForm;
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


const { logo } = require("../utils/constant");

function LoginForm() {
  const [inputUser, setinputUser] = useState({
    email: "",
    password: "",
  });

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setinputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  // Login function
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        inputUser
      );
      if (res.status === 200) {
        if (rememberMe) {
          // Set cookie for 10 days
          Cookies.set("token", res.data.token, { expires: 10 });
        } else {
          // Set session cookie
          Cookies.set("token", res.data.token, { expires: 1 });
        }
        
        window.location = "/";
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Invalid credentials");
    }
  };

  // Google Login
  const handleGoogleSuccess = async (res) => {
    const data = jwtDecode(res.credential);
    const email = data.email;
    setUserData((prev) => ({ ...prev, name: data.name, email: data.email }));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/google-login`,
        { email }
      );
      if (response.status === 404) {
        // Show the popup if the user does not exist
        setShowPasswordPopup(true);
      } else if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 1 });
        window.location = "/";
      }
    } catch (error) {
      setShowPasswordPopup(true);
      // console.error("An error occurred during login:", error);
      // alert("An error occurred during login. Please try again.");
    }
  };

  // Handle Google signup
  const handleGoogleSignup = async () => {
    try {
      console.log(userData);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/google-signup`,
        userData
      );
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 1 });
        window.location = "/";
      } else if (response.status === 401) {
        alert("User already exists");
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  // Captcha generation
  function generateCaptcha() {
    var alpha =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
        ""
      );
    var captcha = Array.from(
      { length: 6 },
      () => alpha[Math.floor(Math.random() * alpha.length)]
    ).join("");
    return captcha;
  }

  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");

  function regenerateCaptcha() {
    setCaptchaText(generateCaptcha());
    setUserInput("");
  }

  function handleInputChange(event) {
    setUserInput(event.target.value);
  }

  const CapCheck = (e) => {
    e.preventDefault();
    if (captchaText === userInput) {
      handleSubmit();
    } else {
      alert("Invalid captcha");
      regenerateCaptcha();
    }
  };

  return (
    <div className="rounded-3xl max-w-md mx-auto shadow-lg lg:mt-48 lg:mb-48 md:mb-24 md:mt-24 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 lg:min-h-180  border border-gray-300">
      {showPasswordPopup ? (
        <div className="popup">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-1 mb-3 text-center text-2xl font-bold">
              Testify
            </h2>
          </div>
          <h3>
            Hi, {userData.name}! Please create a password to complete your
            account setup.
          </h3>
          <div className="mt-1">
            <input
              className="pl-3 w-full rounded-md border py-2 text-gray-900 focus:ring-indigo-500 mt-5"
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <button
            onClick={handleGoogleSignup}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 mt-3"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="login-container">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex flex-col items-center">
              <GoogleLogin
                buttonText="Sign in with Google"
                onSuccess={(response) => {
                  handleGoogleSuccess(response);
                  setShowPasswordPopup(true); // Show password popup on Google login success
                }}
                onError={(error) => {
                  console.error("Google Login Error:", error);
                  alert(
                    "Failed to authenticate with Google. Please try again."
                  );
                }}
              />
            </div>

            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or Log In with e-mail
              </div>
            </div>

            <form className="space-y-6" onSubmit={CapCheck}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    value={inputUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    value={inputUser.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex">
                <input
                  className="w-full px-8 m-1 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="captcha"
                  readOnly
                  placeholder={captchaText}
                />
                <input
                  className="w-full px-8 m-1 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  name="captcha"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Enter Captcha"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Keep me logged in
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
