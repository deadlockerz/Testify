import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react"; // Ensure you have the correct imports
import SearchBar from "../components/SearchBar";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3030/courses/readallcourses");
      setCourses(res.data);
      setFilteredCourses(res.data); // Initially, set filtered courses to all courses
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Add to cart function
  const addtocart = async (courseId) => {
    try {
      const res = await axios.post(`http://localhost:3030/cart/cart/${courseId}`);
      if (res.status === 201) {
        alert("Course added to cart");
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  // Base URL for assets
  const baseUrl = "http://localhost:3030";

  return (
    <div>
      <SearchBar courses={courses} setFilteredCourses={setFilteredCourses} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mt-8">
        {filteredCourses.map((item) => (
          <Card key={item._id} className="w-full max-w-xs mx-auto">
            <Link to={`/course/${item._id}`}>
              <CardHeader color="blue-gray" className="relative h-56">
                {/* <img
                  src={`${baseUrl}/assets/${item.img}`} // Use baseUrl to form the correct image path
                  alt="card-image"
                  className="object-cover w-full h-full"
                /> */}
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
                onClick={() => addtocart(item._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              {/* <Button color="blue" onClick={() => addtocart(item._id)}> Add to Cart </Button> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
