import React, { useEffect, useState } from 'react';
import { FaParking, FaCarAlt, FaMotorcycle, FaPlus, FaSync, FaMapMarkerAlt } from 'react-icons/fa'; 
import axios from '../common/axios';
import { motion } from 'framer-motion'; // Import framer-motion

export const ManageParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get('/parking');
      setParkings(res.data.data || []);
    } catch (error) {
      console.error('Error fetching parkings:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 600); // Add slight delay for better animation effect
    }
  };

  const getStatusColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: { scale: 0.98 }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const refreshIconVariants = {
    initial: { rotate: 0 },
    rotate: { rotate: 360, transition: { duration: 1, ease: "linear" } }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (percent) => ({
      width: `${percent}%`,
      transition: { duration: 0.8, ease: "easeOut" }
    })
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Stats */}
        <motion.div 
          className="mb-8 bg-white rounded-2xl shadow-xl p-8 border border-indigo-100"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <motion.div 
              className="flex items-center gap-3 mb-4 md:mb-0"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div 
                className="bg-indigo-600 p-3 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaParking className="text-white text-2xl" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Parking Management
              </h1>
            </motion.div>
            <div className="flex space-x-3">
              <motion.button 
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                whileHover={buttonVariants.hover}
                whileTap={buttonVariants.tap}
                disabled={refreshing}
              >
                <motion.div
                  variants={refreshIconVariants}
                  initial="initial"
                  animate={refreshing ? "rotate" : "initial"}
                >
                  <FaSync />
                </motion.div> 
                Refresh
              </motion.button>
              <motion.button 
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                whileHover={buttonVariants.hover}
                whileTap={buttonVariants.tap}
              >
                <FaPlus /> Add Parking
              </motion.button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              custom={0}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-md"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <p className="text-sm text-indigo-600 font-medium">Total Parkings</p>
              <motion.p 
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {parkings.length}
              </motion.p>
            </motion.div>
            <motion.div 
              custom={1}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 shadow-md"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <p className="text-sm text-blue-600 font-medium">Total Two-Wheelers</p>
              <motion.p 
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                {parkings.reduce((sum, parking) => sum + (parking.availableTwoWheeler || 0), 0)}
              </motion.p>
            </motion.div>
            <motion.div 
              custom={2}
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100 shadow-md"
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <p className="text-sm text-emerald-600 font-medium">Total Four-Wheelers</p>
              <motion.p 
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {parkings.reduce((sum, parking) => sum + (parking.availableFourWheeler || 0), 0)}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Parking Cards */}
        {loading ? (
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="text-indigo-600 text-4xl"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 1.5, ease: "linear", repeat: Infinity },
                scale: { duration: 1, repeat: Infinity }
              }}
            >
              <FaParking />
            </motion.div>
          </motion.div>
        ) : parkings.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {parkings.map((parking, index) => {
              const twoWheelerTotal = parking.totalTwoWheeler || 100;
              const fourWheelerTotal = parking.totalFourWheeler || 100;
              const twoWheelerPercent = Math.min(100, (parking.availableTwoWheeler / twoWheelerTotal) * 100);
              const fourWheelerPercent = Math.min(100, (parking.availableFourWheeler / fourWheelerTotal) * 100);
              
              return (
                <motion.div
                  key={parking._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  layout
                >
                  <motion.div 
                    className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"
                    whileHover={{ height: "10px", transition: { duration: 0.3 } }}
                  ></motion.div>
                  <div className="p-6">
                    <motion.h2 
                      className="text-xl font-bold text-gray-800 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {parking.title}
                    </motion.h2>
                    <motion.p 
                      className="text-gray-500 mb-4 flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <FaMapMarkerAlt className="text-indigo-400" />
                      {parking.address || 'No address provided'}
                    </motion.p>
                    
                    <div className="space-y-4">
                      {/* 2 Wheeler Status */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-1 text-gray-600">
                            <FaMotorcycle /> Two-Wheelers
                          </span>
                          <motion.span 
                            className="font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {parking.availableTwoWheeler} / {twoWheelerTotal}
                          </motion.span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div 
                            className={`h-2.5 rounded-full ${getStatusColor(parking.availableTwoWheeler, twoWheelerTotal)}`}
                            custom={twoWheelerPercent}
                            variants={progressVariants}
                            initial="hidden"
                            animate="visible"
                          ></motion.div>
                        </div>
                      </div>
                      
                      {/* 4 Wheeler Status */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-1 text-gray-600">
                            <FaCarAlt /> Four-Wheelers
                          </span>
                          <motion.span 
                            className="font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            {parking.availableFourWheeler} / {fourWheelerTotal}
                          </motion.span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div 
                            className={`h-2.5 rounded-full ${getStatusColor(parking.availableFourWheeler, fourWheelerTotal)}`}
                            custom={fourWheelerPercent}
                            variants={progressVariants}
                            initial="hidden"
                            animate="visible"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mt-6 pt-4 border-t border-gray-100 flex justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.button 
                        className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button 
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium text-sm"
                        whileHover={{ scale: 1.05, backgroundColor: "#e0e7ff" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Manage
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <FaParking className="text-gray-300 text-5xl mx-auto mb-4" />
              </motion.div>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                No parking locations available.
              </motion.p>
              <motion.p 
                className="text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Add your first parking location to get started.
              </motion.p>
            </motion.div>
            <motion.button 
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <FaPlus /> Add Parking Location
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ManageParkings;