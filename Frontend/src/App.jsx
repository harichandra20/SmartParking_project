/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/common/Login'
import { SignUp } from './components/common/SignUp'
import { UserSidebar } from './components/layouts/UserSidebar'
import { AdminSidebar } from './components/layouts/AdminSidebar'

import axios from 'axios'
import { Home } from './components/pages/home/Home'

import { AddParking1 } from './components/ParkingOwner/AddParking1'
import { ParkingOwnerSidebar } from './components/layouts/ParkingOwnerSidebar'


// import './App.css'

function App() {
  
   axios.defaults.baseURL ="http://localhost:3000"
  return (
    <body>
      <div >
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/usersidebar' element={<UserSidebar></UserSidebar>}></Route>
          <Route path='/adminsidebar' element={<AdminSidebar></AdminSidebar>}></Route>
          <Route path='/ownersidebar' element={<ParkingOwnerSidebar></ParkingOwnerSidebar>}>
          <Route path='addparking' element={<AddParking1></AddParking1>}></Route>
          </Route>
          </Routes>
      </div>
    </body>
  )
}

export default App
//  */

// import { useState, useEffect } from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import axios from 'axios';

// // Components
// import { Login } from './components/common/Login';
// import { SignUp } from './components/common/SignUp';
// import { Home } from './components/pages/home/Home';

// // Layouts
// import { UserSidebar } from './components/layouts/UserSidebar';
// import { AdminSidebar } from './components/layouts/AdminSidebar';
// import { ParkingOwnerSidebar } from './components/layouts/ParkingOwnerSidebar';

// // Parking Owner Pages
// import { AddParking1 } from './components/ParkingOwner/AddParking1';

// // Set default base URL for axios
// axios.defaults.baseURL = "http://localhost:3000";

// // Auth guard component
// const ProtectedRoute = ({ children, userType }) => {
//   const isLoggedIn = localStorage.getItem('id');
//   const userRole = localStorage.getItem('role');
  
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (userType && userRole !== userType) {
//     return <Navigate to="/" replace />;
//   }
  
//   return children;
// };

// function App() {
//   // Set up axios interceptors for token handling if needed
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
    
//     return () => {
//       delete axios.defaults.headers.common['Authorization'];
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
        
//         {/* User routes */}
//         <Route path="/usersidebar" element={
//           <ProtectedRoute userType="user">
//             <UserSidebar />
//           </ProtectedRoute>
//         } />
        
//         {/* Admin routes */}
//         <Route path="/adminsidebar" element={
//           <ProtectedRoute userType="admin">
//             <AdminSidebar />
//           </ProtectedRoute>
//         } />
        
//         {/* Parking Owner routes */}
//         <Route path="/ownersidebar" element={
//           <ProtectedRoute userType="owner">
//             <ParkingOwnerSidebar />
//           </ProtectedRoute>
//         }>
//           {/* Nested routes inside parking owner layout */}
//           <Route index element={<div className="mt-16 p-8">Dashboard Content Here</div>} />
//           <Route path="addparking" element={<AddParking1 />} />
//           <Route path="bookings" element={<div className="mt-16 p-8">Booking History Content Here</div>} />
//           <Route path="profile" element={<div className="mt-16 p-8">Profile Settings Here</div>} />
//         </Route>
        
//         {/* Fallback route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </div>
//   );
// }

// // export default App;

// import { useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';

// // Components
// import { Login } from './components/common/Login';
// import { SignUp } from './components/common/SignUp';
// import { Home } from './components/pages/home/Home';

// // Layouts
// import { UserSidebar } from './components/layouts/UserSidebar';
// import { AdminSidebar } from './components/layouts/AdminSidebar';
// import { ParkingOwnerSidebar } from './components/layouts/ParkingOwnerSidebar';

// // Parking Owner Pages
// import { AddParking1 } from './components/ParkingOwner/AddParking1';
// import Reservation from './components/user/Resevation';
// import { Vehicale } from './components/user/Vehicale';
// import { SecuritySidebar } from './components/layouts/SecuritySidebar';
// import { UserDashboard } from './components/user/UserDashboard';
// import { Profile } from './components/common/Profile';
// import { BookingHistory1 } from './components/common/BookingHistory1';
// import { OwnerDashboard } from './components/ParkingOwner/OwnerDashboard';
// import { BookingHistory } from './components/ParkingOwner/BookingHistory';

// // const Dashboard = () => <div className="text-2xl font-bold">Welcome to the User Dashboard</div>;
// const BookParking = () => <div className="text-2xl font-bold">Book your Parking Spot</div>;
// // const BookingHistory = () => <div className="text-2xl font-bold">Your Booking History</div>;

// axios.defaults.baseURL = "http://localhost:3000";

// function App() {
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }

//     return () => {
//       delete axios.defaults.headers.common['Authorization'];
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         {/* User routes */}
        
