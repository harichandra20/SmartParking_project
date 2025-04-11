// import axios from '../common/axios'; // Custom axios instance (adjust path)
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';

// const Reservation = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const [parkings, setParkings] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     Promise.all([
//       axios.get('/parking').then(res => {
//         console.log('Parking API Response:', res.data);
//         setParkings(res.data.data || []);
//       }),
//       axios.get('/vehicles').then(res => {
//         console.log('Vehicles API Response:', res.data);
//         const filteredVehicles = res.data.filter(v => v.userId && v.userId._id === localStorage.getItem('id'));
//         setVehicles(filteredVehicles);
//         console.log('Filtered Vehicles:', filteredVehicles);
//       })
//     ])
//       .catch(err => console.error('Fetch Error:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     console.log('Updated Parkings State:', parkings);
//     console.log('Updated Vehicles State:', vehicles);
//   }, [parkings, vehicles]);

//   const submitHandler = async (data) => {
//     setLoading(true);
//     setMessage(null);
//     data.userId = localStorage.getItem('id');

//     try {
//       const res = await axios.post('/reservations/add', data);
//       setMessage({ type: 'success', text: 'Reservation added successfully!' });
//       reset();
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Failed to add reservation: ' + (err.response?.data?.message || 'Unknown error') });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 px-6 py-8 max-w-4xl mx-auto">
//       <div className="bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Book a Parking Slot</h1>
//         {message && <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message.text}</div>}
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium">Parking</label>
//                 <select {...register('parkingId', { required: 'Parking is required' })} className="w-full p-2 border rounded">
//                   <option value="">Select Parking</option>
//                   {parkings.map(p => (
//                     <option key={p._id} value={p._id}>
//                       {p.title} (2W: {p.availableTwoWheeler}, 4W: {p.availableFourWheeler})
//                     </option>
//                   ))}
//                 </select>
//                 {errors.parkingId && <p className="text-red-500 text-xs">{errors.parkingId.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Vehicle</label>
//                 <select {...register('vehicleId', { required: 'Vehicle is required' })} className="w-full p-2 border rounded">
//                   <option value="">Select Vehicle</option>
//                   {vehicles.map(v => (
//                     <option key={v._id} value={v._id}>
//                       {v.registrationNum} ({v.vehicleType})
//                     </option>
//                   ))}
//                 </select>
//                 {errors.vehicleId && <p className="text-red-500 text-xs">{errors.vehicleId.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Date</label>
//                 <input type="date" {...register('date', { required: 'Date is required' })} className="w-full p-2 border rounded" />
//                 {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Start Time</label>
//                 <input type="time" {...register('startTime', { required: 'Start Time is required' })} className="w-full p-2 border rounded" />
//                 {errors.startTime && <p className="text-red-500 text-xs">{errors.startTime.message}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">End Time</label>
//                 <input type="time" {...register('endTime', { required: 'End Time is required' })} className="w-full p-2 border rounded" />
//                 {errors.endTime && <p className="text-red-500 text-xs">{errors.endTime.message}</p>}
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <button type="submit" className={`bg-blue-600 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
//                 {loading ? 'Booking...' : 'Book Now'}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reservation;

// import axios from '../common/axios'; // Custom axios instance (adjust path)
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion'; // For animations
// import { FaParking, FaCar, FaSpinner, FaCalendarAlt } from 'react-icons/fa'; // React Icons

// const Reservation = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const [parkings, setParkings] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     Promise.all([
//       axios.get('/parking').then(res => {
//         console.log('Parking API Response:', res.data);
//         setParkings(res.data.data || []);
//       }),
//       axios.get('/vehicles').then(res => {
//         console.log('Vehicles API Response:', res.data);
//         const filteredVehicles = res.data.filter(v => v.userId && v.userId._id === localStorage.getItem('id'));
//         setVehicles(filteredVehicles);
//         console.log('Filtered Vehicles:', filteredVehicles);
//       })
//     ])
//       .catch(err => console.error('Fetch Error:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     console.log('Updated Parkings State:', parkings);
//     console.log('Updated Vehicles State:', vehicles);
//   }, [parkings, vehicles]);

//   // New useEffect to handle message timeout
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage(null); // Clear the message after 3 seconds
//       }, 3000); // 3000ms = 3 seconds (you can adjust to 2000ms for 2 seconds)

//       // Cleanup the timeout if the component unmounts or message changes
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const submitHandler = async (data) => {
//     setLoading(true);
//     setMessage(null);
//     data.userId = localStorage.getItem('id');

//     try {
//       const res = await axios.post('/reservations/add', data);
//       setMessage({ type: 'success', text: 'Reservation added successfully!' });
//       reset();
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Failed to add reservation: ' + (err.response?.data?.message || 'Unknown error') });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Animation Variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
//     hover: { scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }
//   };

//   const formFieldVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: { delay: i * 0.1, duration: 0.4 }
//     })
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 pt-28 pl-64 p-4 md:p-8 mt-14">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="flex flex-col md:flex-row items-center justify-between mb-8"
//         >
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3">
//               <FaParking className="text-purple-600" /> Book a Parking Slot
//             </h1>
//             <p className="text-gray-600 text-lg">Reserve your parking spot with ease</p>
//           </div>
//         </motion.div>

//         <motion.div
//           variants={cardVariants}
//           initial="hidden"
//           animate="visible"
//           whileHover="hover"
//           className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6"
//         >
//           {/* Message display above the form */}
//           {message && (
//             <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//               {message.text}
//             </div>
//           )}

//           {loading ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex justify-center items-center h-32"
//             >
//               <FaSpinner className="animate-spin text-purple-600 text-3xl" />
//             </motion.div>
//           ) : (
//             <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate="visible">
//                   <label className="block font-medium text-gray-700">Parking</label>
//                   <select
//                     {...register('parkingId', { required: 'Parking is required' })}
//                     className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   >
//                     <option value="">Select Parking</option>
//                     {parkings.map(p => (
//                       <option key={p._id} value={p._id}>
//                         {p.title} (2W: {p.availableTwoWheeler}, 4W: {p.availableFourWheeler})
//                       </option>
//                     ))}
//                   </select>
//                   {errors.parkingId && <p className="text-red-500 text-sm mt-1">{errors.parkingId.message}</p>}
//                 </motion.div>
//                 <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate="visible">
//                   <label className="block font-medium text-gray-700">Vehicle</label>
//                   <select
//                     {...register('vehicleId', { required: 'Vehicle is required' })}
//                     className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   >
//                     <option value="">Select Vehicle</option>
//                     {vehicles.map(v => (
//                       <option key={v._id} value={v._id}>
//                         {v.registrationNum} ({v.vehicleType})
//                       </option>
//                     ))}
//                   </select>
//                   {errors.vehicleId && <p className="text-red-500 text-sm mt-1">{errors.vehicleId.message}</p>}
//                 </motion.div>
//                 <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate="visible">
//                   <label className="block font-medium text-gray-700">Date</label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       {...register('date', { required: 'Date is required' })}
//                       className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
//                     />
//                     <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   </div>
//                   {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
//                 </motion.div>
//                 <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate="visible">
//                   <label className="block font-medium text-gray-700">Start Time</label>
//                   <input
//                     type="time"
//                     {...register('startTime', { required: 'Start Time is required' })}
//                     className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                   {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
//                 </motion.div>
//                 <motion.div custom={4} variants={formFieldVariants} initial="hidden" animate="visible">
//                   <label className="block font-medium text-gray-700">End Time</label>
//                   <input
//                     type="time"
//                     {...register('endTime', { required: 'End Time is required' })}
//                     className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                   {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
//                 </motion.div>
//               </div>
//               <motion.div custom={5} variants={formFieldVariants} initial="hidden" animate="visible" className="flex justify-end">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   className={`bg-purple-600 text-white p-3 rounded-md font-medium flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   disabled={loading}
//                 >
//                   {loading ? <FaSpinner className="animate-spin" /> : <FaCar />} {loading ? 'Booking...' : 'Book Now'}
//                 </motion.button>
//               </motion.div>
//             </form>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Reservation;

/* Complete the Reservation.jsx component */

// import axios from '../common/axios';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { FaParking, FaCar, FaSpinner, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
       
// const Reservation = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
//   const [parkings, setParkings] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);
//   const [message, setMessage] = useState(null);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [order, setOrder] = useState(null); 
//   const [showPayment, setShowPayment] = useState(false); 
//   const [error, setError] = useState(null);
//   const [debugInfo, setDebugInfo] = useState(null);

//   const parkingId = watch('parkingId');
//   const vehicleId = watch('vehicleId');
//   const startTime = watch('startTime');
//   const endTime = watch('endTime');
      
//   useEffect(() => {
//     setFetchLoading(true);
//     setError(null);

//     const fetchParkings = axios.get('/parking')
//       .then(res => {
//         console.log('Parking API Response:', res.data);
//         setParkings(res.data.data || res.data || []);
//       })
//       .catch(err => {
//         console.error('Parking fetch error:', err);
//         setError('Failed to load parking data. Please try again.');
//       });  

//     const fetchVehicles = axios.get('/vehicles') 
//       .then(res => {
//         console.log('Vehicles API Response:', res.data);
//         const vehicleData = res.data.data || res.data || [];
//         const userId = localStorage.getItem('id');
//         const filteredVehicles = vehicleData.filter(v => v.userId && v.userId._id === userId);
//         setVehicles(filteredVehicles);
//         console.log('Filtered Vehicles:', filteredVehicles);
//         if (filteredVehicles.length === 0) {
//           setMessage({ type: 'warning', text: 'No vehicles found. Please add a vehicle first.' });
//         }
//       })
//       .catch(err => {
//         console.error('Vehicles fetch error:', err);  
//         setError('Failed to load vehicle data. Please try again.');
//       }); 

//     Promise.all([fetchParkings, fetchVehicles]).finally(() => setFetchLoading(false));
//   }, []);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(null), 8000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   useEffect(() => {
//     const calculateTotal = () => {
//       if (!parkingId || !vehicleId || !startTime || !endTime) {
//         setTotalAmount(0);
//         return;
//       }
//       const parking = parkings.find(p => p._id === parkingId);
//       const vehicle = vehicles.find(v => v._id === vehicleId);
//       if (!parking || !vehicle) return;
//       const start = new Date(`1970-01-01T${startTime}`);
//       const end = new Date(`1970-01-01T${endTime}`);
//       let durationHours = Math.max(1, Math.ceil((end < start ? (new Date(`1970-01-02T${endTime}`) - start) : (end - start)) / (1000 * 60 * 60)));
//       const isTwoWheeler = vehicle.vehicleType === '2 Wheeler';
//       const hourlyCharge = isTwoWheeler ? (parking.HourlyChargeTwoWheeler || 20) : (parking.HourlyChargeFourWheeler || 40);
//       setTotalAmount((hourlyCharge * durationHours) + 100);
//     }; 
//     calculateTotal(); 
//   }, [parkingId, vehicleId, startTime, endTime, parkings, vehicles]);

//   const handleBookNow = async (data) => {
//     try {
//       setLoading(true);
//       setMessage(null);
//       setError(null);
//       setDebugInfo(null);

//       if (!data.parkingId || !data.vehicleId || !data.date || !data.startTime || !data.endTime) {
//         throw new Error('Please fill all required fields');
//       }
//       data.userId = localStorage.getItem('id');
//       if (!data.userId) throw new Error('User not logged in. Please login again.');

//       console.log('Sending reservation data:', data);
//       const res = await axios.post('/reservations/add', data);
//       console.log('Reservation response:', res.data);

//       if (!res.data || !res.data.order) throw new Error('Invalid reservation response from server');
      
//       // Store the complete order information
//       setOrder({
//         id: res.data.order.id,
//         amount: res.data.order.amount,
//         currency: res.data.order.currency,
//         reservationId: res.data.order.reservationId || res.data.data._id,
//         key: res.data.key
//       });
      
//       setShowPayment(true);
//       setMessage({ type: 'success', text: 'Reservation created, proceed to pay!' });
//     } catch (err) {
//       console.error('Reservation Error:', err);
//       setDebugInfo({
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//         stack: err.stack,
//       });
//       setError(err.response?.data?.message || err.message || 'An unexpected error occurred during reservation');
//       setMessage({ type: 'error', text: 'Failed to create reservation: ' + (err.response?.data?.message || err.message || 'Server error') });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayNow = () => {
//     console.log('handlePayNow triggered with order:', order);
    
//     if (!order || !order.id) {
//       toast.error('Invalid order details');
//       return;
//     }
    
//     console.log('Initiating Razorpay payment with order details:', order);
    
//     // Check if Razorpay is already loaded
//     if (window.Razorpay) {
//       console.log('Razorpay SDK already available');
//       openRazorpayCheckout();
//     } else {
//       // If not, load it dynamically
//       console.log('Loading Razorpay SDK');
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = () => {
//         console.log('Razorpay SDK loaded');
//         openRazorpayCheckout();
//       };
//       document.body.appendChild(script);
//     }
//   };

//   const openRazorpayCheckout = () => {
//     // Get the selected parking for description
//     const selectedParking = parkings.find(p => p._id === parkingId);
    
//     // Use the key received from the server response
//     const key = order.key || 'rzp_test_BkFgzNAFm1iGyJ';
    
//     const options = {
//       key: key,
//       amount: order.amount,
//       currency: order.currency || 'INR',
//       name: 'Parking Reservation',
//       description: `Payment for parking slot${selectedParking ? ` at ${selectedParking.title}` : ''}`,
//       order_id: order.id,
//       prefill: {
//         name: 'Test User',
//         email: 'test@example.com',
//         contact: '+918511319906',
//       },
//       notes: {
//         reservation_id: order.reservationId
//       },
//       theme: {
//         color: '#3399cc'
//       },
//       modal: {
//         ondismiss: function() {
//           console.log('Checkout form closed');
//           toast.info('Payment cancelled');
//         }
//       },
//       handler: async function(response) {
//         console.log('Razorpay payment successful, response:', response);
//         try {
//           // Make sure all required fields are included
//           const verificationData = {
//             reservationId: order.reservationId,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature
//           };
          
//           console.log('Sending payment verification data:', verificationData);
          
//           const verificationResponse = await axios.post(
//             '/reservations/verify-payment',
//             verificationData,
//             {
//               headers: {
//                 'Content-Type': 'application/json'
//               }
//             }
//           );
          
//           console.log('Payment verification response:', verificationResponse.data);
          
//           if (verificationResponse.data.success) {
//             toast.success('Payment successful!');
//             navigate('/usersidebar/bookingHistory');
//           } else {
//             console.error('Payment verification failed:', verificationResponse.data.message);
//             toast.error(verificationResponse.data.message || 'Payment verification failed');
//           }
//         } catch (error) {
//           console.error('Error during payment verification:', error);
//           toast.error(error.response?.data?.message || 'Error verifying payment');
//         }
//       }
//     };
    
//     console.log('Razorpay options prepared:', options);
//     try {
//       const razorpayInstance = new window.Razorpay(options);
//       console.log('Razorpay instance created');
//       razorpayInstance.open();
//       console.log('Razorpay checkout opened');
//     } catch (error) {
//       console.error('Error opening Razorpay:', error);
//       toast.error('Failed to initialize payment. Please try again.');
//     }
//   };

//   const loadRazorpayScript = () => {   
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = resolve;
//       script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
//       document.body.appendChild(script);
//     });
//   };

//   const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }, hover: { scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)', transition: { duration: 0.3 } } };
//   const formFieldVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4 } }) };
//   const handleBackToForm = () => setShowPayment(false);

//   const DebugModal = ({ info, onClose }) => info ? (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-auto">
//         <h3 className="text-xl font-bold mb-4 flex items-center"><FaExclamationTriangle className="text-yellow-500 mr-2" /> Debug Information</h3>
//         <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm overflow-auto max-h-[50vh]">
//           <pre>{JSON.stringify(info, null, 2)}</pre>
//         </div>
//         <div className="flex justify-end">
//           <button onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Close</button>
//         </div>
//       </div>
//     </div>
//   ) : null;
        
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 pt-28 pl-64 p-4 md:p-8 mt-14">
//       {debugInfo && <DebugModal info={debugInfo} onClose={() => setDebugInfo(null)} />}
//       <div className="max-w-4xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-col md:flex-row items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3"><FaParking className="text-purple-600" /> Book a Parking Slot</h1>
//             <p className="text-gray-600 text-lg">Reserve your parking spot with ease</p>
//           </div>
//         </motion.div>

//         <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
//           {message && <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : message.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{message.text}</div>}
//           {error && <div className="p-4 mb-4 rounded bg-orange-100 text-orange-700 border border-orange-200">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="font-bold">Error:</p>
//                 <p>{error}</p>
//               </div>
//               {debugInfo && <button onClick={() => setDebugInfo(null)} className="text-xs bg-orange-200 hover:bg-orange-300 px-2 py-1 rounded">Hide Debug Info</button>}
//             </div>
//           </div>}
//           {fetchLoading ? (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64">
//               <FaSpinner className="animate-spin text-purple-600 text-3xl mb-4" />
//               <p className="text-gray-600">Loading parking data...</p>
//             </motion.div>
//           ) : (
//             <>
//               {!showPayment ? (
//                 <form onSubmit={handleSubmit(handleBookNow)} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate="visible">
//                       <label className="block font-medium text-gray-700">Parking</label>
//                       <select {...register('parkingId', { required: 'Parking is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" disabled={parkings.length === 0}>
//                         <option value="">Select Parking</option>
//                         {parkings.map(p => <option key={p._id} value={p._id}>{p.title} (2W: {p.availableTwoWheeler || 0}, 4W: {p.availableFourWheeler || 0})</option>)}
//                       </select>
//                       {errors.parkingId && <p className="text-red-500 text-sm mt-1">{errors.parkingId.message}</p>}
//                       {parkings.length === 0 && <p className="text-yellow-600 text-sm mt-1">No parking locations available</p>}
//                     </motion.div>
//                     <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate="visible">
//                       <label className="block font-medium text-gray-700">Vehicle</label>
//                       <select {...register('vehicleId', { required: 'Vehicle is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" disabled={vehicles.length === 0}>
//                         <option value="">Select Vehicle</option>
//                         {vehicles.map(v => <option key={v._id} value={v._id}>{v.registrationNum} ({v.vehicleType})</option>)}
//                       </select>
//                       {errors.vehicleId && <p className="text-red-500 text-sm mt-1">{errors.vehicleId.message}</p>}
//                       {vehicles.length === 0 && <p className="text-yellow-600 text-sm mt-1">No vehicles found. <a href="/vehicles/add" className="underline">Add a vehicle</a> first.</p>}
//                     </motion.div>
//                     <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate="visible">
//                       <label className="block font-medium text-gray-700">Date</label>
//                       <div className="relative">
//                         <input type="date" {...register('date', { required: 'Date is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10" min={new Date().toISOString().split('T')[0]} />
//                         <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                       </div>
//                       {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
//                     </motion.div>
//                     <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate="visible">
//                       <label className="block font-medium text-gray-700">Start Time</label>
//                       <input type="time" {...register('startTime', { required: 'Start Time is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
//                       {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
//                     </motion.div>
//                     <motion.div custom={4} variants={formFieldVariants} initial="hidden" animate="visible">
//                       <label className="block font-medium text-gray-700">End Time</label>
//                       <input type="time" {...register('endTime', { required: 'End Time is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
//                       {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
//                     </motion.div>
//                   </div> 
//                   {totalAmount > 0 && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
//                       <h3 className="text-lg font-semibold text-blue-800 mb-2">Parking Fee Details</h3>
//                       <div className="flex justify-between items-center text-gray-700"><span>Hourly Parking Charge:</span><span>₹{totalAmount - 100}</span></div>
//                       <div className="flex justify-between items-center text-gray-700 mt-1"><span>Security Deposit:</span><span>₹100</span></div>
//                       <div className="h-px bg-blue-200 my-2"></div>
//                       <div className="flex justify-between items-center font-bold text-blue-900"><span>Total Amount:</span><span>₹{totalAmount}</span></div>
//                     </motion.div> 
//                   )}
//                   <div className="flex justify-end mt-6">
//                     <button type="submit" disabled={loading || vehicles.length === 0 || parkings.length === 0} className={`px-8 py-3 rounded-md bg-purple-600 text-white font-medium flex items-center ${loading || vehicles.length === 0 || parkings.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:shadow-lg'}`}>
//                       {loading ? <><FaSpinner className="animate-spin mr-2" /> Processing...</> : <>Book Now <FaCar className="ml-2" /></>}
//                     </button>
//                   </div>
//                 </form> 
//               ) : ( 
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//                   <div className="bg-green-50 p-6 rounded-lg border border-green-100">
//                     <h3 className="text-xl font-bold text-green-800 mb-4">Reservation Created Successfully!</h3>
//                     <p className="text-gray-700 mb-4">Your reservation has been created. Please complete the payment to confirm your booking.</p>
//                     <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
//                       <h4 className="font-semibold text-gray-800 mb-2">Reservation Details</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                         <div><span className="font-medium text-gray-500">Reservation ID:</span><span className="ml-2 text-gray-800">{order?.reservationId || 'Processing...'}</span></div>
//                         <div><span className="font-medium text-gray-500">Amount:</span><span className="ml-2 text-gray-800">₹{order?.amount ? (order.amount / 100) : totalAmount}</span></div>
//                       </div>
//                     </div>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-end">
//                       <button onClick={handleBackToForm} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" disabled={loading}>Back to Form</button>
//                       <button onClick={handlePayNow} className={`px-8 py-3 rounded-md bg-green-600 text-white font-medium flex items-center justify-center hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
//                         {loading ? <><FaSpinner className="animate-spin mr-2" /> Processing...</> : <>Pay Now ₹{order?.amount ? (order.amount / 100) : totalAmount}</>}
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </>       
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Reservation; 
import axios from '../common/axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { QRCodeCanvas } from 'qrcode.react';
import { FaParking, FaCar, FaSpinner, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const [parkings, setParkings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [order, setOrder] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const parkingId = watch('parkingId');
  const vehicleId = watch('vehicleId');
  const startTime = watch('startTime');
  const endTime = watch('endTime');

  useEffect(() => {
    setFetchLoading(true);
    setError(null);

    const fetchParkings = axios.get('/parking')
      .then(res => {
        console.log('Parking API Response:', res.data);
        setParkings(res.data.data || res.data || []);
      })
      .catch(err => {
        console.error('Parking fetch error:', err);
        setError('Failed to load parking data. Please try again.');
      });

    const fetchVehicles = axios.get('/vehicles')
      .then(res => {
        console.log('Vehicles API Response:', res.data);
        const vehicleData = res.data.data || res.data || [];
        const userId = localStorage.getItem('id');
        const filteredVehicles = vehicleData.filter(v => v.userId && v.userId._id === userId);
        setVehicles(filteredVehicles);
        console.log('Filtered Vehicles:', filteredVehicles);
        if (filteredVehicles.length === 0) {
          setMessage({ type: 'warning', text: 'No vehicles found. Please add a vehicle first.' });
        }
      })
      .catch(err => {
        console.error('Vehicles fetch error:', err);
        setError('Failed to load vehicle data. Please try again.');
      });

    Promise.all([fetchParkings, fetchVehicles]).finally(() => setFetchLoading(false));
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const calculateTotal = () => {
      if (!parkingId || !vehicleId || !startTime || !endTime) {
        setTotalAmount(0);
        return;
      }
      const parking = parkings.find(p => p._id === parkingId);
      const vehicle = vehicles.find(v => v._id === vehicleId);
      if (!parking || !vehicle) return;
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      let durationHours = Math.max(1, Math.ceil((end < start ? (new Date(`1970-01-02T${endTime}`) - start) : (end - start)) / (1000 * 60 * 60)));
      const isTwoWheeler = vehicle.vehicleType === '2 Wheeler';
      const hourlyCharge = isTwoWheeler ? (parking.HourlyChargeTwoWheeler || 20) : (parking.HourlyChargeFourWheeler || 40);
      setTotalAmount((hourlyCharge * durationHours) + 100);
    };
    calculateTotal();
  }, [parkingId, vehicleId, startTime, endTime, parkings, vehicles]);

  const handleBookNow = async (data) => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);
      setDebugInfo(null);

      if (!data.parkingId || !data.vehicleId || !data.date || !data.startTime || !data.endTime) {
        throw new Error('Please fill all required fields');
      }
      data.userId = localStorage.getItem('id');
      if (!data.userId) throw new Error('User not logged in. Please login again.');

      console.log('Sending reservation data:', data);
      const res = await axios.post('/reservations/add', data);
      console.log('Reservation response:', res.data);

      if (!res.data || !res.data.order) throw new Error('Invalid reservation response from server');

      setOrder({
        id: res.data.order.id,
        amount: res.data.order.amount,
        currency: res.data.order.currency,
        reservationId: res.data.order.reservationId || res.data.data._id,
        key: res.data.key,
      });
      setQrCode(res.data.qrCode); // qrCode is now a JSON string
      setShowPayment(true);
      setMessage({ type: 'success', text: 'Reservation created, proceed to pay!' });
    } catch (err) {
      console.error('Reservation Error:', err);
      setDebugInfo({
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred during reservation');
      setMessage({ type: 'error', text: 'Failed to create reservation: ' + (err.response?.data?.message || err.message || 'Server error') });
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = () => {
    if (!order || !order.id) {
      toast.error('Invalid order details');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => openRazorpayCheckout();
    document.body.appendChild(script);
  };

  const openRazorpayCheckout = () => {
    const selectedParking = parkings.find(p => p._id === parkingId);
    const options = {
      key: order.key || 'rzp_test_BkFgzNAFm1iGyJ',
      amount: order.amount,
      currency: order.currency || 'INR',
      name: 'Parking Reservation',
      description: `Payment for parking slot${selectedParking ? ` at ${selectedParking.title}` : ''}`,
      order_id: order.id,
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '+918511319906',
      },
      notes: {
        reservation_id: order.reservationId,
      },
      theme: {
        color: '#3399cc',
      },
      handler: async (response) => {
        try {
          const verificationData = {
            reservationId: order.reservationId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const verificationResponse = await axios.post('/reservations/verify-payment', verificationData);
          if (verificationResponse.data.success) {
            toast.success('Payment successful!');
            setQrCode(verificationResponse.data.qrCode); // Store updated QR code
            setMessage({ type: 'success', text: 'Payment successful! QR code sent to your email.' });
            navigate('/usersidebar/bookingHistory');
          } else {
            toast.error(verificationResponse.data.message || 'Payment verification failed');
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Error verifying payment');
        }
      },
      modal: {
        ondismiss: () => toast.info('Payment cancelled'),
      },
    };
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }, hover: { scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)', transition: { duration: 0.3 } } };
  const formFieldVariants = { hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4 } }) };

  const handleBackToForm = () => {
    setShowPayment(false);
    setQrCode(null);
  };

  const DebugModal = ({ info, onClose }) => info ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-auto">
        <h3 className="text-xl font-bold mb-4 flex items-center"><FaExclamationTriangle className="text-yellow-500 mr-2" /> Debug Information</h3>
        <pre className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm overflow-auto max-h-[50vh]">{JSON.stringify(info, null, 2)}</pre>
        <button onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Close</button>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 pt-28 pl-64 p-4 md:p-8 mt-14">
      {debugInfo && <DebugModal info={debugInfo} onClose={() => setDebugInfo(null)} />}
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-3"><FaParking className="text-purple-600" /> Book a Parking Slot</h1>
            <p className="text-gray-600 text-lg">Reserve your parking spot with ease</p>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
          {message && <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : message.type === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{message.text}</div>}
          {error && <div className="p-4 mb-4 rounded bg-orange-100 text-orange-700 border border-orange-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
              {debugInfo && <button onClick={() => setDebugInfo(debugInfo)} className="text-xs bg-orange-200 hover:bg-orange-300 px-2 py-1 rounded">Show Debug Info</button>}
            </div>
          </div>}

          {fetchLoading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64">
              <FaSpinner className="animate-spin text-purple-600 text-3xl mb-4" />
              <p className="text-gray-600">Loading parking data...</p>
            </motion.div>
          ) : (
            <>
              {!showPayment ? (
                <form onSubmit={handleSubmit(handleBookNow)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate="visible">
                      <label className="block font-medium text-gray-700">Parking</label>
                      <select {...register('parkingId', { required: 'Parking is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" disabled={parkings.length === 0}>
                        <option value="">Select Parking</option>
                        {parkings.map(p => <option key={p._id} value={p._id}>{p.title} (2W: {p.availableTwoWheeler || 0}, 4W: {p.availableFourWheeler || 0})</option>)}
                      </select>
                      {errors.parkingId && <p className="text-red-500 text-sm mt-1">{errors.parkingId.message}</p>}
                      {parkings.length === 0 && <p className="text-yellow-600 text-sm mt-1">No parking locations available</p>}
                    </motion.div>
                    <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate="visible">
                      <label className="block font-medium text-gray-700">Vehicle</label>
                      <select {...register('vehicleId', { required: 'Vehicle is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" disabled={vehicles.length === 0}>
                        <option value="">Select Vehicle</option>
                        {vehicles.map(v => <option key={v._id} value={v._id}>{v.registrationNum} ({v.vehicleType})</option>)}
                      </select>
                      {errors.vehicleId && <p className="text-red-500 text-sm mt-1">{errors.vehicleId.message}</p>}
                      {vehicles.length === 0 && <p className="text-yellow-600 text-sm mt-1">No vehicles found. <a href="/usersidebar/vehicle" className="underline">Add a vehicle</a> first.</p>}
                    </motion.div>
                    <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate="visible">
                      <label className="block font-medium text-gray-700">Date</label>
                      <div className="relative">
                        <input type="date" {...register('date', { required: 'Date is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10" min={new Date().toISOString().split('T')[0]} />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                    </motion.div>
                    <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate="visible">
                      <label className="block font-medium text-gray-700">Start Time</label>
                      <input type="time" {...register('startTime', { required: 'Start Time is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
                    </motion.div>
                    <motion.div custom={4} variants={formFieldVariants} initial="hidden" animate="visible">
                      <label className="block font-medium text-gray-700">End Time</label>
                      <input type="time" {...register('endTime', { required: 'End Time is required' })} className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
                    </motion.div>
                  </div>
                  {totalAmount > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Parking Fee Details</h3>
                      <div className="flex justify-between items-center text-gray-700"><span>Hourly Parking Charge:</span><span>₹{totalAmount - 100}</span></div>
                      <div className="flex justify-between items-center text-gray-700 mt-1"><span>Security Deposit:</span><span>₹100</span></div>
                      <div className="h-px bg-blue-200 my-2"></div>
                      <div className="flex justify-between items-center font-bold text-blue-900"><span>Total Amount:</span><span>₹{totalAmount}</span></div>
                    </motion.div>
                  )}
                  <div className="flex justify-end mt-6">
                    <button type="submit" disabled={loading || vehicles.length === 0 || parkings.length === 0} className={`px-8 py-3 rounded-md bg-purple-600 text-white font-medium flex items-center ${loading || vehicles.length === 0 || parkings.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:shadow-lg'}`}>
                      {loading ? <><FaSpinner className="animate-spin mr-2" /> Processing...</> : <>Book Now <FaCar className="ml-2" /></>}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <h3 className="text-xl font-bold text-green-800 mb-4">Reservation Created Successfully!</h3>
                    <p className="text-gray-700 mb-4">Your reservation has been created. Please complete the payment to confirm your booking.</p>
                    {qrCode && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Your QR Code</h4>
                        <img src={qrCode} alt="QR Code" style={{ width: "200px" }} />
                        <p className="text-sm text-gray-600 mt-2">Show this QR code to the security guard for verification after payment.</p>
                      </div>
                    )}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Reservation Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div><span className="font-medium text-gray-500">Reservation ID:</span><span className="ml-2 text-gray-800">{order?.reservationId || 'Processing...'}</span></div>
                        <div><span className="font-medium text-gray-500">Amount:</span><span className="ml-2 text-gray-800">₹{order?.amount ? (order.amount / 100) : totalAmount}</span></div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                      <button onClick={handleBackToForm} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" disabled={loading}>Back to Form</button>
                      <button onClick={handlePayNow} className={`px-8 py-3 rounded-md bg-green-600 text-white font-medium flex items-center justify-center hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                        {loading ? <><FaSpinner className="animate-spin mr-2" /> Processing...</> : <>Pay Now ₹{order?.amount ? (order.amount / 100) : totalAmount}</>}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Reservation;