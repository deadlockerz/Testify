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

  const handleChange = (e) => {
    setinputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3030/user/login`, inputUser);
      if (res.status === 200) {
        Cookies.set("userName", res.data.user.name, { expires: 1 });
        // Cookies.set("userId", (res.data.user._id), { expires: 1 });
        Cookies.set("token", res.data.token, { expires: 1 });
        window.location = "/";
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Invalid credentials");
    }
  };

  // cookies check
  // useEffect(() => {
  //   // Read the token from the cookie
  //   const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  //   const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  //   const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  //   if (token) {
  //     // Use Axios to send authenticated requests
  //     axios
  //       .get("/protected", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         // Handle response
  //         console.log("Response:", response.data);
  //       })
  //       .catch((error) => {
  //         // Handle error
  //         console.error("Error:", error);
  //       });
  //   }
  // }, []);

  // Google Login

  const onSuccess = (res) => {
    const data = jwtDecode(res.credential);
    console.log(data.name);
    Cookies.set("userName", data.name, { expires: 365 });
    Cookies.set("userEmail", encodeURIComponent(data.email), { expires: 365 });
    window.location.href = "/";
  };

  // captcha validation
  function generateCaptcha() {
    var alpha = [
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];   // '!','@','#','$','%','^','&','*','+'
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
    var e = alpha[Math.floor(Math.random() * alpha.length)];
    var f = alpha[Math.floor(Math.random() * alpha.length)];

    return a + b + c + d + e + f;
  }

  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState("");

  function regenerateCaptcha() {
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
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
    <div className="rounded-3xl max-w-md mx-auto shadow-lg lg:mt-48 lg:mb-48 md:mb-24 md:mt-24 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 lg:min-h-180 border border-gray-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center">
          <GoogleLogin
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                  />

          {/* <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
            <div className="bg-white p-1 rounded-full">
              <svg className="w-6" viewBox="0 0 32 32">
                <path
                  fillRule="evenodd"
                  d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                />
              </svg>
            </div>
            <span className="ml-4">Log In with GitHub</span>
          </button> */}
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
                  to='/forgot-password'
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
                placeholder="Enter Captchd"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
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
  );
}

export default LoginForm;