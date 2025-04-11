import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserCheck, FaUserTimes, FaPlus, FaSync, FaTrash } from 'react-icons/fa'; // React Icons
import axios from '../common/axios'; // Adjust path to your axios instance
import { useForm } from 'react-hook-form'; // React Hook Form

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Message ko 3 seconds ke baad clear karo
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [message]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/users/getusers'); // Fetch users from backend
      console.log('Raw API response:', res);
      
      if (res.data && Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } else if (res.data && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error('Unexpected API response structure:', res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (userId) => {
    if (window.confirm(`Are you sure you want to remove user ${userId}?`)) {
      try {
        console.log('Removing user with ID:', userId); // Debug
        await axios.delete(`/users/delete/${userId}`); // Call delete endpoint
        setUsers(users.filter(user => user._id !== userId)); // Update state
        setMessage({ type: 'success', text: 'User removed successfully!' });
      } catch (error) {
        console.error('Error removing user:', error.response?.data || error);
        setMessage({ type: 'error', text: 'Failed to remove user. Please try again.' });
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'User', // Default to uppercase "User"
      PhoneNumber: ''
    },
    mode: 'onChange' // Real-time validation
  });

  const onSubmit = async (data) => {
    console.log('Submitting data:', data); // Debug: Log submitted data
    try {
      const res = await axios.post('/users/signup', data); // Call signup endpoint
      console.log('Full API response:', res); // Log full response
      console.log('Signup response data:', res.data); // Debug: Log response data
      
      // यहां API से userId और फॉर्म से data का उपयोग करके नया user object बनाया जाएगा
      if (res.data && res.data.success && res.data.userId) {
        // फॉर्म डेटा से user object बनाए
        const newUser = {
          _id: res.data.userId,
          fullName: data.fullName,
          email: data.email,
          role: res.data.role || data.role,
          PhoneNumber: data.PhoneNumber
        };
        
        console.log('Created new user object:', newUser);
        
        // users array में नए user को शामिल करें
        setUsers(prevUsers => [...prevUsers, newUser]);
        setShowAddForm(false);
        reset();
        setMessage({ type: 'success', text: 'User added successfully!' });
      } else {
        // API सफल है, लेकिन हम UI को अभी अपडेट नहीं कर सकते
        console.log('Response does not contain expected user data format:', res.data);
        if (res.data && res.data.success) {
          setMessage({ type: 'success', text: 'User added successfully! Refresh to see updates.' });
          setShowAddForm(false);
          reset();
        } else {
          setMessage({ type: 'error', text: 'Failed to add user: Invalid response data' });
        }
      }
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error);
      const errorData = error.response?.data || {};
      console.log('Error response:', errorData); // Debug: Log error details
      const errorMsg = errorData.errors?.map(err => err.msg).join(', ') || errorData.message || 'Failed to add user. Try again.';
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  const handleAddUser = () => {
    setShowAddForm(true); // Show the form
    setMessage(null); // Clear previous message
    reset(); // Reset form fields
  };

  const getStatusColor = (role) => {
    const roleStr = typeof role === 'string' ? role.toLowerCase() : 'user'; // Fallback to 'user' if undefined
    switch (roleStr) {
      case 'admin':
        return 'bg-green-500';
      case 'user':
        return 'bg-yellow-500';
      case 'parkingowner':
      case 'security':
        return 'bg-gray-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg flex items-center shadow-md ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
              : 'bg-red-100 text-red-700 border-l-4 border-red-500'
          }`}>
            {message.text}
          </div>
        )}

        {/* Header Section with Stats */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                User Management
              </h1>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={fetchData} 
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                <FaSync /> Refresh
              </button>
              <button 
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
              >
                <FaPlus /> Add User
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-md">
              <p className="text-sm text-indigo-600 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 shadow-md">
              <p className="text-sm text-blue-600 font-medium">Admin Users</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(user => (user.role || 'user').toLowerCase() === 'admin').length} {/* Safe check */}
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 shadow-md">
              <p className="text-sm text-emerald-600 font-medium">Regular Users</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(user => (user.role || 'user').toLowerCase() === 'user').length} {/* Safe check */}
              </p>
            </div>
          </div>
        </div>

        {/* Add User Form */}
        {showAddForm && (
          <div className="mb-8 bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  {...register('fullName', { required: 'Full name is required' })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password *</label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Password must be 8+ characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character'
                    }
                  })}
                  type="password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role *</label>
                <select
                  {...register('role', { required: 'Role is required' })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="ParkingOwner">Parking Owner</option>
                  <option value="Security">Security</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  {...register('PhoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number must be 10 digits'
                    }
                  })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.PhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.PhoneNumber.message}</p>}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
                  disabled={Object.keys(errors).length > 0}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* User Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin text-indigo-600 text-4xl">
              <FaUsers />
            </div>
          </div>
        ) : users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">{user.fullName || 'Unnamed User'}</h2>
                  <p className="text-gray-500 mb-4">{user.email || 'No email provided'}</p>
                  
                  <div className="space-y-4">
                    {/* Status (using role as proxy) */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-1 text-gray-600">
                          Status
                        </span>
                        <span className="font-medium">
                          {(user.role || 'User').charAt(0).toUpperCase() + (user.role || 'User').slice(1).toLowerCase()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${getStatusColor(user.role)}`}
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Role */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-1 text-gray-600">
                          Role
                        </span>
                        <span className="font-medium">
                          {(user.role || 'User').charAt(0).toUpperCase() + (user.role || 'User').slice(1).toLowerCase()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Phone Number */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-1 text-gray-600">
                          Phone
                        </span>
                        <span className="font-medium">
                          {user.PhoneNumber || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
                    <button className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <FaUsers className="text-gray-300 text-5xl mx-auto mb-4" />
            <p className="text-xl text-gray-600">No users available.</p>
            <p className="text-gray-500 mt-2">Add your first user to get started.</p>
            <button 
              onClick={handleAddUser}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <FaPlus /> Add User
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;