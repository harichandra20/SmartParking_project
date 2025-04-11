// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form';

// export const AddParking1 = () => {
    
//     const [states, setstates] = useState([]);
//     const [cities, setcities] = useState([]);
//     const [areas, setareas] = useState([]);
//     const getAllStates = async () => {
//         const res = await axios.get("/state/getstate");
//         console.log(res.data);
//         setstates(res.data.data);
//     };

//     const getCityByStateId = async (id) => {
//         //api...
//         const res = await axios.get("city/getcitybystate/" + id);
//         console.log("city response...", res.data);
//         setcities(res.data.data);
//     };

//     const getAreaByCityId = async (id) => {
//         //alert(id)
//         const res = await axios.get("/area/getareabycity/" + id);
//         setareas(res.data.data);
//     };

//     useEffect(() => {
//         getAllStates();
//     }, []);

//     const { register, handleSubmit } = useForm();


//     const submitHandler = async (data) => {

//         const userId = localStorage.getItem("id")
//         data.userId = userId;
//         const res = await axios.post("/hording/add", data)
//         console.log(res.data)

//     };

//     return (
//         <div>
//             <div>
//                 <h1>ADD SCREEN</h1>
//                 <form onSubmit={handleSubmit(submitHandler)}>
                   
//                     <div>
//                         <label>parkingType</label>
//                         <select {...register("hoardingType")}>
//                             <option value="Road">Road</option>
//                             <option value="Ground">ground</option>
//                             <option value="building">building</option>
                           
//                         </select>
//                     </div>
                    
                  
//                     <div>
//                         <label>latitude</label>
//                         <input type="text" {...register("latitude")}></input>
//                     </div>
//                     <div>
//                         <label>longitude</label>
//                         <input type="text" {...register("longitude")}></input>
//                     </div>
//                     <div>
//                         <label>SELECT STATE</label>
//                         <select
//                             {...register("stateId")}
//                             onChange={(event) => {
//                                 getCityByStateId(event.target.value);
//                             }}
//                         >
//                             <option>SELECT STATE</option>
//                             {states?.map((state) => {
//                                 return <option value={state._id}>{state.name}</option>;
//                             })}
//                         </select>
//                     </div>
//                     <div>
//                         <label>SELCT CITY</label>
//                         <select
//                             {...register("cityId")}
//                             onChange={(event) => {
//                                 getAreaByCityId(event.target.value);
//                             }}
//                         >
//                             <option>SELECT CITY</option>
//                             {cities?.map((city) => {
//                                 return <option value={city._id}>{city.name}</option>;
//                             })}
//                         </select>
//                     </div>
//                     <div>
//                         <label>SELECT AREA</label>
//                         <select {...register("areaId")}>
//                             <option>SELECT AREA</option>
//                             {areas?.map((area) => {
//                                 return <option value={area._id}>{area.name}</option>;
//                             })}
//                         </select>
//                     </div>
//                     <div>
//                         <input type="submit"></input>
//                     </div>
//                 </form>
//             </div>


//         </div>
//     )
  
// }

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from '../common/axios'; // Custom axios instance (adjust path)
// import { toast } from 'react-toastify'; // Toast notifications
// import { useNavigate } from 'react-router-dom';

// export const AddParking1 = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const ownerId = localStorage.getItem('id'); // ParkingOwner ka ID

//   const submitHandler = async (data) => {
//     setLoading(true);
//     try { 
//       // Prepare data according to backend schema
//       const parkingData = {
//         title: data.title,
//         totalCapacityTwoWheeler: parseInt(data.totalCapacityTwoWheeler, 10),
//         totalCapacityFourWheeler: parseInt(data.totalCapacityFourWheeler, 10),
//         HourlyChargeTwoWheeler: parseFloat(data.HourlyChargeTwoWheeler),
//         HourlyChargeFourWheeler: parseFloat(data.HourlyChargeFourWheeler),
//         state: data.state, // Assuming these are IDs from dropdowns
//         city: data.city,
//         area: data.area,
//         ownerId,
//         parkingType: data.parkingType,
//         latitude: data.latitude,
//         longitude: data.longitude,
//       };

