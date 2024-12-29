import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "../components/ProductTable";

const AdminHome = () => {
  const [courses, setCourses] = useState([]);
  const [inputCourse, setInputCourse] = useState({});

  const handleChange = (event) => {
    setInputCourse({
      ...inputCourse,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/courses/add-course`, inputCourse);
      console.log(res);
      fetchAllCourses();
      setInputCourse({});
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/courses/readallcourses`);
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/courses/deletecourse/${id}`);
      if (res.status === 200) {
        fetchAllCourses();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="w-full md:w-2/3 mx-auto mt-5 px-4">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-2xl font-bold mb-4">Add Course</h1>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Image link</label>
          <input
            type="text"
            name="img"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter image link"
            required
            value={inputCourse.img || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Course Name</label>
          <input
            type="text"
            name="course_name"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter course name"
            required
            value={inputCourse.course_name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Course Description</label>
          <input
            type="text"
            name="course_disc"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter course description"
            required
            value={inputCourse.course_disc || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Course Price</label>
          <input
            type="number"
            name="course_price"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter price"
            required
            value={inputCourse.course_price || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            Add Course
          </button>
        </div>
      </form>

      <ProductTable courses={courses} handleDelete={handleDelete} />
    </div>
  );
}; 

export default AdminHome;
