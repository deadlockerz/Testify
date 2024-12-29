import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const CourseDetail = () => {
  const { id } = useParams(); // Retrieve the course ID from the URL
  const [course, setCourse] = useState(null);
  const [userId, setUserId] = useState(null);
  const authToken = Cookies.get("token"); // Retrieve token from cookies

  useEffect(() => {
    // Fetch course details based on course ID from the URL
    if (id) {
      fetchCourseDetails(id);
    }
    
    if (authToken) {
      fetchUserId(authToken);
    } else {
      console.error("No auth token found");
    }
  }, [id, authToken]);

  // Fetch course details by course ID
  const fetchCourseDetails = async (courseId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/course-detail/${courseId}`);
      setCourse(res.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  // Fetch user ID
  const fetchUserId = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(response.data.userId); // Set userId from response      
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  };

  // Add course to cart
  const addToCart = async () => {
    if (!userId) {
      alert("User not authenticated");
      return;
    }
    
    if (!course) {
      console.error("Course data is not available");
      return;
    }
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/cart/${course._id}`, {
        userId: userId, // Include userId in the request body
      });
      if (res.status === 201) {
        alert("Course added to cart");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-200">
      {/* Image Section */}
      <div className="flex-none w-full md:w-1/2 bg-gray-200 overflow-hidden flex items-center justify-center p-4">
        <img
          src={course.img}
          alt={course.course_name}
          className="max-w-full max-h-96 object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 p-8 flex flex-col justify-center bg-white shadow-lg rounded-lg md:rounded-l-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{course.course_name}</h1>
        <p className="text-2xl font-semibold text-green-600 mb-4">Price: Rs.{course.course_price}</p>
        <p className="text-lg text-gray-700 mb-6">{course.course_disc}</p>
        <button
          onClick={addToCart}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
 