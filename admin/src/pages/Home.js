import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Users Management */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Users</h2>
            <p className="text-gray-600 mb-6">View, edit, or delete user accounts.</p>
            <Link
              to="/admin/users"
              className="px-4 py-2 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600"
            >
              View Users
            </Link>
          </div>

          {/* Payments Management */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Payments</h2>
            <p className="text-gray-600 mb-6">Track and manage all user payments.</p>
            <Link
              to="/admin/payments"
              className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600"
            >
              View Payments
            </Link>
          </div>

          {/* Courses Management */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Courses</h2>
            <p className="text-gray-600 mb-6">Add, update, or remove courses available to users.</p>
            <Link
              to="/admin/courses"
              className="px-4 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
            >
              View Courses
            </Link>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <p className="text-gray-600 mb-6">Check all recent notifications and updates.</p>
            <Link
              to="/admin/notifications"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
            >
              View Notifications
            </Link>
          </div>

          {/* Settings */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600 mb-6">Configure your account and system settings.</p>
            <Link
              to="/admin/settings"
              className="px-4 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
            >
              View Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign Out</h2>
            <p className="text-gray-600 mb-6">Sign out of your admin account securely.</p>
            <button
              className="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
              onClick={() => {
                // Sign out logic here
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