//       const res = await axios.post('/parking/add', parkingData);
//       if (res.status === 201 && res.data.success) {
//         toast.success('Parking added successfully!');
//         reset();
//         setTimeout(() => navigate('/ownersidebar'), 1000); // Redirect to dashboard
//       } else {
//         toast.error('Failed to add parking');
//       }
//     } catch (error) {
//       console.error('Error adding parking:', error);
//       toast.error(error.response?.data?.message || 'Failed to add parking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 px-6 py-8 max-w-3xl mx-auto">
//       <div className="bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Parking</h1>
//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Parking Title</label>
//             <input
//               type="text"
//               {...register('title', { required: 'Parking title is required' })}
//               className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               placeholder="Enter parking title"
//             />
//             {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
//           </div>

//           {/* Address Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">State ID</label>
//               <input
//                 type="text"
//                 {...register('state', { required: 'State ID is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.state ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter state ID"
//               />
//               {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">City ID</label>
//               <input
//                 type="text"
//                 {...register('city', { required: 'City ID is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter city ID"
//               />
//               {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Area ID</label>
//               <input
//                 type="text"
//                 {...register('area', { required: 'Area ID is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.area ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter area ID"
//               />
//               {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
//             </div>
//           </div>

//           {/* Capacities */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Two Wheeler Capacity</label>
//               <input
//                 type="number"
//                 {...register('totalCapacityTwoWheeler', {
//                   required: 'Two wheeler capacity is required',
//                   min: { value: 0, message: 'Capacity cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.totalCapacityTwoWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter 2-wheeler slots"
//               />
//               {errors.totalCapacityTwoWheeler && <p className="text-red-500 text-sm mt-1">{errors.totalCapacityTwoWheeler.message}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Four Wheeler Capacity</label>
//               <input
//                 type="number"
//                 {...register('totalCapacityFourWheeler', {
//                   required: 'Four wheeler capacity is required',
//                   min: { value: 0, message: 'Capacity cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.totalCapacityFourWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter 4-wheeler slots"
//               />
//               {errors.totalCapacityFourWheeler && <p className="text-red-500 text-sm mt-1">{errors.totalCapacityFourWheeler.message}</p>}
//             </div>
//           </div>

//           {/* Hourly Charges */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Hourly Charge (2 Wheeler)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register('HourlyChargeTwoWheeler', {
//                   required: 'Hourly charge for two wheelers is required',
//                   min: { value: 0, message: 'Charge cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.HourlyChargeTwoWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter charge per hour"
//               />
//               {errors.HourlyChargeTwoWheeler && <p className="text-red-500 text-sm mt-1">{errors.HourlyChargeTwoWheeler.message}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Hourly Charge (4 Wheeler)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register('HourlyChargeFourWheeler', {
//                   required: 'Hourly charge for four wheelers is required',
//                   min: { value: 0, message: 'Charge cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.HourlyChargeFourWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter charge per hour"
//               />
//               {errors.HourlyChargeFourWheeler && <p className="text-red-500 text-sm mt-1">{errors.HourlyChargeFourWheeler.message}</p>}
//             </div>
//           </div>

//           {/* Parking Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Parking Type</label>
//             <select
//               {...register('parkingType', { required: 'Parking type is required' })}
//               className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.parkingType ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//             >
//               <option value="">Select Parking Type</option>
//               <option value="Road">Road</option>
//               <option value="Ground">Ground</option>
//               <option value="Building">Building</option>
//             </select>
//             {errors.parkingType && <p className="text-red-500 text-sm mt-1">{errors.parkingType.message}</p>}
//           </div>

//           {/* Latitude & Longitude */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Latitude</label>
//               <input
//                 type="text"
//                 {...register('latitude', { required: 'Latitude is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.latitude ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter latitude (e.g., 19.0760)"
//               />
//               {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Longitude</label>
//               <input
//                 type="text"
//                 {...register('longitude', { required: 'Longitude is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.longitude ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter longitude (e.g., 72.8777)"
//               />
//               {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Adding...
//                 </>
//               ) : 'Add Parking'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddParking1;
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from '../common/axios'; // Custom axios instance (adjust path as per your structure)
// import { toast } from 'react-toastify'; // Toast notifications (already in App.jsx)
// import { useNavigate } from 'react-router-dom';

// export const AddParking1 = () => {
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
//   const selectedState = watch('state'); // Watch state to trigger city fetch
//   const selectedCity = watch('city'); // Watch city to trigger area fetch

//   // Get all states
//   const getAllStates = async () => {
//     try {
//       const res = await axios.get('/state/getstate');
//       setStates(res.data.data || []);
//     } catch (error) {
//       console.error('Error fetching states:', error);
//       toast.error('Failed to load states');
//     }
//   };

