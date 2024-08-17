import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const user_id = Cookies.get("userId");


const Practice = () => {
  const [problemStatus, setProblemStatus] = useState({});
  const [filteredProblem, setFilteredProblem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllProblems();
  }, []);

  // Fetch all problems
  const fetchAllProblems = async () => {
    try {
      const res = await axios.get("http://localhost:3030/practice/allProblems");
      setFilteredProblem(res.data);
      res.data.forEach((problem) => {
        fetchProblemStatus(problem.problem_number);
      });
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  // Fetch the status of a specific problem for the current user
  const fetchProblemStatus = async (problemNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:3030/dashboard/status/${user_id}/${problemNumber}`
      );
      setProblemStatus((prevStatus) => ({
        ...prevStatus,
        [problemNumber]: res.data.status || "unsolved",
      }));
    } catch (error) {
      console.error("Error fetching problem status:", error);
    }
  };

  // Update problem status
  const updateProblemStatus = async (problemNumber) => {
    try {
      const currentStatus = problemStatus[problemNumber] === "solved" ? "unsolved" : "solved";

      await axios.post("http://localhost:3030/dashboard/updateProblemStatus", {
        user_id,
        problem_number: problemNumber,
        status: currentStatus,
      });

      setProblemStatus((prevStatus) => ({
        ...prevStatus,
        [problemNumber]: currentStatus,
      }));
    } catch (error) {
      console.error("Error updating problem status:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter problems by name based on search term
    const filtered = filteredProblem.filter((problem) =>
      problem.problem_name.toLowerCase().includes(value)
    );
    setFilteredProblem(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search problems by name..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Problem Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredProblem.map((item) => (
                  <tr key={item.problem_number}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <a href="#" className="text-blue-600 hover:underline">
                        {item.problem_number}
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <Link
                        to={`${item.problem_link}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {item.problem_name}
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.platform}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => updateProblemStatus(item.problem_number)}
                        className={`px-4 py-2 rounded ${problemStatus[item.problem_number] === "solved" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                      >
                        {problemStatus[item.problem_number] || "unsolved"}
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.difficulty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
