// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { googleLogout } from "@react-oauth/google";

// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";
// import Chart from "react-apexcharts";
// import Cookies from "js-cookie";
// import axios from "axios";

// import Calendar from "react-calendar";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const authToken = Cookies.get("token");

// const Dashboard = () => {

//   const [date, setDate] = useState(new Date());
//   const [progressData, setProgressData] = useState(generateProgressData());

//   // profile update
//   // const [isPopupOpen, setPopupOpen] = useState(false);
//   const [user, setUser] = useState({
//     profilePhoto: "",
//     name: "",
//     email: "",
//     phone: "",
//     gender: "",
//     dob: "",
//   });
//   const [userId, setUserId] = useState(null);
//   const [statistics, setStatistics] = useState(null);
//   const [total, settotal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [chartConfig, setChartConfig] = useState({
//     type: "pie",
//     width: 280,
//     height: 280,
//     series: [17, 23, 12], // default values
//     options: {
//       chart: {
//         toolbar: {
//           show: false,
//         },
//       },
//       title: {
//         show: "",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       colors: ["#28a745", "#ffc107", "#dc3545"],
//       legend: {
//         show: false,
//       },
//     },
//   });
//   // dashboard pai chart data
//   useEffect(() => {
//     // fetchStatistics();
//     getProblemStatistics();
//     if (authToken) {
//       fetchUserId(authToken);
//     } else {
//       console.error("No auth token found");
//     }
//   }, [authToken]);

//   const fetchUserId = async (token) => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/user/verify-token`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUserId(response.data.userId); // Set userId from response
//       fetchStatistics(response.data.userId);
//       fetchUser(response.data.userId); // Fetch user data using the userId
//     } catch (error) {
//       console.error("Failed to fetch user ID:", error);
//     }
//   };

//   // pi graph data
//   const fetchStatistics = async (userId) => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/dashboard/statistics/${userId}`
//       );
//       const data = response.data;
//       setStatistics(data);

//       // Assuming data includes easy, medium, and hard counts
//       const { easy_count, medium_count, hard_count, daily_solved_count } = data;

