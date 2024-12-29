import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const authtoken = Cookies.get("token"); // Use correct cookie key for token

const Practice = () => {
  const [userId, setUserId] = useState(null);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [problemStatus, setProblemStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (authtoken) {
      fetchUserId(authtoken);
    } else {
      console.error("No auth token found");
    }
    fetchAllProblems();
  }, [authtoken]);

  const fetchUserId = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserId(response.data.userId);
      fetchAllProblems(response.data.userId);
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  };

  const fetchAllProblems = async (userId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/practice/allProblems`);
      setProblems(res.data);
      setFilteredProblems(res.data);
      res.data.forEach((problem) => {
        fetchProblemStatus(userId, problem.problem_number);
      });
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  const fetchProblemStatus = async (userId, problemNumber) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/dashboard/status/${userId}/${problemNumber}`
      );
      setProblemStatus((prevStatus) => ({
        ...prevStatus,
        [problemNumber]: res.data.status || "unsolved",
      }));
    } catch (error) {
      console.error("Error fetching problem status:", error);
    }
  };

  // update problem status

  const updateProblemStatus = async (userId,problemNumber) => {
    try {
      const currentStatus = problemStatus[problemNumber] === "solved" ? "unsolved" : "solved";
      await axios.post(`${process.env.REACT_APP_BASE_URL}/dashboard/updateProblemStatus`, {
        user_id:userId,
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

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = problems.filter((problem) =>
      problem.problem_name.toLowerCase().includes(value)
    );
    setFilteredProblems(filtered);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full max-w-screen-lg">
        <div className="bg-white p-8 rounded-lg shadow-lg mt-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search problems by name..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white p-8 rounded-lg mb-5 shadow-lg w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Problem Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredProblems.map((item) => (
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
                        onClick={() => updateProblemStatus(userId,item.problem_number)}
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
      <h1 className="text-2xl font-semibold text-gray-700 animate-pulse my-10 mx-auto text-center">
  Loading...
</h1>
    </div>
  );
};

export default Practice;
