// import React from 'react';

// export const AdminNavabar = ({ isSidebarOpen,toggleSidebar }) => {
//   const handleLogout = () => {
//     localStorage.removeItem('id');
//     localStorage.removeItem('Name');
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };
//   return (
//     <nav
//       className={`bg-white shadow-md fixed top-0 transition-all duration-300 z-50 px-6 py-3 flex justify-between items-center ${
//         isSidebarOpen ? 'left-64 right-0' : 'left-0 right-0'
//       }`}
//     >
//       {/* Sidebar toggle button */}
//       <button
//         onClick={toggleSidebar}
//         className="text-gray-800 hover:text-blue-600 transition duration-150"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </button>

//       {/* Logout button */}
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-150"
//       >
//         Log Out
//       </button>
//     </nav>
//   );
// };

import React from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa'; // React Icons (removed motion import)

export const AdminNavabar = ({ isSidebarOpen, toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('Name');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav
      className={`bg-gray-900 shadow-md fixed top-0 z-50 px-6 py-3 flex items-center text-white ${
        isSidebarOpen ? 'left-64 right-0' : 'left-0 right-0'
      } transition-all duration-300`}
    >
      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="text-white hover:text-blue-300 transition duration-150 mr-4"
      >
        <FaBars className="h-6 w-6" />
      </button>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-150 flex items-center gap-2 ml-auto"
      >
        <FaSignOutAlt /> Log Out
      </button>
    </nav>
  );
};

export default AdminNavabar;


