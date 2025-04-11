// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const Profile = () => {
//     const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//             fetchProfile();
//         }
//     }, []);

//     const fetchProfile = async () => {
//         try {
//             const res = await axios.get(`http://localhost:3000/users/getuser/${localStorage.getItem('id')}`);
//             setUser(res.data.data);
//             setValue('fullName', res.data.data.fullName);
//             setValue('email', res.data.data.email);
//             setValue('PhoneNumber', res.data.data.PhoneNumber);
//         } catch (error) {
//             console.error('Error fetching profile:', error.response?.data || error);
//             toast.error('Failed to fetch profile');
//         }
//     };

//     const onSubmit = async (data) => {
//         try {
//             await axios.put(`http://localhost:3000/users/update/${localStorage.getItem('id')}`, data);
//             toast.success('Profile updated successfully!');
//             localStorage.setItem('Name', data.fullName);
//             fetchProfile();
//         } catch (error) {
//             toast.error('Error updating profile: ' + (error.response?.data?.message || 'Unknown error'));
//         }
//     };

//     return (
//         <div className="mt-16 p-8 max-w-md mx-auto">
//             <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
//             {user ? (
//                 <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium">Full Name</label>
//                         <input
//                             {...register('fullName', { required: 'Name is required' })}
//                             className="w-full p-2 border rounded"
//                         />
//                         {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium">Email</label>
//                         <input
//                             {...register('email', {
//                                 required: 'Email is required',
//                                 pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
//                             })}
//                             className="w-full p-2 border rounded"
//                         />
//                         {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium">Phone Number</label>
//                         <input
//                             {...register('PhoneNumber', {
//                                 required: 'Phone number is required',
//                                 pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' },
//                             })}
//                             className="w-full p-2 border rounded"
//                         />
//                         {errors.PhoneNumber && <p className="text-red-500 text-xs">{errors.PhoneNumber.message}</p>}
//                     </div>
//                     <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//                         Update Profile
//                     </button>
//                 </form>
//             ) : (
//                 <p>Loading profile...</p>
//             )}
//         </div>
//     );
// };
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaCamera, FaSpinner, FaEdit, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

export const Profile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [picLoading, setPicLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
    }
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/getuser/${localStorage.getItem('id')}`);
      setUser(res.data.data);
      setValue('fullName', res.data.data.fullName);
      setValue('email', res.data.data.email);
      setValue('PhoneNumber', res.data.data.PhoneNumber);
      if (res.data.data.profilePic) {
        setProfilePic(res.data.data.profilePic);
      }
    } catch (error) {
      console.error('Error fetching profile:', error.response?.data || error);
      setMessage({ type: 'error', text: 'Failed to fetch profile' });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('PhoneNumber', data.PhoneNumber);
      if (profilePic instanceof File) {
        formData.append('profilePic', profilePic);
      }

      await axios.put(`http://localhost:3000/users/update/${localStorage.getItem('id')}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      localStorage.setItem('Name', data.fullName);
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating profile: ' + (error.response?.data?.message || 'Unknown error') });
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicLoading(true);
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setPicLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Adjusted animation variants with valid easing
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.6, 0.05, 0.01, 0.9], // Adjusted to valid range
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    },
    hover: { 
      scale: 1.03, 
      boxShadow: '0 20px 40px rgba(0,0,0,0.12)', 
      transition: { duration: 0.3 } 
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1, 
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9] // Adjusted to valid range
      }
    })
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const profilePicVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 pt-24 pl-64 p-4 md:p-8 mt-14"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-5xl font-extrabold text-gray-800 mb-3 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              <FaUser className="text-blue-600" /> Your Profile
            </h1>
            <p className="text-gray-600 text-xl font-light">Manage your personal information</p>
          </div>
        </motion.div>

        {message && (
          <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`p-4 mb-6 rounded-lg flex items-center shadow-md ${
              message.type === 'success' 
                ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-l-4 border-green-500' 
                : 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-l-4 border-red-500'
            }`}
          >
            {message.type === 'success' ? (
              <FaCheck className="mr-2 text-green-600" />
            ) : (
              <FaExclamationTriangle className="mr-2 text-red-600" />
            )}
            {message.text}
          </motion.div>
        )}

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 backdrop-blur-sm bg-opacity-90"
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-64"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <FaSpinner className="text-blue-600 text-4xl" />
              </motion.div>
            </motion.div>
          ) : user ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Profile Picture Section */}
              <motion.div
                variants={profilePicVariants}
                className="text-center mb-8"
              >
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src={profilePic || 'https://via.placeholder.com/150?text=Profile+Pic'}
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-blue-300 shadow-lg"
                    />
                  </motion.div>
                  
                  {picLoading && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FaSpinner className="text-white text-2xl" />
                      </motion.div>
                    </motion.div>
                  )}
                  
                  <motion.label 
                    className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full absolute bottom-1 right-1 hover:from-blue-700 hover:to-blue-800 transition-colors duration-300 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="hidden"
                    />
                  </motion.label>
                </div>
                <motion.p 
                  className="text-gray-600 mt-3 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Click camera to upload profile picture
                </motion.p>
              </motion.div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div custom={1} variants={formFieldVariants}>
                  <label className="block font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    {...register('fullName', { required: 'Name is required' })}
                    defaultValue={user.fullName}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    disabled={!isEditing}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </motion.div>
                
                <motion.div custom={2} variants={formFieldVariants}>
                  <label className="block font-medium text-gray-700 mb-2">Email</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                    })}
                    defaultValue={user.email}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    disabled={!isEditing}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </motion.div>
              </div>
              
              <motion.div custom={3} variants={formFieldVariants}>
                <label className="block font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  {...register('PhoneNumber', {
                    required: 'Phone number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' },
                  })}
                  defaultValue={user.PhoneNumber}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  disabled={!isEditing}
                />
                {errors.PhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.PhoneNumber.message}</p>}
              </motion.div>
              
              <motion.div custom={4} variants={formFieldVariants} className="flex justify-end mt-6 space-x-3">
                {!isEditing ? (
                  <motion.button
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md"
                  >
                    <FaEdit /> Edit Profile
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      variants={buttonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium shadow-md"
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      variants={buttonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md"
                    >
                      <FaCheck /> Save Changes
                    </motion.button>
                  </>
                )}
              </motion.div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center"
            >
              <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
              <p className="text-gray-800 text-lg">Error loading profile. Please try again later.</p>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 mt-8 text-sm"
        >
          Last updated: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;