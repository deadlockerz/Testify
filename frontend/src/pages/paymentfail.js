// PaymentFailed.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
        <motion.div
          className="text-6xl font-extrabold mb-4"
          animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          Payment Failed
        </motion.div>
        <p className="text-gray-700 mb-6">
          We encountered an issue with your payment. Please try again or contact support if the problem persists.
        </p>
        <Link to="/">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Back to home
        </button>

        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
