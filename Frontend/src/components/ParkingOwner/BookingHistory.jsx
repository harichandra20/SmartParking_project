// import React, { useEffect, useState } from 'react';
// import axios from '../common/axios'; // Custom axios instance (adjust path)
// import { toast } from 'react-toastify'; // Toast notifications

// export const BookingHistory = () => {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state add kiya
//   const userId = localStorage.getItem('id');

//   useEffect(() => {
//     fetchReservations();
//   }, []);

//   const fetchReservations = async () => {
//     setLoading(true);
//     try {
//       const [parkingRes, res] = await Promise.all([
//         axios.get('/parking'),
//         axios.get('/reservations'),
//       ]);

//       console.log('User ID:', userId);
//       console.log('Parking Response:', parkingRes.data);
//       console.log('Reservations Response:', res.data);

//       // Validate parking response and get owner parking IDs
//       const parkingData = parkingRes.data?.data || [];
//       console.log('All Parking Owner IDs:', parkingData.map(p => ({ id: p._id, ownerId: p.ownerId?._id })));
//       const ownerParkings = parkingData
//         .filter(p => p.ownerId?._id === userId) // Null check for ownerId
//         .map(p => p._id);
//       console.log('Owner Parkings:', ownerParkings);

//       // Validate reservations response and filter
//       const reservationData = res.data?.data || [];
//       const filteredReservations = reservationData.filter(r => 
//         r.parkingId && ownerParkings.includes(r.parkingId._id) // Null check for parkingId
//       );
//       console.log('Filtered Reservations:', filteredReservations);

//       setReservations(filteredReservations);
//     } catch (error) {
//       console.error('Error fetching reservations:', error);
//       toast.error('Failed to load booking history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 p-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Parking Bookings</h1>
//       {loading ? (
//         <div className="text-center">
//           <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <p className="mt-2 text-gray-600">Loading bookings...</p>
//         </div>
//       ) : reservations.length > 0 ? (
//         <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b bg-gray-50">
//                 <th className="p-3 font-semibold text-gray-700">Parking</th>
//                 <th className="p-3 font-semibold text-gray-700">Vehicle</th>
//                 <th className="p-3 font-semibold text-gray-700">Slot</th>
//                 <th className="p-3 font-semibold text-gray-700">Date</th>
//                 <th className="p-3 font-semibold text-gray-700">Time</th>
//                 <th className="p-3 font-semibold text-gray-700">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reservations.map(r => (
//                 <tr key={r._id} className="border-b hover:bg-gray-100">
//                   <td className="p-3">{r.parkingId?.title || 'N/A'}</td>
//                   <td className="p-3">{r.vehicleId?.registrationNum || 'N/A'}</td>
//                   <td className="p-3">{typeof r.parkingSlotId === 'object' ? r.parkingSlotId?.slotNumber : r.parkingSlotId || 'N/A'}</td>
//                   <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
//                   <td className="p-3">{r.startTime} - {r.endTime}</td>
//                   <td className="p-3">{r.paymentStatus || 'Pending'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-600">No bookings found for your parkings.</p>
//       )}
//     </div>
//   );
// };

// export default BookingHistory;


import React, { useEffect, useState } from 'react';
import axios from '../common/axios'; // Custom axios instance
import { motion } from 'framer-motion'; // For animations
import { FaHistory, FaSpinner } from 'react-icons/fa'; // React Icons

export const BookingHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const [parkingRes, res] = await Promise.all([
        axios.get('/parking'),
        axios.get('/reservations'),
      ]);

      console.log('User ID:', userId);
      console.log('Parking Response:', parkingRes.data);
      console.log('Reservations Response:', res.data);

      const parkingData = parkingRes.data?.data || [];
      const ownerParkings = parkingData
        .filter(p => p.ownerId?._id === userId)
        .map(p => p._id);
      console.log('Owner Parkings:', ownerParkings);

      const reservationData = res.data?.data || [];
      const filteredReservations = reservationData.filter(r => 
        r.parkingId && ownerParkings.includes(r.parkingId._id)
      );
      console.log('Filtered Reservations:', filteredReservations);

      setReservations(filteredReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setMessage({ type: 'error', text: 'Failed to load booking history' });
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 pt-24 pl-64 p-4 md:p-8 mt-14">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3">
              <FaHistory className="text-blue-600" /> Your Parking Bookings
            </h1>
            <p className="text-gray-600 text-lg">View your parking booking history</p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6"
        >
          {message && (
            <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-32"
            >
              <FaSpinner className="animate-spin text-blue-600 text-3xl" />
              <p className="ml-2 text-gray-600">Loading bookings...</p>
            </motion.div>
          ) : reservations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3 font-semibold text-gray-700">Parking</th>
                    <th className="p-3 font-semibold text-gray-700">Vehicle</th>
                    <th className="p-3 font-semibold text-gray-700">Slot</th>
                    <th className="p-3 font-semibold text-gray-700">Date</th>
                    <th className="p-3 font-semibold text-gray-700">Time</th>
                    <th className="p-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r, i) => (
                    <motion.tr
                      key={r._id}
                      custom={i}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      className="border-b hover:bg-blue-50 transition-colors duration-200"
                    >
                      <td className="p-3">{r.parkingId?.title || 'N/A'}</td>
                      <td className="p-3">{r.vehicleId?.registrationNum || 'N/A'}</td>
                      <td className="p-3">{typeof r.parkingSlotId === 'object' ? r.parkingSlotId?.slotNumber : r.parkingSlotId || 'N/A'}</td>
                      <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="p-3">{r.startTime} - {r.endTime}</td>
                      <td className="p-3">{r.paymentStatus || 'Pending'}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-6 text-gray-500"
            >
              <FaHistory className="text-gray-300 text-4xl mb-3" />
              <p>No bookings found for your parkings.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingHistory;