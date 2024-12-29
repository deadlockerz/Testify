import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPractice = () => {
  const [Problem, setProblem] = useState([]);
  const [inputProblem, setInputProblem] = useState({});

  const handlechange = (event) => {
    setInputProblem({
      ...inputProblem,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/practice/add-problem`,
        inputProblem
      );
      console.log(res);
      fetchAllProblem();
      setInputProblem({});
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const fetchAllProblem = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/practice/allProblems`);
      setProblem(res.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  useEffect(() => {
    fetchAllProblem();
  }, []);

  return (
    <div className="w-full md:w-2/3 mx-auto mt-5 px-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add Problem</h1>
        {/* <div className="mb-4">
          <label className="text-sm text-gray-500">Problem Number</label>
          <input
            type="number"
            name="problem_number"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter problem number"
            required
            value={inputProblem.problem_number || ""}
            onChange={handlechange}
          />
        </div> */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Problem Link</label>
          <input
            type="text"
            name="problem_link"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter problem link"
            required
            value={inputProblem.problem_link || ""}
            onChange={handlechange}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Problem Name</label>
          <input
            type="text"
            name="problem_name"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter problem name"
            required
            value={inputProblem.problem_name || ""}
            onChange={handlechange}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Platform</label>
          <input
            type="text"
            name="platform"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter platform"
            required
            value={inputProblem.platform || ""}
            onChange={handlechange}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-500">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter difficulty level"
            required
            value={inputProblem.difficulty || ""}
            onChange={handlechange}
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            Add Problem
          </button>
        </div>
      </form>

      {/* Display Problems in a Table-like Format */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Problems</h2>
        <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2">
          <div>Problem Number</div>
          <div>Problem Name</div>
          <div>Platform</div>
          <div>Difficulty</div>
          <div>Link</div>
        </div>
        {Problem.length > 0 ? (
          <div>
            {Problem.map((problem) => (
              <div
                key={problem._id}
                className="grid grid-cols-5 gap-4 py-2 border-b"
              >
                <div>{problem.problem_number}</div>
                <div>{problem.problem_name}</div>
                <div>{problem.platform}</div>
                <div>{problem.difficulty}</div>
                <div>
                  <a
                    href={problem.problem_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Link
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No problems found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPractice;
