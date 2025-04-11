// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from '../common/axios'; // Custom axios instance (adjust path)
// import { Toaster, toast } from 'react-hot-toast';

// export const Vehicale = () =>{
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const [userId, setUserId] = useState('');
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('id');
//     const token = localStorage.getItem('token');
  
//     if (storedUserId && token) {
//       setUserId(storedUserId);
//       fetchVehicles(storedUserId);
//     } else {
//       console.log('No userId or token found, skipping fetchVehicles');
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     console.log('Updated vehicles state:', vehicles);
//   }, [vehicles]);

//   const fetchVehicles = async (id) => {
//     try {
//       const res = await axios.get('/vehicles');
//       console.log('API Response:', res.data);
//       const filteredVehicles = res.data.filter(v => v.userId && v.userId._id === id);
//       setVehicles(filteredVehicles);
//       console.log('Filtered vehicles:', filteredVehicles);
//     } catch (error) {
//       console.error('Error fetching vehicles:', error.response?.data || error.message);
//       toast.error('Failed to fetch vehicles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       data.userId = userId;
//       const response = await axios.post('/vehicles/add', data);
//       if (response.status === 200) {
//         toast.success('Vehicle added successfully!');
//         reset();
//         fetchVehicles(userId);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-16">
//       <Toaster position="top-right" reverseOrder={false} />
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Vehicles</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
//         <div>
//           <label className="block font-medium text-gray-700">Registration Number</label>
//           <input
//             {...register('registrationNum', { required: 'Registration Number is required' })}
//             className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//             placeholder="Enter registration number"
//           />
//           {errors.registrationNum && <p className="text-red-500 text-sm mt-1">{errors.registrationNum.message}</p>}
//         </div>
//         <div>
//           <label className="block font-medium text-gray-700">Vehicle Type</label>
//           <select
//             {...register('vehicleType', { required: 'Vehicle Type is required' })}
//             className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//           >
//             <option value="">Select Type</option>
//             <option value="2 Wheeler">2 Wheeler</option>
//             <option value="4 Wheeler">4 Wheeler</option>
//             <option value="SUV">SUV</option>
//           </select>
//           {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>}
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-teal-500 text-white p-3 rounded-md font-medium hover:bg-teal-600 transition duration-200"
//         >
//           Add Vehicle
//         </button>
//       </form>
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Vehicles</h3>
//       {loading ? (
//         <p>Loading vehicles...</p>
//       ) : vehicles.length > 0 ? (
//         <ul className="space-y-3">
//           {vehicles.map(v => (
//             <li
//               key={v._id}
//               className="p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 flex justify-between items-center"
//             >
//               <span>{v.registrationNum} - {v.vehicleType}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-600">No vehicles added yet.</p>
//       )}
//     </div>
//   );
// }
       
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../common/axios';
import { motion } from 'framer-motion'; // For animations
import { FaCar, FaPlusCircle, FaSpinner, FaTrash } from 'react-icons/fa'; // React Icons

export const Vehicale = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [userId, setUserId] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // New state for messages
      
  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    if (storedUserId && token) {
      setUserId(storedUserId);
      fetchVehicles(storedUserId);
    } else {
      console.log('No userId or token found, skipping fetchVehicles');
      setLoading(false);
    }
  }, []);    

  useEffect(() => {
    console.log('Updated vehicles state:', vehicles);
  }, [vehicles]);  

  // New useEffect to handle message timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); // Clear the message after 3 seconds
      }, 3000); // 3000ms = 3 seconds (adjust to 2000ms for 2 seconds if needed)

      // Cleanup the timeout if the component unmounts or message changes
      return () => clearTimeout(timer);
    }
  }, [message]);
    
  const fetchVehicles = async (id) => {
    try {
      const res = await axios.get('/vehicles');
      console.log('API Response:', res.data);
      const filteredVehicles = res.data.filter(v => v.userId && v.userId._id === id);
      setVehicles(filteredVehicles);
      console.log('Filtered vehicles:', filteredVehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error.response?.data || error.message);
      setMessage({ type: 'error', text: 'Failed to fetch vehicles' });
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (data) => {
    try {
      data.userId = userId;
      const response = await axios.post('/vehicles/add', data);
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'Vehicle added successfully!' });
        reset();
        fetchVehicles(userId);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong' });
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

  // Dummy delete function (replace with actual API call)
  const handleDelete = async (vehicleId) => {
    try {
      console.log('Deleting vehicle with ID:', vehicleId);
      const response = await axios.delete(`/vehicles/${vehicleId}`); // Matches simplified route
      console.log('Delete response:', response.data);
      if (response.data.success) {
        setVehicles(vehicles.filter(v => v._id !== vehicleId));
        setMessage({ type: 'success', text: 'Vehicle deleted successfully!' });
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Failed to delete vehicle' });
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error.response?.data || error.message);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong while deleting the vehicle' });
    }
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
              <FaCar className="text-blue-600" /> Manage Vehicles
            </h1>
            <p className="text-gray-600 text-lg">Add and view your registered vehicles</p>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6 mb-8"
        >
          {/* Message display above the form */}
          {message && (
            <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700">Registration Number</label>
              <input
                {...register('registrationNum', { required: 'Registration Number is required' })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter registration number (e.g., GJ01-2021)"
              />
              {errors.registrationNum && <p className="text-red-500 text-sm mt-1">{errors.registrationNum.message}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">Vehicle Type</label>
              <select
                {...register('vehicleType', { required: 'Vehicle Type is required' })}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Type</option>
                <option value="2 Wheeler">2 Wheeler</option>
                <option value="4 Wheeler">4 Wheeler</option>
                <option value="SUV">SUV</option>
              </select>
              {errors.vehicleType && <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-md font-medium hover:bg-teal-600 transition duration-200 flex items-center justify-center gap-2"
            >
              <FaPlusCircle /> Add Vehicle
            </motion.button>
          </form>
        </motion.div>

        {/* Vehicles List Section */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaCar className="text-blue-600" /> Your Vehicles
          </h3>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-32"
            >
              <FaSpinner className="animate-spin text-blue-600 text-3xl" />
            </motion.div>
          ) : vehicles.length > 0 ? (
            <ul className="space-y-4">
              {vehicles.map((v, i) => (
                <motion.li
                  key={v._id}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-700 flex justify-between items-center hover:bg-blue-50 transition-colors duration-300"
                >
                  <span className="font-medium">{v.registrationNum} - {v.vehicleType}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(v._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <FaTrash />
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-6 text-gray-500"
            >
              <FaCar className="text-gray-300 text-4xl mb-3" />
              <p>No vehicles added yet.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};