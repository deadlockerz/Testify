import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/fetchAllUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Registration Date</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Courses Bought</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="text-left py-3 px-4">{user.name}</td>
                  <td className="text-left py-3 px-4">{user.email}</td>
                  <td className="text-left py-3 px-4">{user.phone}</td>
                  <td className="text-left py-3 px-4">{user.registrationDate}</td>
                  {/* <td className="text-left py-3 px-4">
                    <ul className="list-disc list-inside">
                      {user.coursesBought.map(course => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
