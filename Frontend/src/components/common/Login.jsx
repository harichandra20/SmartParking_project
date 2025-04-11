// import axios from 'axios';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate, Link } from 'react-router-dom';

// export const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigation = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const submithandler = async(data) => {
//     setIsLoading(true);
//     try {
//       const res = await axios.post('/users/login', data);
//       console.log('Response:', res);

//       // Handle response based on status codes
//       if (res.status === 200) {
//         localStorage.setItem("id", res.data.data._id);
//         localStorage.setItem("role", res.data.data.role);
//         localStorage.setItem("Name", res.data.data.fullName);
        
//         setTimeout(() => {
//           if(res.data.data.role === 'User'){
//             navigation("/usersidebar");
//           }
//           else if(res.data.data.role === 'Admin'){
//             navigation("/adminsidebar");
//           }
//           else if(res.data.data.role === 'ParkingOwner'){
//             navigation("/ownersidebar"); // Fixed route path to match App.js
//           }
//           else if(res.data.data.role === 'Security'){
//             navigation("/Security");
//           }
//         }, 1000);
//       } else if (res.status === 400) {
//         alert('⚠️ Bad request: ' + res.data.message);
//       } else if (res.status === 401) {
//         alert('❌ Unauthorized: ' + res.data.message);
//       } else if (res.status === 404) {
//         alert('🔍 Not found: ' + res.data.message);
//       } else {
//         alert('❗ Something went wrong. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       if (error.response) {
//         alert('❗ Error: ' + error.response.data.message);
//       } else {
//         alert('❗ Network error. Please check your connection.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validators = {
//     usernameValidator: {
//       required: {
//         value: true,
//         message: "Email is required"
//       },
//       pattern: {
//         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//         message: "Invalid email address"
//       }
//     },
//     passwordValidators: {
//       required: {
//         value: true,
//         message: "Password is required"
//       },
//       minLength: {
//         value: 6,
//         message: "Password must be at least 6 characters"
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
//             <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
//             <p className="text-blue-100 text-center mt-2">Sign in to continue to ParkSmart</p>
//           </div>
          
//           <form onSubmit={handleSubmit(submithandler)} className="p-8">
//             <div className="mb-5">
//               <label htmlFor="Email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                   </svg>
//                 </div>
//                 <input 
//                   type="email" 
//                   id="Email"
//                   placeholder="your@email.com"
//                   {...register('email', validators.usernameValidator)}
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 />
//               </div>
//               {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
//             </div>

//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input 
//                   type="password" 
//                   id="password"
//                   placeholder="••••••••"
//                   {...register('password', validators.passwordValidators)}
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 />
//               </div>
//               {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
//             </div>

//             <div className="mb-6 flex items-center justify-between">
//               <div className="flex items-center">
//                 <input id="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
//                 <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">Remember me</label>
//               </div>
//               <div className="text-sm">
//                 <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
//               </div>
//             </div>

//             <button 
//               type="submit"
//               disabled={isLoading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </>
//               ) : 'Sign in'}
//             </button>
//           </form>
          
//           <div className="px-8 pb-8 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
//                 Sign up now
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import axios from 'axios';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate, Link } from 'react-router-dom';

// export const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate(); // Fixed variable name from 'navigation' to 'navigate'
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState(''); // Server-side errors ke liye

//   const submithandler = async (data) => {
//     setIsLoading(true);
//     setServerError(''); // Reset previous errors
//     try {
//       const res = await axios.post('/users/login', data);
//       console.log('Response:', res);

//       if (res.status === 200) {
//         // Save token, userId, aur role to localStorage
//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('id', res.data.userId);
//         localStorage.setItem('role', res.data.role);
//         localStorage.setItem('Name', res.data.fullName); // Assuming backend returns fullName in 'data'

//         // Role-based redirection
//         setTimeout(() => {
//           if (res.data.role === 'User') navigate('/usersidebar');
//           else if (res.data.role === 'Admin') navigate('/adminsidebar');
//           else if (res.data.role === 'ParkingOwner') navigate('/ownersidebar');
//           else if (res.data.role === 'Security') navigate('/securitysidebar'); // Fixed route to match App.jsx
//           else navigate('/'); // Fallback
//         }, 1000);
//       } else {
//         setServerError('Something went wrong. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       if (error.response) {
//         setServerError(error.response.data.message || 'Login failed');
//       } else {
//         setServerError('Network error. Please check your connection.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validators = {
//     emailValidator: {
//       required: { value: true, message: "Email is required" },
//       pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
//     },
//     passwordValidators: {
//       required: { value: true, message: "Password is required" },
//       pattern: { 
//         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
//         message: "Password must be 8+ characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character" 
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
//             <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
//             <p className="text-blue-100 text-center mt-2">Sign in to continue to ParkSmart</p>
//           </div>
          
//           <form onSubmit={handleSubmit(submithandler)} className="p-8">
//             {/* Server Error */}
//             {serverError && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {serverError}
//               </div>
//             )}

//             {/* Email */}
//             <div className="mb-5">
//               <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                   </svg>
//                 </div>
//                 <input 
//                   type="email" 
//                   id="email"
//                   placeholder="your@email.com"
//                   {...register('email', validators.emailValidator)}
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 />
//               </div>
//               {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
//             </div>

//             {/* Password */}
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input 
//                   type="password" 
//                   id="password"
//                   placeholder="••••••••"
//                   {...register('password', validators.passwordValidators)}
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 />
//               </div>
//               {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="mb-6 flex items-center justify-between">
//               <div className="flex items-center">
//                 <input id="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
//                 <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">Remember me</label>
//               </div>
//               <div className="text-sm">
//                 <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button 
//               type="submit"
//               disabled={isLoading}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </>
//               ) : 'Sign in'}
//             </button>
//           </form>
          
//           <div className="px-8 pb-8 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
//                 Sign up now
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from './axios'; // Custom axios instance import karo
import { toast } from 'react-toastify'; // Toast ke liye import

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submithandler = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/users/login', data);
      console.log('Response:', res);

      if (res.status === 200 && res.data.success) {
        // Save token, userId, aur role to localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data.userId);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('Name', res.data.fullName);

        toast.success('Login successful!'); // Success toast

        // Role-based redirection
        setTimeout(() => {
          if (res.data.role === 'User') navigate('/usersidebar');
          else if (res.data.role === 'Admin') navigate('/adminsidebar');
          else if (res.data.role === 'ParkingOwner') navigate('/ownersidebar');
          else if (res.data.role === 'Security') navigate('/securitysidebar');
          else navigate('/');
        }, 1000);
      } else {
        toast.error(res.data.message || 'Something went wrong'); // Error toast
      }
    } catch (error) {
      console.error('Login Error:', error);
      const errorMessage = error.response?.data?.message || 'Network error. Please check your connection.';
      toast.error(errorMessage); // Error toast
    } finally {
      setIsLoading(false);
    }
  };

  const validators = {
    emailValidator: {
      required: { value: true, message: 'Email is required' },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
    },
    passwordValidators: {
      required: { value: true, message: 'Password is required' },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'Password must be 8+ characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character'
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
            <p className="text-blue-100 text-center mt-2">Sign in to continue to ParkSmart</p>
          </div>

          <form onSubmit={handleSubmit(submithandler)} className="p-8">
            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  {...register('email', validators.emailValidator)}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register('password', validators.passwordValidators)}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </form>

          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

