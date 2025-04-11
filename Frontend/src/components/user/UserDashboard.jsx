// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export const UserDashboard = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const userId = localStorage.getItem('id');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const vehicleRes = await axios.get('/vehicles');
//       const reservationRes = await axios.get('/reservations');

//       console.log('Vehicles Response:', vehicleRes.data);
//       console.log('Reservations Response:', reservationRes.data);

//       const vehicleData = Array.isArray(vehicleRes.data) ? vehicleRes.data : [];
//       setVehicles(vehicleData.filter(v => v.userId && v.userId._id === userId));

//       const reservationData = reservationRes.data && reservationRes.data.data ? reservationRes.data.data : [];
//       setReservations(reservationData.filter(r => r.userId && r.userId._id === userId));
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       if (error.response && error.response.status === 401) {
//         console.log('Unauthorized, redirecting to login');
//         localStorage.clear();
//         navigate('/login');
//       }
//     }
//   };

//   return (
//     <div className="mt-16 p-8">
//       <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Your Vehicles</h2>
//           <p>Total Vehicles: {vehicles.length}</p>
//           <ul className="mt-2 space-y-2">
//             {vehicles.slice(0, 3).map(v => (
//               <li key={v._id}>{v.registrationNum} - {v.vehicleType}</li>
//             ))}
//           </ul>
//           {vehicles.length > 3 && <a href="/usersidebar/vehicles" className="text-blue-600 hover:underline">See All</a>}
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
//           <p>Total Bookings: {reservations.length}</p>
//           <ul className="mt-2 space-y-2">
//             {reservations.slice(0, 3).map(r => (
//               <li key={r._id}>{r.parkingId.title} - {new Date(r.date).toLocaleDateString()}</li>
//             ))}
//           </ul>
//           {reservations.length > 3 && <a href="/usersidebar/bookinghistory" className="text-blue-600 hover:underline">See All</a>}
//         </div>
//       </div>
//     </div>
  //);
// };

// import React, { useEffect, useState } from 'react';
// import axios from '../common/axios'; // Custom axios instance import karo
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; // Toast ke liye import

// export const UserDashboard = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Loading state add kiya
//   const userId = localStorage.getItem('id');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const vehicleRes = await axios.get('/vehicles');
//       const reservationRes = await axios.get('/reservations');

//       console.log('Vehicles Response:', vehicleRes.data);
//       console.log('Reservations Response:', reservationRes.data);

//       const vehicleData = Array.isArray(vehicleRes.data) ? vehicleRes.data : [];
//       setVehicles(vehicleData.filter(v => v.userId && v.userId._id === userId));

//       const reservationData = reservationRes.data && reservationRes.data.data ? reservationRes.data.data : [];
//       setReservations(reservationData.filter(r => r.userId && r.userId._id === userId));
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       if (error.response && error.response.status === 401) {
//         console.log('Unauthorized, redirecting to login');
//         localStorage.clear();
//         navigate('/login');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to load dashboard data'); // General error toast
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 p-8">
//       <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-4">Your Vehicles</h2>
//             <p>Total Vehicles: {vehicles.length}</p>
//             {vehicles.length > 0 ? (
//               <ul className="mt-2 space-y-2">
//                 {vehicles.slice(0, 3).map(v => (
//                   <li key={v._id}>{v.registrationNum} - {v.vehicleType}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="mt-2 text-gray-500">No vehicles found.</p>
//             )}
//             {vehicles.length > 3 && (
//               <a href="/usersidebar/vehicles" className="text-blue-600 hover:underline">See All</a>
//             )}
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
//             <p>Total Bookings: {reservations.length}</p>
//             {reservations.length > 0 ? (
//               <ul className="mt-2 space-y-2">
//                 {reservations.slice(0, 3).map(r => (
//                   <li key={r._id}>{r.parkingId.title} - {new Date(r.date).toLocaleDateString()}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="mt-2 text-gray-500">No recent bookings.</p>
//             )}
//             {reservations.length > 3 && (
//               <a href="/usersidebar/bookinghistory" className="text-blue-600 hover:underline">See All</a>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import axios from '../common/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaCar, FaParking, FaSyncAlt, FaPlusCircle, FaHistory, FaArrowRight } from 'react-icons/fa';

export const UserDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const vehicleRes = await axios.get('/vehicles');
      const reservationRes = await axios.get('/reservations');

      console.log('Vehicles Response:', vehicleRes.data);
      console.log('Reservations Response:', reservationRes.data);

      const vehicleData = Array.isArray(vehicleRes.data) ? vehicleRes.data : [];
      setVehicles(vehicleData.filter(v => v.userId && v.userId._id === userId));

      const reservationData = reservationRes.data && reservationRes.data.data ? reservationRes.data.data : [];
      setReservations(reservationData.filter(r => r.userId && r.userId._id === userId));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized, redirecting to login');
        localStorage.clear();
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to load dashboard data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 pt-16 pl-64 p-4 md:p-8 mt-18">
      {/* Changed pt-20 to pt-24 and added pl-64 for sidebar */}
      <div className="max-w-5xl mx-auto"> {/* Reduced from max-w-6xl to max-w-5xl for better alignment */}
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3">
              <FaParking className="text-blue-600" /> Welcome to Your Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Your one-stop hub for parking management</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchData}
            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <FaSyncAlt /> Refresh
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="relative">
              <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-blue-600">Loading...</span>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vehicles Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 flex items-center">
                <FaCar className="text-white text-3xl mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-white">Your Vehicles</h2>
                  <p className="text-white/80 text-sm">Total: <span className="font-semibold">{vehicles.length}</span></p>
                </div>
              </div>
              <div className="p-6">
                {vehicles.length > 0 ? (
                  <ul className="space-y-4">
                    {vehicles.slice(0, 3).map((v, i) => (
                      <motion.li
                        key={v._id}
                        custom={i}
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                      >
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FaCar className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{v.registrationNum}</p>
                          <p className="text-sm text-gray-600">{v.vehicleType}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center py-6">
                    <FaCar className="text-gray-300 text-4xl mb-3" />
                    <p className="text-gray-500">No vehicles found.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/usersidebar/vehicles/add')}
                      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition-all duration-300"
                    >
                      <FaPlusCircle /> Add Vehicle
                    </motion.button>
                  </div>
                )}
                {vehicles.length > 3 && (
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="/usersidebar/vehicles"
                    className="mt-4 flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                  >
                    See All <FaArrowRight className="ml-2" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Bookings Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5 flex items-center">
                <FaParking className="text-white text-3xl mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
                  <p className="text-white/80 text-sm">Total: <span className="font-semibold">{reservations.length}</span></p>
                </div>
              </div>
              <div className="p-6">
                {reservations.length > 0 ? (
                  <ul className="space-y-4">
                    {reservations.slice(0, 3).map((r, i) => (
                      <motion.li
                        key={r._id}
                        custom={i}
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors duration-300"
                      >
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <FaParking className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{r.parkingId.title}</p>
                          <p className="text-sm text-gray-600">{new Date(r.date).toLocaleDateString()}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center py-6">
                    <FaHistory className="text-gray-300 text-4xl mb-3" />
                    <p className="text-gray-500">No recent bookings.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/search')}
                      className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2 hover:bg-purple-600 transition-all duration-300"
                    >
                      <FaPlusCircle /> Book Now
                    </motion.button>
                  </div>
                )}
                {reservations.length > 3 && (
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="/usersidebar/bookinghistory"
                    className="mt-4 flex items-center justify-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
                  >
                    See All <FaArrowRight className="ml-2" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Quick Actions Bonus Section */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="md:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <FaPlusCircle className="text-blue-600" /> Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#dbeafe' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/usersidebar/vehicles')}
                  className="p-4 bg-blue-50 rounded-lg flex items-center justify-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-all duration-300"
                >
                  <FaCar /> Add Vehicle
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#f3e8ff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/usersidebar/bookparking')}
                  className="p-4 bg-purple-50 rounded-lg flex items-center justify-center gap-2 text-purple-700 font-medium hover:text-purple-800 transition-all duration-300"
                >
                  <FaParking /> Book Parking
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#dcfce7' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/usersidebar/bookinghistory')}
                  className="p-4 bg-green-50 rounded-lg flex items-center justify-center gap-2 text-green-700 font-medium hover:text-green-800 transition-all duration-300"
                >
                  <FaHistory /> View History
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};