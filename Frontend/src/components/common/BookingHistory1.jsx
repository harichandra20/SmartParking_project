// import React, { useEffect, useState } from 'react';
// import axios from './axios'; // Adjust path to your axios instance

// export const BookingHistory1 = () => {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state add kiya
//   const role = localStorage.getItem('role');
//   const userId = localStorage.getItem('id');

//   useEffect(() => {
//     fetchReservations();
//   }, []);

//   const fetchReservations = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('/reservations');
//       console.log('API Response:', res.data);

//       const reservationData = res.data.data || []; // Fallback to empty array if data is undefined

//       if (role === 'User') {
//         setReservations(
//           reservationData.filter(r => r.userId && r.userId._id === userId) // Null check for userId
//         );
//       } else if (role === 'ParkingOwner') {
//         const parkingRes = await axios.get('/parking');
//         console.log('Parking Response:', parkingRes.data);
//         const ownerParkings = (parkingRes.data.data || [])
//           .filter(p => p.ownerId === userId)
//           .map(p => p._id);
//         setReservations(
//           reservationData.filter(r => r.parkingId && ownerParkings.includes(r.parkingId._id)) // Null check for parkingId
//         );
//       } else if (role === 'Admin') {
//         setReservations(reservationData); // Admin ke liye sab reservations
//       }
//     } catch (error) {
//       console.error('Error fetching reservations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 p-8">
//       <h1 className="text-2xl font-bold mb-6">Booking History</h1>
//       {loading ? (
//         <p>Loading reservations...</p>
//       ) : reservations.length > 0 ? (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b">
//                 <th className="p-2">Parking</th>
//                 <th className="p-2">Vehicle</th>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Time</th>
//                 <th className="p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reservations.map(r => (
//                 <tr key={r._id} className="border-b">
//                   <td className="p-2">{r.parkingId?.title || 'N/A'}</td>
//                   <td className="p-2">{r.vehicleId?.registrationNum || 'N/A'}</td>
//                   <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
//                   <td className="p-2">{r.startTime} - {r.endTime}</td>
//                   <td className="p-2">{r.paymentStatus || 'Pending'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default BookingHistory1;
import React, { useEffect, useState } from 'react';
import axios from '../common/axios';
import { motion } from 'framer-motion';
import { FaHistory, FaSpinner } from 'react-icons/fa';

export const BookingHistory1 = () => {
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
      const res = await axios.get(`/reservations/user/${userId}`); // Use user-specific endpoint
      const reservationData = res.data.data || [];

      const updatedReservations = await Promise.all(
        reservationData.map(async (r) => {
          if (r.paymentStatus === 'Completed') {
            const qrRes = await axios.get(`/reservations/${r._id}/qr-code`);
            return { ...r, qrCode: qrRes.data.qrCode };
          }
          return r;
        })
      );
      setReservations(updatedReservations);
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
                    <th className="p-3 font-semibold text-gray-700">QR Code</th>
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
                      <td className="p-3">
                        {r.qrCode && <img src={r.qrCode} alt="QR Code" style={{ width: '100px' }} />}
                      </td>
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

export default BookingHistory1;