//   // Get cities by state ID
//   const getCityByStateId = async (stateId) => {
//     if (!stateId) return;
//     try {
//       const res = await axios.get(`/city/getcitybystate/${stateId}`);
//       setCities(res.data.data || []);
//       setAreas([]); // Reset areas when state changes
//     } catch (error) {
//       console.error('Error fetching cities:', error);
//       toast.error('Failed to load cities');
//     }
//   };

//   // Get areas by city ID
//   const getAreaByCityId = async (cityId) => {
//     if (!cityId) return;
//     try {
//       const res = await axios.get(`/area/getareabycity/${cityId}`);
//       setAreas(res.data.data || []);
//     } catch (error) {
//       console.error('Error fetching areas:', error);
//       toast.error('Failed to load areas');
//     }
//   };

//   useEffect(() => {
//     getAllStates();
//   }, []);

//   useEffect(() => {
//     getCityByStateId(selectedState);
//   }, [selectedState]);

//   useEffect(() => {
//     getAreaByCityId(selectedCity);
//   }, [selectedCity]);

//   const submitHandler = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const userId = localStorage.getItem('id');
//       const parkingData = {
//         ...data,
//         ownerId: userId,
//         totalCapacityTwoWheeler: parseInt(data.totalCapacityTwoWheeler, 10),
//         totalCapacityFourWheeler: parseInt(data.totalCapacityFourWheeler, 10),
//         HourlyChargeTwoWheeler: parseFloat(data.HourlyChargeTwoWheeler),
//         HourlyChargeFourWheeler: parseFloat(data.HourlyChargeFourWheeler),
//         active: data.active === 'true', // Convert string to boolean
//       };

//       const res = await axios.post('/parking/add', parkingData);
//       if (res.status === 201 && res.data.success) {
//         toast.success('Parking space added successfully!');
//         reset();
//         setTimeout(() => navigate('/ownersidebar'), 1000); // Redirect to dashboard
//       } else {
//         toast.error('Failed to add parking space');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       toast.error(error.response?.data?.message || 'Failed to add parking space');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="mt-16 px-6 py-8 max-w-4xl mx-auto">
//       <div className="bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Parking Space</h1>

//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Title</label>
//               <input
//                 type="text"
//                 {...register('title', { required: 'This field is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter parking title"
//               />
//               {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
//             </div>

//             {/* Total Capacity - Two Wheeler */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Two Wheeler Capacity</label>
//               <input
//                 type="number"
//                 {...register('totalCapacityTwoWheeler', {
//                   required: 'This field is required',
//                   min: { value: 0, message: 'Capacity cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.totalCapacityTwoWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter capacity"
//               />
//               {errors.totalCapacityTwoWheeler && <p className="text-red-500 text-sm mt-1">{errors.totalCapacityTwoWheeler.message}</p>}
//             </div>

//             {/* Total Capacity - Four Wheeler */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Four Wheeler Capacity</label>
//               <input
//                 type="number"
//                 {...register('totalCapacityFourWheeler', {
//                   required: 'This field is required',
//                   min: { value: 0, message: 'Capacity cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.totalCapacityFourWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter capacity"
//               />
//               {errors.totalCapacityFourWheeler && <p className="text-red-500 text-sm mt-1">{errors.totalCapacityFourWheeler.message}</p>}
//             </div>

//             {/* Hourly Charges - Two Wheeler */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Hourly Charge (Two Wheeler)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register('HourlyChargeTwoWheeler', {
//                   required: 'This field is required',
//                   min: { value: 0, message: 'Charge cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.HourlyChargeTwoWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter hourly charge"
//               />
//               {errors.HourlyChargeTwoWheeler && <p className="text-red-500 text-sm mt-1">{errors.HourlyChargeTwoWheeler.message}</p>}
//             </div>

//             {/* Hourly Charges - Four Wheeler */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Hourly Charge (Four Wheeler)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register('HourlyChargeFourWheeler', {
//                   required: 'This field is required',
//                   min: { value: 0, message: 'Charge cannot be negative' },
//                 })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.HourlyChargeFourWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 placeholder="Enter hourly charge"
//               />
//               {errors.HourlyChargeFourWheeler && <p className="text-red-500 text-sm mt-1">{errors.HourlyChargeFourWheeler.message}</p>}
//             </div>

//             {/* State */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">State</label>
//               <select
//                 {...register('state', { required: 'This field is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.state ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               >
//                 <option value="">Select State</option>
//                 {states.map((state) => (
//                   <option key={state._id} value={state._id}>{state.name}</option>
//                 ))}
//               </select>
//               {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
//             </div>

