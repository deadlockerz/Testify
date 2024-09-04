import React from "react";
import { NavLink } from "react-router-dom";

const ProductTable = ({ courses, handleDelete }) => {
  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                SN.
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Disc.
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item, i) => (
              <tr key={item._id} className="border-b bg-gray-50">
                <td className="px-6 py-4 font-medium whitespace-nowrap ">
                  {i + 1}
                </td>
                <td className="px-6 py-4">{item.course_name}</td>
                <td className="px-6 py-4">{item.course_disc}</td>
                <td className="px-6 py-4">{item.course_price}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                    <NavLink
                      to={`/admin_updatecourse/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