//       // Update the chartConfig with the new values
//       setChartConfig((prevConfig) => ({
//         ...prevConfig,
//         series: [easy_count, medium_count, hard_count],
//       }));
//     } catch (error) {
//       console.error("Error fetching statistics:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // user details
//   const fetchUser = async (id) => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/profile/userprofile/${id}`
//       );
//       setUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // total problems
//   const getProblemStatistics = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/practice/statistics`
//       );
//       const data = response.data;
//       settotal(data);
//     } catch (error) {
//       console.error("Error fetching problem statistics:", error);
//       throw error;
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!statistics) {
//     return <div>No statistics available</div>;
//   }

//   const { daily_solved_count } = statistics;
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const seriesData = months.map((month) => daily_solved_count[month] || 0);

//   // logout
//   const logout = () => {
//     Cookies.remove("token");
//     googleLogout();
//     window.location.href = "/login"; // Use window.location.href for consistent behavior
//   };

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     // You can update progressData based on selected date here, if needed
//   };

//   // Function to generate mock progress data for the month
//   function generateProgressData() {
//     const data = Array.from({ length: 30 }, (_, index) => ({
//       day: `2024-11-${index + 1}`,
//       progress: Math.floor(Math.random() * 100), // Random progress between 0 and 100
//     }));
//     return data;
//   }

//   // Chart.js data for the line graph
//   const chartData = {
//     labels: progressData.map((data) => data.day),
//     datasets: [
//       {
//         label: "Progress",
//         data: progressData.map((data) => data.progress),
//         fill: false,
//         borderColor: "#42a5f5",
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <>
//       <button
//         data-drawer-target="default-sidebar"
//         data-drawer-toggle="default-sidebar"
//         aria-controls="default-sidebar"
//         type="button"
//         className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       >
//         <span className="sr-only">Open sidebar</span>
//         <svg
//           className="w-6 h-6"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             clipRule="evenodd"
//             fillRule="evenodd"
//             d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//           ></path>
//         </svg>
//       </button>

//       <aside
//         id="default-sidebar"
//         className="fixed top-15 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
//         aria-label="Sidebar"
//       >
//         <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//           <ul className="space-y-2 font-medium">
//             {user && (
//               <div className="flex flex-col items-center justify-center">
//                 <div className="relative">
//                    <Link to="/profile">
//                     <img
//                       src={`${process.env.REACT_APP_BASE_URL}${user.profilePhoto}`}
//                       alt={`${user.name}'s Profile`}
//                       className="w-32 h-32 rounded-full object-cover mb-1 border-2 border-indigo-500"
//                     />
//                     <svg
//                       className="absolute bottom-2 right-2 w-6 h-6 text-gray-800 bg-white p-1 rounded-full shadow"
//                       fill="currentColor"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       aria-hidden="true"
//                     >
//                       <path d="M17.414 2.586a2 2 0 0 0-2.828 0L13.5 3.672l3.828 3.828 1.086-1.086a2 2 0 0 0 0-2.828l-1-1zM12.172 5.828L4 14V16h2l8.172-8.172-2-2z" />
//                     </svg>
//                   </Link>
//                 </div>

//                 <div className="flex flex-col items-center mt-4">
//                   <h1 className="text-sm text-gray-100 dark:text-gray-100">
//                     {user.name}
//                   </h1>
//                   <h4 className="text-sm text-gray-100 dark:text-gray-100">
//                     {user.email}
//                   </h4>
//                 </div>
//               </div>
//             )}

//             <li>
//               <Link
//                 to="/notifications"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">
//                   Notification
//                 </span>
//                 <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
//                   3
//                 </span>
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/my-courses"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 18 20"
//                 >
//                   <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.057A2 2 0 0 0 2 19h14a2 2 0 0 0 1.914-1.943ZM6 4a2 2 0 0 1 4 0v1H6Zm2 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM3.2 11a.8.8 0 0 1-.8.8H2.8a.8.8 0 1 1 0-1.6h-.4a.8.8 0 0 1 .8.8Z" />
//                 </svg>
//                 <span className="flex-1 ms-3 whitespace-nowrap">My Course</span>
//               </Link>
//             </li>

//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
//                   <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
//                   <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
//                 </svg>
//                 <button
//                   className="flex-2 ms-3 whitespace-nowrap"
//                   onClick={logout}
//                 >
//                   Sign out
//                 </button>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </aside>

//       <div className="p-4 sm:ml-64">
//         <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div className="flex flex-col items-center">
//               <Card>
//                 <CardBody className="p-0">
//                   <div className="flex justify-center">
//                     <Chart {...chartConfig} />
//                   </div>
//                 </CardBody>
//                 <CardFooter className="flex justify-center">
//                   <div className="grid grid-cols-3 gap-1">
//                     <button className="bg-transparent hover:bg-green-700 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2 pr-10 pl-10">
//                       Easy
//                       <div className="text-blue-900 ">
//                         {statistics.easy_count}/
//                         {total ? total.easy : "Loading..."}
//                       </div>
//                     </button>
//                     <button className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded pr-10 pl-10">
//                       Medium
//                       <div className="text-blue-900 ">
//                         {statistics.medium_count}/
//                         {total ? total.medium : "Loading..."}
//                       </div>
//                     </button>
//                     <button className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-2 pr-10 pl-10">
//                       Hard
//                       <div className="text-blue-900 ">
//                         {statistics.hard_count}/
//                         {total ? total.hard : "Loading..."}
//                       </div>
//                     </button>
//                   </div>
//                 </CardFooter>
//               </Card>
//             </div>
//             <div className="flex flex-col items-center">
//               <LineChart
//                 xAxis={[
//                   {
//                     data: months,
//                     scaleType: "band",
//                   },
//                 ]}
//                 series={[
//                   {
//                     data: seriesData,
//                   },
//                 ]}
//                 height={300}
//                 width={400}
//               />
//               <h3 className="mt-3 text-center">Daily Progress</h3>
//             </div>

//                {/* Additional grapg  */}
//             <div className="flex flex-col md:flex-row gap-8 p-6">
//              {/* Calendar Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Select a Date</h2>
//         <Calendar
//           onChange={handleDateChange}
//           value={date}
//           className="w-full border rounded-lg"
//         />
//       </div>

//       {/* Progress Graph Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-2/3">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Progress Over Time</h2>
//         <div className="h-64">
//           <Line data={chartData} options={{ responsive: true }} />
//         </div>
//       </div>
//     </div>

//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import Calendar from "react-calendar";
import { Line } from "react-chartjs-2";
import ApexCharts from "react-apexcharts";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import MiniCalendar from "components/calendar/MiniCalendar";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const authToken = Cookies.get("token");

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [progressData, setProgressData] = useState(generateProgressData());
  const [user, setUser] = useState({
    profilePhoto: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });
  const [userId, setUserId] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartConfig, setChartConfig] = useState({
    type: "pie",
    width: 280,
    height: 280,
    series: [17, 23, 12], // default values
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#28a745", "#ffc107", "#dc3545"],
      legend: {
        show: false,
      },
    },
  });

  // dashboard pi chart data
  useEffect(() => {
    getProblemStatistics();
    if (authToken) { 
      fetchUserId(authToken);
    } else {
      console.error("No auth token found");
    }
  }, [authToken]);

  const fetchUserId = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/verify-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserId(response.data.userId); // Set userId from response
      fetchStatistics(response.data.userId);
      fetchUser(response.data.userId); // Fetch user data using the userId
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  };

  // pi graph data
  const fetchStatistics = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/dashboard/statistics/${userId}`
      );
      const data = response.data;
      setStatistics(data);

      // Assuming data includes easy, medium, and hard counts
      const { easy_count, medium_count, hard_count, daily_solved_count } = data;

      // Update the chartConfig with the new values
      setChartConfig((prevConfig) => ({
        ...prevConfig,
        series: [easy_count, medium_count, hard_count],
      }));
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  // user details
  const fetchUser = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/profile/userprofile/${id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // total problems
  const getProblemStatistics = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/practice/statistics`
      );
      const data = response.data;
      setTotal(data);
    } catch (error) {
      console.error("Error fetching problem statistics:", error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!statistics) {
    return <div>No statistics available</div>;
  }

  const { daily_solved_count } = statistics;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const seriesData = months.map((month) => daily_solved_count[month] || 0);

  // logout
  const logout = () => {
    Cookies.remove("token");
    googleLogout();
    window.location.href = "/login"; // Use window.location.href for consistent behavior
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // You can update progressData based on selected date here, if needed
  };

  // Function to generate mock progress data for the month
  function generateProgressData() {
    const data = Array.from({ length: 30 }, (_, index) => ({
      day: `2024-11-${index + 1}`,
      progress: Math.floor(Math.random() * 100), // Random progress between 0 and 100
    }));
    return data;
  }

  // Chart.js data for the line graph
  const chartData = {
    labels: progressData.map((data) => data.day),
    datasets: [
      {
        label: "Progress",
        data: progressData.map((data) => data.progress),
        fill: false,
        borderColor: "#42a5f5",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-15 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {user && (
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <Link to="/profile">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${user.profilePhoto}`}
                      alt={`${user.name}'s Profile`}
                      className="w-32 h-32 rounded-full object-cover mb-1 border-2 border-indigo-500"
                    />
                    <svg
                      className="absolute bottom-2 right-2 w-6 h-6 text-gray-800 bg-white p-1 rounded-full shadow"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M17.414 2.586a2 2 0 0 0-2.828 0L13.5 3.672l3.828 3.828 1.086-1.086a2 2 0 0 0 0-2.828l-1-1zM12.172 5.828L4 14V16h2l8.172-8.172-2-2z" />
                    </svg>
                  </Link>
                </div>

                <div className="flex flex-col items-center mt-4">
                  <h1 className="text-sm text-gray-100 dark:text-gray-100">
                    {user.name}
                  </h1>
                  <h2 className="text-sm text-gray-400">{user.email}</h2>
                </div>
              </div>
            )}
            <div>
              <li>
                <Link
                  to="/notifications"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Notification
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/my-courses"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.057A2 2 0 0 0 2 19h14a2 2 0 0 0 1.914-1.943ZM6 4a2 2 0 0 1 4 0v1H6Zm2 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM3.2 11a.8.8 0 0 1-.8.8H2.8a.8.8 0 1 1 0-1.6h-.4a.8.8 0 0 1 .8.8Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    My Course
                  </span>
                </Link>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <button
                    className="flex-2 ms-3 whitespace-nowrap"
                    onClick={logout}
                  >
                    Sign out
                  </button>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </aside>

      {/* Dashboard Content */}
      
      <div className="ml-64 px-6 py-6  bg-gray-200 dark:bg-gray-200">
        {/* <h2 className="text-2xl font-semibold mb-6">Dashboard</h2> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* User Statistics Chart */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold">User Statistics</h3>
            <div className="mt-4">
              <div id="chart" className="chart">
                <div>
                  <ApexCharts
                    options={chartConfig.options}
                    series={chartConfig.series}
                    type={chartConfig.type}
                    width={chartConfig.width}
                    height={chartConfig.height}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Progress</h3>
            <div className="mt-4">
              <Line data={chartData} options={{ responsive: true }} />
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Calendar</h3>
            <div className="mt-4">
              {/* <Calendar value={date} onChange={handleDateChange} /> */}
              {/* <MiniCalendar/> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
            </div>
          </div>
          
        </div>

        <div className="w-full h-full bg-white overflow-hidden relative shadow-mb p-4 rounded-lg">
      <img
        src="/dashboard.jpg"
        alt="Dashboard"
        className="w-full h-full object-cover object-left-top"
      />
    </div>
      </div>
    </>
  );
};

export default Dashboard;