//             {/* City */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">City</label>
//               <select
//                 {...register('city', { required: 'This field is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               >
//                 <option value="">Select City</option>
//                 {cities.map((city) => (
//                   <option key={city._id} value={city._id}>{city.name}</option>
//                 ))}
//               </select>
//               {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
//             </div>

//             {/* Area */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Area</label>
//               <select
//                 {...register('area', { required: 'This field is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.area ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               >
//                 <option value="">Select Area</option>
//                 {areas.map((area) => (
//                   <option key={area._id} value={area._id}>{area.name}</option>
//                 ))}
//               </select>
//               {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
//             </div>

//             {/* Parking Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Parking Type</label>
//               <select
//                 {...register('parkingType', { required: 'This field is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.parkingType ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               >
//                 <option value="">Select Parking Type</option>
//                 <option value="Road">Road</option>
//                 <option value="Ground">Ground</option>
//                 <option value="Building">Building</option>
//               </select>
//               {errors.parkingType && <p className="text-red-500 text-sm mt-1">{errors.parkingType.message}</p>}
//             </div>

//             {/* Active */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Active</label>
//               <select
//                 {...register('active', { required: 'This field is required' })}
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.active ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               >
//                 <option value="">Select Status</option>
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//               {errors.active && <p className="text-red-500 text-sm mt-1">{errors.active.message}</p>}
//             </div>
//           </div>

//           {/* Latitude */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Latitude</label>
//             <input
//               type="text"
//               {...register('latitude', { required: 'This field is required' })}
//               className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.latitude ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               placeholder="Enter latitude (e.g., 19.0760)"
//             />
//             {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>}
//           </div>

//           {/* Longitude */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Longitude</label>
//             <input
//               type="text"
//               {...register('longitude', { required: 'This field is required' })}
//               className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.longitude ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//               placeholder="Enter longitude (e.g., 72.8777)"
//             />
//             {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Adding...
//                 </>
//               ) : 'Add Parking Space'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddParking1;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../common/axios'; // Custom axios instance (adjust path as per your structure)
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations
import { FaParking, FaSpinner } from 'react-icons/fa'; // React Icons

