// import React, { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { SecurityNavbar } from './SecurityNavbar';
// import axios from 'axios';

// export const SecuritySidebar = () => {
//   const [name, setName] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [reservations, setReservations] = useState([]); // Initial value is empty array

//   useEffect(() => {
//     setName(localStorage.getItem('Name') || ''); // Fallback to empty string if null
//     fetchReservations();
//   }, []);

//   const fetchReservations = async () => {
//     try {
//       const res = await axios.get('/reservations');
//       setReservations(res.data.data || []); // Fallback to empty array if data is undefined
//     } catch (error) {
//       console.error('Error fetching reservations:', error);
//       setReservations([]); // On error, reset to empty array
//     }
//   };

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex h-screen">
//       <aside
//         className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-800 text-white fixed h-full shadow-lg transition-all duration-300 overflow-hidden`}
//       >
//         <div className="p-4 text-lg font-bold flex items-center space-x-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//             />
//           </svg>
//           <span>Security Panel</span>
//         </div>
//         {name && (
//           <div className="px-4 py-2 border-b border-gray-700">
//             <p className="text-sm text-gray-300">Welcome,</p>
//             <p className="font-medium">{name}</p>
//           </div>
//         )}
//         <nav className="mt-4">
//           <ul className="space-y-1">
//             <li>
//               <a
//                 href="/securitysidebar"
//                 className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2"
//               >
//                 Dashboard ({reservations?.length ?? 0} Reservations)
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/securitysidebar/checkin"
//                 className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2"
//               >
//                 Check-In/Check-Out
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </aside>
//       <div
//         className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 min-h-screen transition-all duration-300`}
//       >
//         <SecurityNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <main className="p-4 bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SecurityNavbar } from './SecurityNavbar';
import axios from 'axios';

export const SecuritySidebar = () => {
  const [name, setName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem('Name') || '');
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get('/reservations');
      setReservations(res.data.data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setReservations([]);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-800 text-white fixed h-full shadow-lg transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4 text-lg font-bold flex items-center space-x-2">
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
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <span>Security Panel</span>
        </div>
        {name && (
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm text-gray-300">Welcome,</p>
            <p className="font-medium">{name}</p>
          </div>
        )}
        <nav className="mt-4">
          <ul className="space-y-1">
            <li>
              <a
                href="/securitysidebar"
                className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2"
              >
                Dashboard ({reservations?.length ?? 0} Reservations)
              </a>
            </li>
            <li>
              <a
                href="/securitysidebar/checkin"
                className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2"
                onClick={() => navigate('/securitysidebar/checkin')}
              >
                Check-In/Check-Out
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div
        className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 min-h-screen transition-all duration-300`}
      >
        <SecurityNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};