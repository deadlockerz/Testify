import React from 'react';

const payments = [
  {
    id: 1,
    user: 'John Doe',
    email: 'john.doe@example.com',
    date: '2024-08-24',
    amount: '$120.00',
    transactionId: 'TXN123456',
    status: 'Completed',
  },
  {
    id: 2,
    user: 'Jane Smith',
    email: 'jane.smith@example.com',
    date: '2024-08-23',
    amount: '$75.00',
    transactionId: 'TXN654321',
    status: 'Pending',
  },
  {
    id: 3,
    user: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    date: '2024-08-22',
    amount: '$250.00',
    transactionId: 'TXN789012',
    status: 'Completed',
  },
];

const PaymentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">User Payments</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Amount</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Transaction ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td className="text-left py-3 px-4">{payment.user}</td>
                  <td className="text-left py-3 px-4">{payment.email}</td>
                  <td className="text-left py-3 px-4">{payment.date}</td>
                  <td className="text-left py-3 px-4">{payment.amount}</td>
                  <td className="text-left py-3 px-4">{payment.transactionId}</td>
                  <td className={`text-left py-3 px-4 font-semibold ${payment.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}` }>
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;