//       <Route path="/usersidebar" element={<UserSidebar />}>
//         <Route index element={<UserDashboard/>} />
//         <Route path='vehicles' element={<Vehicale></Vehicale>}></Route>
//         <Route path="bookparking" element={<Reservation></Reservation>} />
//         <Route path="bookinghistory" element={<BookingHistory1/>} />
//         <Route path="profile" element={<Profile/>} />
//       </Route>
    

//         {/* Admin routes */}
//         <Route path="/adminsidebar" element={<AdminSidebar />} >
//         <Route index element={<div className="mt-16 p-8">Admin Dashboard</div>} />
//           <Route path="users" element={<div className="mt-16 p-8">Manage Users</div>} />
//           <Route path="parkings" element={<div className="mt-16 p-8">Manage Parkings</div>} />
//           <Route path="reservations" element={<BookingHistory1/>} />
//         </Route>

//         {/* Parking Owner routes with nesting */}
//         <Route path="/ownersidebar" element={<ParkingOwnerSidebar />}>
//           <Route index element={<OwnerDashboard/>} />
//           <Route path="addparking" element={<AddParking1 />} />
//           <Route path="bookings" element={<BookingHistory/>} />
//           <Route path="profile" element={<Profile/>} />
//         </Route>

//         <Route path="/securitysidebar" element={<SecuritySidebar/>}>
//           <Route index element={<div className="mt-16 p-8">Security Dashboard</div>} />
//           <Route path="checkin" element={<div className="mt-16 p-8">Check-In Vehicles</div>} />
//         </Route>

//         {/* Fallback route */}
//         <Route path="*" element={<Home />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;  

import { useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { isAuthenticated } from '../src/utils/auth';

// Components
import { Login } from './components/common/Login';
import { SignUp } from './components/common/SignUp';
import { Home } from './components/pages/home/Home';
import { ForgotPassword } from './components/common/ForgotPassword';
import { ResetPassword } from './components/common/ResetPassword';

// Layouts
import { UserSidebar } from './components/layouts/UserSidebar';
import { AdminSidebar } from './components/layouts/AdminSidebar';
import { ParkingOwnerSidebar } from './components/layouts/ParkingOwnerSidebar';
import { SecuritySidebar } from './components/layouts/SecuritySidebar';

// Pages
import { AddParking1 } from './components/ParkingOwner/AddParking1';
import Reservation from './components/user/Resevation';
import { Vehicale } from './components/user/Vehicale';
import { UserDashboard } from './components/user/UserDashboard';
import { Profile } from './components/common/Profile';
import { BookingHistory1 } from './components/common/BookingHistory1';
import { OwnerDashboard } from './components/ParkingOwner/OwnerDashboard';
import { BookingHistory } from './components/ParkingOwner/BookingHistory';
import ManageParkings from './components/admin/ManageParkings';
import ManageUsers from './components/admin/ManageUsers';
import SecurityGuard from './components/security/SecurityGuard';

// Private Route
const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isRoleValid = allowedRoles.includes(role);
                                                                     
  useEffect(() => {
    const checkToken = async () => {
      const isValid = await isAuthenticated();
      if (!isValid) {
        console.log('Token invalid or expired, redirecting to login');
        localStorage.clear(); // Clear expired token
        window.location.href = '/login'; // Hard redirect
      }
    };
    if (token) checkToken();
  }, [token]); 

  console.log('PrivateRoute Check:', { token, role, allowedRoles, isRoleValid });

  if (!token || !isRoleValid) {
    console.log('No token or invalid role, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/usersidebar/*"
          element={<PrivateRoute allowedRoles={['User']} />}
        >
          <Route path="" element={<UserSidebar />}>
            <Route index element={<UserDashboard />} />
            <Route path="vehicles" element={<Vehicale />} />
            <Route path="bookparking" element={<Reservation />} />
            <Route path="bookinghistory" element={<BookingHistory1 />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route
          path="/adminsidebar/*"
          element={<PrivateRoute allowedRoles={['Admin']} />}
        >
          <Route path="" element={<AdminSidebar />}>
            <Route index element={<div className="mt-16 p-8">Admin Dashboard</div>} />
            <Route path="Manageusers" element={<ManageUsers/>}/>
            <Route path="bookinghistory" element={<BookingHistory1 />} />
            <Route path="ManageParkings" element={<ManageParkings/>} />
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Route>

        <Route
          path="/ownersidebar/*"
          element={<PrivateRoute allowedRoles={['ParkingOwner']} />}
        >
          <Route path="" element={<ParkingOwnerSidebar />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="addparking" element={<AddParking1 />} />
            <Route path="bookings" element={<BookingHistory />} />
            <Route path="profile" element={<Profile/>} />
          
          </Route>
        </Route>
      
        <Route
          path="/securitysidebar/*"
          element={<PrivateRoute allowedRoles={['Security']} />}
        >
          <Route path="" element={<SecuritySidebar />}>
            <Route index element={<SecurityGuard/>} />
            <Route path="checkin" element={<div className="mt-16 p-8">Check-In Vehicles</div>} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;