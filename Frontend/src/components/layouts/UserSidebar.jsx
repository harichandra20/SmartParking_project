import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserNavbar } from './UserNavbar';

export const UserSidebar = () => {
  const [name, setName] = useState(localStorage.getItem('Name') || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-800 text-white fixed h-full shadow-lg transition-all duration-300 overflow-hidden`}>
        <div className="p-4 text-lg font-bold flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span>User Panel</span>
        </div>
        {name && <div className="px-4 py-2 border-b border-gray-700"><p className="text-sm text-gray-300">Welcome,</p><p className="font-medium">{name}</p></div>}
        <nav className="mt-4">
          <ul className="space-y-1">
            <li><a href="/usersidebar" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">Dashboard</a></li>
            <li><a href="/usersidebar/vehicles" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">My Vehicles</a></li>
            <li><a href="/usersidebar/bookparking" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">Book Parking</a></li>
            <li><a href="/usersidebar/bookinghistory" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">Booking History</a></li>
            <li><a href="/usersidebar/profile" className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-md mx-2">Profile</a></li>
          </ul>
        </nav>
      </aside>
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 min-h-screen transition-all duration-300`}>
        <UserNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="p-4 bg-gray-50"><Outlet /></main>
      </div>
    </div>
  );
};