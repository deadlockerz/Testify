import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  } from "@material-tailwind/react"; // Ensure you have the correct imports
import SearchBar from "../components/SearchBar";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchAllCourses();
    if (authToken) {
      fetchUserId(authToken);
    } else {
      console.error("No auth token found");
    }
  }, [authToken]);

  // fetch all courses
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


  const fetchAllCourses = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/readallcourses`);
      setCourses(res.data);
      setFilteredCourses(res.data); // Initially, set filtered courses to all courses
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Add to cart function
  const addtocart = async (courseId, userId) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/cart/${courseId}`, {
        userId: userId, // Include userId in the request body
      });
      if (res.status === 201) {
        alert("Course added to cart");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  

  
  return (
    <div className="bg-gray-200 pt-3">
      <SearchBar courses={courses} setFilteredCourses={setFilteredCourses} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center  mt-8">
        {filteredCourses.map((item) => (
          <Card key={item._id} className="w-full max-w-xs mx-auto">
            <Link to={`/course-detail/${item._id}`}>
              <CardHeader color="blue-gray" className="relative h-56">               
                <img
                  src={`${item.img}`}
                  alt="card-image"
                  className="object-cover w-full h-full"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {item.course_name}
                </Typography>
                <Typography>{item.course_disc}</Typography>
              </CardBody>
            </Link>
            <CardFooter className="pt-0">
              {/* Simplified button for debugging */}
              <button
                onClick={() => addtocart(item._id, userId)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              {/* <Button color="blue" onClick={() => addtocart(item._id)}> Add to Cart </Button> */}
            </CardFooter>
          </Card>
        ))}
      </div>
      <h1 className="text-2xl font-semibold text-gray-700 animate-pulse my-10 mx-auto text-center">
  Loading...
</h1>

    </div>
  );
};

export default Courses;
