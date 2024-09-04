import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const { logo } = require("../utils/constant");

function SignupForm() {
  const [inputUser, setInputUser] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    otp: "", // Added otp field for form state
  });
  const [otp, setOtp] = useState(""); // Changed from array to string

  // Set changes from input
  const handleChange = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  // Save data to the server
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, inputUser);
      if (res.status === 201) {
        alert("User created successfully");
        window.location = "/login";
      } else if (res.status === 400) {
        alert("User already exists");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  // Function to validate OTP
  const isValidOTP = (e) => {
    e.preventDefault();

    if (otp === inputUser.otp) {
      handleSubmit();
      setOtp(""); // Correctly call setOtp to reset it
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // SMS OTP verification
  const sendOTP = async () => {
    try {
      const phoneNumber = inputUser.phone;
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/sendotp`, { phoneNumber });

      if (response.data.success) {
        alert(`OTP sent to ${phoneNumber}`);
        setOtp(response.data.otp);
      } else {
        alert('Failed to generate OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred while sending OTP. Please try again later.');
    }
  };

  return (
    <div className="rounded-3xl max-w-md mx-auto shadow-lg lg:mt-48 lg:mb-48 md:mb-24 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 lg:min-h-180 border border-gray-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={isValidOTP}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={inputUser.name}
                onChange={handleChange}
                required
                className="pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={inputUser.email}
                onChange={handleChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                className="pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                value={inputUser.phone}
                onChange={handleChange}
                required
                className="pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                placeholder="Set Password"
                value={inputUser.password}
                onChange={handleChange}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                title="Password must contain at least one digit, one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long"
                required
                className="pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="pl-3 w-full rounded-md border border-gray-300 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex">
            <input
              className="w-full px-8 py-4 rounded-l font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={inputUser.otp}
              onChange={handleChange}
            />
            <button
              type="button"
              className="mt-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-r hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              onClick={sendOTP}
            >
              Send OTP
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
