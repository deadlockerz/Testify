import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Ensure `getUserId` function is available or define it here if needed
// import { getUserId } from '../api/getUserId'; 

const ProfilePage = () => {
  

  const [user, setUser] = useState({
    profilePhoto: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null); // Initialize userId state
  const authToken = Cookies.get("token"); // Retrieve auth token from localStorage

  useEffect(() => {
    // Fetch user ID and then fetch user data
    if (authToken) {
      fetchUserId(authToken);
    } else {
      console.error("No auth token found");
    }
  }, [authToken]);

  const fetchUserId = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(response.data.userId); // Set userId from response
      fetchUser(response.data.userId); // Fetch user data using the userId
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/userprofile/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/updateprofile/${userId}/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update the user state with the new profile photo
      setUser((prevUser) => ({
        ...prevUser,
        profilePhoto: response.data.profilePhoto,
      }));
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/profile/updateprofile/${userId}`,
        user
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={`${process.env.REACT_APP_BASE_URL}${user.profilePhoto}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-500"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePhotoChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12l5 5L20 7"
                  />
                </svg>
              </label>
            )}
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Email"
              />
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Phone Number"
              />
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={handleSave}
                className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600 mb-1">{user.email}</p>
              <p className="text-gray-600 mb-1">{user.phone}</p>
              <p className="text-gray-600 mb-1">{user.gender}</p>
              <p className="text-gray-600 mb-4">
                Date of Birth: {user.dob ? new Date(user.dob).toLocaleDateString() : "Date not available"}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
