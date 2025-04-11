// import axios from 'axios';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate, Link } from 'react-router-dom';

// export const SignUp = () => {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const submithandler = async(data) => {
//     setIsLoading(true);
//     try {
//       console.log("sign data", data);
//       const res = await axios.post('/users/signup', data);
//       console.log(res);
      
//       if(res.status === 201){
//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       } else {
//         alert("User registration failed");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       if (error.response) {
//         alert(`Error: ${error.response.data.message || "Registration failed"}`);
//       } else {
//         alert("Network error. Please check your connection.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validators = {
//     fullNameValidator: { 
//       required: { value: true, message: "Full name is required" },
//       minLength: { value: 2, message: "Name must be at least 2 characters" }
//     },
//     emailValidators: { 
//       required: { value: true, message: "Email is required" },
//       pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
//     },
//     phoneNumberValidators: { 
//       required: { value: true, message: "Phone number is required" },
//       pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" }
//     },
//     passwordValidators: { 
//       required: { value: true, message: "Password is required" },
//       minLength: { value: 6, message: "Password must be at least 6 characters" }
//     },
//     roleValidator: { 
//       required: { value: true, message: "Role selection is required" }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
//             <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
//             <p className="text-blue-100 text-center mt-2">Join ParkSmart today</p>
//           </div>
          
//           <form onSubmit={handleSubmit(submithandler)} className="p-8">
//             {/* Full Name */}
//             <div className="mb-4">
//               <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input 
//                   type="text" 
//                   id="fullname" 
//                   placeholder="John Doe"
//                   {...register('fullName', validators.fullNameValidator)} 
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 />
//               </div>
//               {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
//             </div>

//             {/* Email */}
//             <div className="mb-4">
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
//                   {...register('email', validators.emailValidators)} 
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 />
//               </div>
//               {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
//             </div>

//             {/* Phone Number */}
//             <div className="mb-4">
//               <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                   </svg>
//                 </div>
//                 <input 
//                   type="tel" 
//                   id="phoneNumber" 
//                   placeholder="1234567890"
//                   {...register('PhoneNumber', validators.phoneNumberValidators)} 
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.PhoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
//                 />
//               </div>
//               {errors.PhoneNumber && <p className="mt-1 text-sm text-red-500">{errors.PhoneNumber.message}</p>}
//             </div>

//             {/* Password */}
//             <div className="mb-4">
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

//             {/* Role Dropdown */}
//             <div className="mb-6">
//               <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">Select Role</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
//                   </svg>
//                 </div>
//                 <select
//                   id="role"
//                   {...register('role', validators.roleValidator)}
//                   className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.role ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} appearance-none`}
//                 >
//                   <option value="">Select a role</option>
//                   <option value="User">User</option>
//                   <option value="ParkingOwner">Parking Owner</option>
//                   <option value="Admin">Admin</option>
//                   <option value="Security">Security Agent</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//                   </svg>
//                 </div>
//               </div>
//               {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
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
//                   Creating account...
//                 </>
//               ) : 'Create Account'}
//             </button>
//           </form>
          
//           <div className="px-8 pb-8 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const submithandler = async (data) => {
    setIsLoading(true);
    setServerError('');
    try {
      console.log("Sign up data:", data);
      const res = await axios.post('http://localhost:3000/users/signup', data);
      console.log("Response:", res);

      if (res.status === 201) {
        // Clear any existing junk from localStorage
        localStorage.clear();
        // Store only required items
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data.userId);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('Name', data.fullName); // Assuming fullName not in response

        // Redirect to login
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setServerError('User registration failed');
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        setServerError(error.response.data.message || 'Registration failed');
      } else {
        setServerError('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validators = {
    fullNameValidator: { 
      required: { value: true, message: "Full name is required" },
      minLength: { value: 2, message: "Name must be at least 2 characters" }
    },
    emailValidators: { 
      required: { value: true, message: "Email is required" },
      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
    },
    phoneNumberValidators: { 
      required: { value: true, message: "Phone number is required" },
      pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" }
    },
    passwordValidators: { 
      required: { value: true, message: "Password is required" },
      pattern: { 
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        message: "Password must be 8+ characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character" 
      }
    },
    roleValidator: { 
      required: { value: true, message: "Role selection is required" }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
            <p className="text-blue-100 text-center mt-2">Join ParkSmart today</p>
          </div>
          
          <form onSubmit={handleSubmit(submithandler)} className="p-8">
            {serverError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {serverError}
              </div>
            )}
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  id="fullname" 
                  placeholder="John Doe"
                  {...register('fullName', validators.fullNameValidator)} 
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
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
                  {...register('email', validators.emailValidators)} 
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  placeholder="1234567890"
                  {...register('PhoneNumber', validators.phoneNumberValidators)} 
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.PhoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                />
              </div>
              {errors.PhoneNumber && <p className="mt-1 text-sm text-red-500">{errors.PhoneNumber.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
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

            {/* Role Dropdown */}
            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">Select Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <select
                  id="role"
                  {...register('role', validators.roleValidator)}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.role ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} appearance-none`}
                >
                  <option value="">Select a role</option>
                  <option value="User">User</option>
                  <option value="ParkingOwner">Parking Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Security">Security Agent</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
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
                  Creating account...
                </>
              ) : 'Create Account'}
            </button>
          </form>
          
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};