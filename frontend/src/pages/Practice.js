import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";



const Practice = () => {
  const [Problem, setProblem] = useState([]);
  const [filteredProblem, setFilteredProblem] = useState([]);


  useEffect(() => {
    fetchAllproblems();
  }, []);

  const fetchAllproblems = async () => {
    try {
      const res = await axios.get("http://localhost:3030/practice/readallproblems");
      setProblem(res.data);
      setFilteredProblem(res.data); // Initially, set filtered courses to all courses
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-screen-lg">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <h2 class="block py-2 px-3 text-black md:dark:hover:bg-transparent" aria-current="page">No.</h2>
              </li>
              <li>
                <h2 class="block py-2 px-3 text-black md:dark:hover:bg-transparent" >Problem Name</h2>
              </li>
            </ul>
          </div>
          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0" >
              <li>
                <h2 class="block py-2 px-3 text-black md:dark:hover:bg-transparent">Platform</h2>
              </li>
              <li>
                <h2 class="block py-2 px-3 text-black md:dark:hover:bg-transparent">Status</h2>
              </li>
              <li>
                <h2 class="block py-2 px-3 text-black md:dark:hover:bg-transparent">Difficulty</h2>
              </li>
            </ul>
          </div>

        </div>

        {filteredProblem.map((item) => (
          <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                  <li>
                    <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">{item.problem_number}</a>
                  </li>
                  <Link to={`${item.problem_link}`} target="_blank" class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{item.problem_name}</Link>
                </ul>
              </div>
              <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                  <li>
                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{item.platform}</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{item.status}</a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{item.difficulty}</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ))}

      </div>
    </div>
  );
};

export default Practice;
