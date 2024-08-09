import React, { useEffect, useState } from "react";
import axios from "axios";
// import ProductTable from "../components/ProductTable";


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
        "http://localhost:3030/add-problem",
        inputProblem
      );
      console.log(res);
      fetchAllProblem();
      setInputProblem({});
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const fetchAllProblem = async () => {
    try {
      const res = await axios.get("http://localhost:3030//readallproblems");
      setProblem(res.data);
    } catch (error) {
      console.error("Error fetching Problem:", error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await axios.delete(
  //       `http://localhost:3030/deletecourse/${id}`
  //     );
  //     if (res.status === 200) {
  //       fetchAllProblem();
  //     }
  //   } catch (error) {
  //     console.error("Error deleting course:", error);
  //   }
  // };

  useEffect(() => {
    fetchAllProblem();
  }, []);

  return (
    <div className="w-full md:w-2/3 mx-auto mt-5 px-4">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-2xl font-bold mb-4">Add Problem</h1>
        <div className="mb-4">
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
        </div>
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
            placeholder="Enter problem number"
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
          <label className="text-sm text-gray-500">Status</label>
          <input
            type="text"
            name="status"
            className="block w-full py-2.5 px-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded"
            placeholder="Enter status"
            required
            value={inputProblem.status || ""}
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

      {/* <ProductTable Problem={Problem} handleDelete={handleDelete} /> */}
    </div>
  );
};

export default AdminPractice;