export const AddParking1 = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // New state for messages
  const navigate = useNavigate();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const selectedState = watch('state'); // Watch state to trigger city fetch
  const selectedCity = watch('city'); // Watch city to trigger area fetch

  // Get all states
  const getAllStates = async () => {
    try {
      const res = await axios.get('/state/getstate');
      setStates(res.data.data || []);
    } catch (error) {
      console.error('Error fetching states:', error);
      setMessage({ type: 'error', text: 'Failed to load states' });
    }
  };

  // Get cities by state ID
  const getCityByStateId = async (stateId) => {
    if (!stateId) return;
    try {
      const res = await axios.get(`/city/getcitybystate/${stateId}`);
      setCities(res.data.data || []);
      setAreas([]); // Reset areas when state changes
    } catch (error) {
      console.error('Error fetching cities:', error);
      setMessage({ type: 'error', text: 'Failed to load cities' });
    }
  };

  // Get areas by city ID
  const getAreaByCityId = async (cityId) => {
    if (!cityId) return;
    try {
      const res = await axios.get(`/area/getareabycity/${cityId}`);
      setAreas(res.data.data || []);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setMessage({ type: 'error', text: 'Failed to load areas' });
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    getCityByStateId(selectedState);
  }, [selectedState]);

  useEffect(() => {
    getAreaByCityId(selectedCity);
  }, [selectedCity]);

  // New useEffect to handle message timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); // Clear the message after 3 seconds
      }, 3000); // 3000ms = 3 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [message]);

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    try {
      const userId = localStorage.getItem('id');
      const parkingData = {
        ...data,
        ownerId: userId,
        totalCapacityTwoWheeler: parseInt(data.totalCapacityTwoWheeler, 10),
        totalCapacityFourWheeler: parseInt(data.totalCapacityFourWheeler, 10),
        HourlyChargeTwoWheeler: parseFloat(data.HourlyChargeTwoWheeler),
        HourlyChargeFourWheeler: parseFloat(data.HourlyChargeFourWheeler),
        active: data.active === 'true', // Convert string to boolean
      };

      const res = await axios.post('/parking/add', parkingData);
      if (res.status === 201 && res.data.success) {
        setMessage({ type: 'success', text: 'Parking space added successfully!' });
        reset();
        setTimeout(() => navigate('/ownersidebar'), 1000); // Redirect to dashboard
      } else {
        setMessage({ type: 'error', text: 'Failed to add parking space' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add parking space' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)', transition: { duration: 0.3 } }
  };

  const formFieldVariants = {
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
              <FaParking className="text-blue-600" /> Add Parking Space
            </h1>
            <p className="text-gray-600 text-lg">Create a new parking space for your customers</p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6"
        >
          {/* Message display */}
          {message && (
            <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  {...register('title', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Enter parking title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </motion.div>

              {/* Total Capacity - Two Wheeler */}
              <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Two Wheeler Capacity</label>
                <input
                  type="number"
                  {...register('totalCapacityTwoWheeler', {
                    required: 'This field is required',
                    min: { value: 0, message: 'Capacity cannot be negative' },
                  })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.totalCapacityTwoWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Enter capacity"
                />
                {errors.totalCapacityTwoWheeler && <p className="text-red-500 text-sm mt-1">{errors.totalCapacityTwoWheeler.message}</p>}
              </motion.div>

              {/* Total Capacity - Four Wheeler */}
              <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Four Wheeler Capacity</label>
                <input
                  type="number"
                  {...register('totalCapacityFourWheeler', {
                    required: 'This field is required',
                    min: { value: 0, message: 'Capacity cannot be negative' },
                  })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.totalCapacityFourWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Enter capacity"
                />
                {errors.totalCapacityFourWheeler && <p className="text-red-500 text-sm mt-1">{errors.totalCapacityFourWheeler.message}</p>}
              </motion.div>

              {/* Hourly Charges - Two Wheeler */}
              <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Hourly Charge (Two Wheeler)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('HourlyChargeTwoWheeler', {
                    required: 'This field is required',
                    min: { value: 0, message: 'Charge cannot be negative' },
                  })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.HourlyChargeTwoWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Enter hourly charge"
                />
                {errors.HourlyChargeTwoWheeler && <p className="text-red-500 text-sm mt-1">{errors.HourlyChargeTwoWheeler.message}</p>}
              </motion.div>

              {/* Hourly Charges - Four Wheeler */}
              <motion.div custom={4} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Hourly Charge (Four Wheeler)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('HourlyChargeFourWheeler', {
                    required: 'This field is required',
                    min: { value: 0, message: 'Charge cannot be negative' },
                  })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.HourlyChargeFourWheeler ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Enter hourly charge"
                />
                {errors.HourlyChargeFourWheeler && <p className="text-red-500 text-sm mt-1">{errors.HourlyChargeFourWheeler.message}</p>}
              </motion.div>

              {/* State */}
              <motion.div custom={5} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">State</label>
                <select
                  {...register('state', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.state ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
              </motion.div>

              {/* City */}
              <motion.div custom={6} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">City</label>
                <select
                  {...register('city', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>{city.name}</option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </motion.div>

              {/* Area */}
              <motion.div custom={7} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Area</label>
                <select
                  {...register('area', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.area ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                  ))}
                </select>
                {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
              </motion.div>

              {/* Parking Type */}
              <motion.div custom={8} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Parking Type</label>
                <select
                  {...register('parkingType', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.parkingType ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                >
                  <option value="">Select Parking Type</option>
                  <option value="Road">Road</option>
                  <option value="Ground">Ground</option>
                  <option value="Building">Building</option>
                </select>
                {errors.parkingType && <p className="text-red-500 text-sm mt-1">{errors.parkingType.message}</p>}
              </motion.div>

              {/* Active */}
              <motion.div custom={9} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Active</label>
                <select
                  {...register('active', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.active ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                >
                  <option value="">Select Status</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {errors.active && <p className="text-red-500 text-sm mt-1">{errors.active.message}</p>}
              </motion.div>

              {/* Latitude */}
              <motion.div custom={10} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  {...register('latitude', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.latitude ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Enter latitude (e.g., 19.0760)"
                />
                {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>}
              </motion.div>

              {/* Longitude */}
              <motion.div custom={11} variants={formFieldVariants} initial="hidden" animate="visible">
                <label className="block font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  {...register('longitude', { required: 'This field is required' })}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${errors.longitude ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Enter longitude (e.g., 72.8777)"
                />
                {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>}
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div custom={12} variants={formFieldVariants} initial="hidden" animate="visible" className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 text-white p-3 rounded-md font-medium flex items-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition duration-200'}`}
              >
                {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaParking />}
                {isSubmitting ? 'Adding...' : 'Add Parking Space'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddParking1;