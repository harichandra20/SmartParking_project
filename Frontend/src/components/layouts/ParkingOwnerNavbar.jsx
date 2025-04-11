/* import React from 'react'
import { Link } from 'react-router-dom';

export const ParkingOwnerNavbar = () => {
  return (
        <nav className="bg-white shadow-lg fixed top-0 left-64 right-0 z-50 p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-800">Home</a>
            <a href="#" className="text-gray-800">Contact</a>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
            <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</Link>
          
          </div>
        </nav>
      );
  
}
//  */

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export const ParkingOwnerNavbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem('id');

//   const handleLogout = () => {
//     localStorage.removeItem('id');
//     localStorage.removeItem('Name');
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-md fixed top-0 left-64 right-0 z-50 px-6 py-3 flex justify-between items-center">
//       <div className="flex space-x-6">
//         <Link to="/" className="text-gray-800 hover:text-blue-600 transition duration-150">
//           Home
//         </Link>
//         <Link to="/contact" className="text-gray-800 hover:text-blue-600 transition duration-150">
//           Contact
//         </Link>
//       </div>
      
//       <div className="flex items-center">
//         {isLoggedIn ? (
//           <button 
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-150"
//           >
//             Log Out
//           </button>
//         ) : (
//           <div className="flex space-x-4">
//             <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-150">
//               Login
//             </Link>
//             <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-150">
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

import React from 'react';

export const ParkingOwnerNavbar = ({ isSidebarOpen, toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('Name');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav
      className={`bg-white shadow-md fixed top-0 transition-all duration-300 z-50 px-6 py-3 flex justify-between items-center ${
        isSidebarOpen ? 'left-64 right-0' : 'left-0 right-0'
      }`}
    >
      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="text-gray-800 hover:text-blue-600 transition duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-150"
      >
        Log Out
      </button>
    </nav>
  );
};
