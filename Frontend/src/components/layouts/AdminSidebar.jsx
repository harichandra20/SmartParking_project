// import React, { useEffect, useState, useRef } from 'react';
// import { AdminNavabar } from './AdminNavabar';
// import { Outlet } from 'react-router-dom';

// export const AdminSidebar = () => {
//   const [admin, setAdmin] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [parkings, setParkings] = useState([]);

//   useEffect(() => {
//     setAdmin(localStorage.getItem('Name'));
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const userRes = await axios.get('/users/getusers');
//       const parkingRes = await axios.get('/parking');
//       setUsers(userRes.data.data);
//       setParkings(parkingRes.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex h-screen">
//       <aside className={`bg-gray-800 text-white fixed h-full shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
//         <div className="p-4 text-lg font-bold">{admin} (Admin)</div>
//         <nav className="mt-4">
//           <ul className="space-y-2">
//             <li><a href="/adminsidebar" className="flex items-center p-3 hover:bg-gray-700">Dashboard</a></li>
//             <li><a href="/adminsidebar/users" className="flex items-center p-3 hover:bg-gray-700">Manage Users ({users.length})</a></li>
//             <li><a href="/adminsidebar/parkings" className="flex items-center p-3 hover:bg-gray-700">Manage Parkings ({parkings.length})</a></li>
//           </ul>
//         </nav>
//       </aside>
//       <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
//         <AdminNavabar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//         <main className="p-4"><Outlet /></main>
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // For animations
import { FaUserShield, FaUsers, FaParking, FaBars, FaUser, FaBook } from 'react-icons/fa'; // Added new icons
import axios from '../common/axios'; // Adjust path to your axios instance
import { Outlet } from 'react-router-dom';
import { AdminNavabar } from './AdminNavabar'; // Import navbar

export const AdminSidebar = () => {
  const [admin, setAdmin] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    setAdmin(localStorage.getItem('Name') || 'Admin');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await axios.get('/users/getusers');
      const parkingRes = await axios.get('/parking');
      setUsers(userRes.data.data || []);
      setParkings(parkingRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Animation Variants
  const sidebarVariants = {
    open: { width: '16rem', transition: { duration: 0.3 } },
    closed: { width: 0, overflow: 'hidden', transition: { duration: 0.3 } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 text-gray-800">
      <AdminNavabar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <motion.aside
        variants={sidebarVariants}
        animate={isSidebarOpen ? 'open' : 'closed'}
        className={`fixed h-full shadow-lg bg-gray-800 text-white z-40 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
      >
        <div className="p-4 text-xl font-bold flex items-center gap-2">
          <FaUserShield className="text-blue-400" />
          {isSidebarOpen && `${admin} (Admin)`}
        </div>
        <nav className="mt-6">
          <motion.ul className="space-y-1" initial="hidden" animate="visible">
            <motion.li custom={0} variants={navItemVariants}>
              <a href="/adminsidebar" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">
                <FaBars className="mr-3" /> {isSidebarOpen && 'Dashboard'}
              </a>
            </motion.li>
            <motion.li custom={2} variants={navItemVariants}>
              <a href="/adminsidebar/Manageusers" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">
                <FaUsers className="mr-3" /> {isSidebarOpen && `Manage Users (${users.length})`}
              </a>
            </motion.li>
            <motion.li custom={1} variants={navItemVariants}>
              <a href="/adminsidebar/ManageParkings" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">
                <FaParking className="mr-3" /> {isSidebarOpen && 'ManageParkings'}
              </a>
            </motion.li>
            <motion.li custom={3} variants={navItemVariants}>
              <a href="/adminsidebar/bookinghistory" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">
                <FaBook className="mr-3" /> {isSidebarOpen && 'Bookings'}
              </a>
            </motion.li>
            <motion.li custom={4} variants={navItemVariants}>
              <a href="/adminsidebar/profile" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">
                <FaUser className="mr-3" /> {isSidebarOpen && 'Profile'}
              </a>
            </motion.li>
          </motion.ul>
        </nav>
      </motion.aside>
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
        <main className="p-6 bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminSidebar;