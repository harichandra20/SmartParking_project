// import React, { useEffect, useState } from 'react';
// import axios from '../common/axios'; // Custom axios instance (adjust path)
// import { toast } from 'react-toastify'; // Toast notifications
// import { Link } from 'react-router-dom';

// export const OwnerDashboard = () => {
//   const [parkings, setParkings] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state add kiya
//   const userId = localStorage.getItem('id');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [parkingRes, reservationRes] = await Promise.all([
//         axios.get('/parking'),
//         axios.get('/reservations'),
//       ]);

//       console.log('User ID:', userId);
//       console.log('Parking Response:', parkingRes.data);
//       console.log('Reservations Response:', reservationRes.data);

//       // Validate and filter parking data
//       const parkingData = parkingRes.data?.data || [];
//       const ownerParkings = parkingData.filter(p => p.ownerId?._id === userId); // Null check for ownerId
//       console.log('Owner Parkings:', ownerParkings);

//       // Validate and filter reservations data
//       const reservationData = reservationRes.data?.data || [];
//       const filteredReservations = reservationData.filter(r => 
//         r.parkingId && ownerParkings.some(p => p._id === r.parkingId._id)
//       ); // Null check for parkingId
//       console.log('Filtered Reservations:', filteredReservations);

//       setParkings(ownerParkings);
//       setReservations(filteredReservations);
//     } catch (error) {
//       console.error('Error fetching owner data:', error);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 p-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Owner Dashboard</h1>
//       {loading ? (
//         <div className="text-center">
//           <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <p className="mt-2 text-gray-600">Loading dashboard...</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Parkings Section */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Parkings</h2>
//             <p className="text-gray-600">Total Parkings: {parkings.length}</p>
//             {parkings.length > 0 ? (
//               <ul className="mt-2 space-y-2">
//                 {parkings.map(p => (
//                   <li key={p._id} className="text-gray-600">
//                     <span className="font-medium">{p.title}</span> - 
//                     2W: {p.availableTwoWheeler}/{p.totalCapacityTwoWheeler}, 
//                     4W: {p.availableFourWheeler}/{p.totalCapacityFourWheeler}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="mt-2 text-gray-500">No parkings added yet.</p>
//             )}
//           </div>

//           {/* Recent Bookings Section */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Bookings</h2>
//             <p className="text-gray-600">Total Bookings: {reservations.length}</p>
//             {reservations.length > 0 ? (
//               <>
//                 <ul className="mt-2 space-y-2">
//                   {reservations.slice(0, 3).map(r => (
//                     <li key={r._id} className="text-gray-600">
//                       <span className="font-medium">{r.parkingId?.title || 'N/A'}</span> - 
//                       {r.vehicleId?.registrationNum || 'N/A'} 
//                       ({new Date(r.date).toLocaleDateString()})
//                     </li>
//                   ))}
//                 </ul>
//                 {reservations.length > 3 && (
//                   <Link to="/ownersidebar/bookings" className="mt-2 inline-block text-blue-600 hover:underline">
//                     See All Bookings
//                   </Link>
//                 )}
//               </>
//             ) : (
//               <p className="mt-2 text-gray-500">No recent bookings.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OwnerDashboard;

import React, { useEffect, useState } from 'react';
import axios from '../common/axios'; // Custom axios instance
import { motion } from 'framer-motion'; // For animations
import { FaTachometerAlt, FaParking, FaHistory, FaSpinner, FaPlusCircle, FaSyncAlt, FaArrowRight } from 'react-icons/fa'; // React Icons
import { Link, useNavigate } from 'react-router-dom';

export const OwnerDashboard = () => {
  const [parkings, setParkings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [parkingRes, reservationRes] = await Promise.all([
        axios.get('/parking'),
        axios.get('/reservations'),
      ]);

      console.log('User ID:', userId);
      console.log('Parking Response:', parkingRes.data);
      console.log('Reservations Response:', reservationRes.data);

      const parkingData = parkingRes.data?.data || [];
      const ownerParkings = parkingData.filter(p => p.ownerId?._id === userId);
      console.log('Owner Parkings:', ownerParkings);

      const reservationData = reservationRes.data?.data || [];
      const filteredReservations = reservationData.filter(r => 
        r.parkingId && ownerParkings.some(p => p._id === r.parkingId._id)
      );
      console.log('Filtered Reservations:', filteredReservations);

      setParkings(ownerParkings);
      setReservations(filteredReservations);
    } catch (error) {
      console.error('Error fetching owner data:', error);
      setMessage({ type: 'error', text: 'Failed to load dashboard data' });
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized, redirecting to login');
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 pt-24 pl-64 p-4 md:p-8 mt-14">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3">
              <FaTachometerAlt className="text-blue-600" /> Owner Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage your parking spaces and bookings</p>
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

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="relative">
              <FaSpinner className="animate-spin text-blue-600 text-4xl" />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-blue-600">Loading...</span>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Parkings Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 flex items-center">
                <FaParking className="text-white text-3xl mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-white">Your Parkings</h2>
                  <p className="text-white/80 text-sm">Total: <span className="font-semibold">{parkings.length}</span></p>
                </div>
              </div>
              <div className="p-6">
                {parkings.length > 0 ? (
                  <ul className="space-y-4">
                    {parkings.slice(0, 3).map((p, i) => (
                      <motion.li
                        key={p._id}
                        custom={i}
                        variants={listItemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                      >
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FaParking className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{p.title}</p>
                          <p className="text-sm text-gray-600">
                            2W: {p.availableTwoWheeler}/{p.totalCapacityTwoWheeler}, 4W: {p.availableFourWheeler}/{p.totalCapacityFourWheeler}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center py-6">
                    <FaParking className="text-gray-300 text-4xl mb-3" />
                    <p className="text-gray-500">No parkings added yet.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/ownersidebar/addparking')}
                      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition-all duration-300"
                    >
                      <FaPlusCircle /> Add Parking
                    </motion.button>
                  </div>
                )}
                {parkings.length > 3 && (
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="/ownersidebar/parkings"
                    className="mt-4 flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                  >
                    See All <FaArrowRight className="ml-2" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Recent Bookings Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5 flex items-center">
                <FaHistory className="text-white text-3xl mr-4" />
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
                          <FaHistory className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{r.parkingId?.title || 'N/A'}</p>
                          <p className="text-sm text-gray-600">{new Date(r.date).toLocaleDateString()}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center py-6">
                    <FaHistory className="text-gray-300 text-4xl mb-3" />
                    <p className="text-gray-500">No recent bookings.</p>
                  </div>
                )}
                {reservations.length > 3 && (
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="/ownersidebar/bookings"
                    className="mt-4 flex items-center justify-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
                  >
                    See All <FaArrowRight className="ml-2" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Quick Actions Section */}
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
                  onClick={() => navigate('/ownersidebar/addparking')}
                  className="p-4 bg-blue-50 rounded-lg flex items-center justify-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-all duration-300"
                >
                  <FaParking /> Add Parking
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#f3e8ff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/ownersidebar/bookings')}
                  className="p-4 bg-purple-50 rounded-lg flex items-center justify-center gap-2 text-purple-700 font-medium hover:text-purple-800 transition-all duration-300"
                >
                  <FaHistory /> View Bookings
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#dcfce7' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchData}
                  className="p-4 bg-green-50 rounded-lg flex items-center justify-center gap-2 text-green-700 font-medium hover:text-green-800 transition-all duration-300"
                >
                  <FaSyncAlt /> Refresh Data
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;