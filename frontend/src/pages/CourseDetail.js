import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState(null);
  const { id } = useParams();
  const courseId = id;

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/course/course-detail/${courseId}`
        );
        setCourseDetail(response.data);
      } catch (error) {
        console.error("Error fetching course detail:", error);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {courseDetail.courseName}
        </h1>
        <div className="flex flex-wrap -mx-4">
          <div className="lg:w-1/2 md:w-full px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Overview
            </h2>
            <p className="text-gray-600">{courseDetail.overview}</p>
          </div>
          <div className="lg:w-1/2 md:w-full px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Objectives
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {courseDetail.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 md:w-full px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Prerequisites
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {courseDetail.prerequisites.map((prerequisite, index) => (
                <li key={index}>{prerequisite}</li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 md:w-full px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Syllabus
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {courseDetail.syllabus.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/3 md:w-full px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Instructor
            </h2>
            <div className="flex items-center mb-4">
              <img
                src={courseDetail.instructor.image}
                alt="Instructor"
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800">{courseDetail.instructor.name}</p>
                <p className="text-gray-600">{courseDetail.instructor.bio}</p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 md:w-full px-4 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Reviews
            </h2>
            <ul>
              {courseDetail.reviews.map((review, index) => (
                <li key={index} className="mb-4">
                  <div className="flex items-center mb-2">
                    <p className="text-gray-800 mr-2">{review.username}</p>
                    <p className="text-gray-600">{review.rating}</p>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
