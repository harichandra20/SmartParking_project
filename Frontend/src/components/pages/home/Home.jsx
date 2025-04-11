import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, Search, Clock, CreditCard, Navigation, 
  MapPin, Phone, Mail, Users, ChevronRight,
  Facebook, Instagram, Twitter, Linkedin, Menu, X
} from 'lucide-react';

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "City Planner",
      text: "Implementing this smart parking system reduced traffic congestion in our downtown area by 35% in just three months.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Michael Chen",
      position: "Business Owner",
      text: "My customers love the convenience. The ability to reserve spots in advance has increased foot traffic to my store by 20%.",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Elena Rodriguez",
      position: "Daily Commuter",
      text: "I save at least 15 minutes every morning by knowing exactly where to park. The mobile app is intuitive and reliable.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const blogPosts = [
    {
      title: "The Future of Urban Parking",
      excerpt: "How AI and IoT are revolutionizing the way cities manage parking spaces...",
      date: "Feb 27, 2025",
      image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Reducing Carbon Footprint Through Smart Parking",
      excerpt: "Studies show smart parking solutions can reduce emissions by minimizing the time cars spend searching for parking...",
      date: "Feb 15, 2025",
      image: "https://images.unsplash.com/photo-1611617529462-ffd206eae1fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Integration of EV Charging Stations with Smart Parking",
      excerpt: "The perfect match: how our system prioritizes electric vehicles and renewable energy...",
      date: "Jan 30, 2025",
      image: "https://images.unsplash.com/photo-1598425237654-4fc758e50a93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-300" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">ParkSmart</span>
              </div>
              
              <div className="hidden md:ml-10 md:flex md:space-x-6">
                <a href="#" className="font-medium hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-200">Home</a>
                <a href="#features" className="font-medium hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-200">Features</a>
                <a href="#how-it-works" className="font-medium hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-200">How It Works</a>
                <a href="#testimonials" className="font-medium hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-200">Testimonials</a>
                <a href="#blog" className="font-medium hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-200">Blog</a>
                <a href="#contact" className="font-medium hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-200">Contact</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/login" className="hidden md:block text-white hover:text-blue-200 px-3 py-2 rounded-md font-medium transition-all duration-200">Login</a>
              <a href="/signup" className="hidden md:block bg-white text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg">Sign Up</a>
              <a href="#" className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-400 transition-all duration-200 shadow-md hover:shadow-lg">Download App</a>
              
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-800 shadow-inner"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">Home</a>
              <a href="#features" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">How It Works</a>
              <a href="#testimonials" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">Testimonials</a>
              <a href="#blog" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">Blog</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">Contact</a>
              <a href="/login" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">Login</a>
              <a href="/signup" className="block px-3 py-2 rounded-md text-white font-medium hover:bg-blue-600 transition-colors duration-150">Sign Up</a>
              <a href="#" className="block px-3 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-500 transition-colors duration-150">Download App</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-900 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                variants={staggerContainer}
                className="text-center lg:text-left"
              >
                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
                >
                  <span className="block">Smart Parking for</span>
                  <span className="block text-blue-400">Smarter Cities</span>
                </motion.h1>
                <motion.p 
                  variants={fadeInUp}
                  className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl lg:mx-0"
                >
                  Find, reserve, and pay for parking spots in real-time. Our IoT-powered solution reduces congestion and makes parking effortless.
                </motion.p>
                <motion.div 
                  variants={fadeInUp}
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                >
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
                    >
                      Get Started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#how-it-works"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
                    >
                      Learn More
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Smart parking illustration"
          />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:text-center"
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A Better Way to Park
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our comprehensive smart parking solution brings together cutting-edge technology and user-friendly design.
            </p>
          </motion.div>

          <div className="mt-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16"
            >
              <motion.div variants={fadeInUp} className="flex group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Search className="h-8 w-8" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg leading-6 font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Real-time Availability</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Know exactly where parking spots are available in real-time with our sensor network and mobile app.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Clock className="h-8 w-8" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg leading-6 font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Reservation System</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Reserve parking spots in advance for worry-free arrivals at your destination.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <CreditCard className="h-8 w-8" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg leading-6 font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Cashless Payments</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Pay for parking through our app with multiple payment options. No more searching for coins.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Navigation className="h-8 w-8" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg leading-6 font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Smart Navigation</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get turn-by-turn directions to your parking spot and back to your car when you need it.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:text-center"
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, Seamless Parking
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our system streamlines the entire parking experience from finding a spot to payment.
            </p>
          </motion.div>

          <div className="mt-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-10"
            >
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center max-w-xs text-center bg-white p-8 rounded-xl shadow-xl"
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 text-white text-2xl font-bold mb-6">1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Download the App</h3>
                <p className="text-base text-gray-500 mb-6">Available for iOS and Android devices. Create an account in seconds.</p>
                <img 
                  src="https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Mobile app screenshot" 
                  className="rounded-lg shadow-md w-full h-48 object-cover" 
                />
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center max-w-xs text-center bg-white p-8 rounded-xl shadow-xl"
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 text-white text-2xl font-bold mb-6">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Find & Reserve</h3>
                <p className="text-base text-gray-500 mb-6">Search for parking near your destination and reserve your spot in advance.</p>
                <img 
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Parking map" 
                  className="rounded-lg shadow-md w-full h-48 object-cover" 
                />
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col items-center max-w-xs text-center bg-white p-8 rounded-xl shadow-xl"
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 text-white text-2xl font-bold mb-6">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Park & Pay</h3>
                <p className="text-base text-gray-500 mb-6">Follow directions to your spot and pay securely through the app.</p>
                <img 
                  src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Payment process" 
                  className="rounded-lg shadow-md w-full h-48 object-cover" 
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:text-center mb-12"
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Our Users Say
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg min-h-[200px]">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-14 w-14 rounded-full border-2 border-blue-300 shadow-md" 
                      src={testimonials[activeTestimonial].avatar} 
                      alt={testimonials[activeTestimonial].name} 
                    />
                  </div>
                  <div className="ml-6">
                    <p className="text-gray-800 text-lg font-medium italic">"{testimonials[activeTestimonial].text}"</p>
                    <div className="mt-4">
                      <p className="text-blue-600 font-bold">{testimonials[activeTestimonial].name}</p>
                      <p className="text-gray-500">{testimonials[activeTestimonial].position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-6 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-12 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 gap-10 md:grid-cols-3"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center bg-blue-700/30 p-8 rounded-xl backdrop-blur-sm"
            >
              <motion.p 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-6xl font-extrabold text-white"
              >
                500+
              </motion.p>
              <p className="mt-2 text-xl text-blue-100">Parking Lots Connected</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center bg-blue-700/30 p-8 rounded-xl backdrop-blur-sm"
            >
              <motion.p 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-6xl font-extrabold text-white"
              >
                50,000+
              </motion.p>
              <p className="mt-2 text-xl text-blue-100">Active Users</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-center bg-blue-700/30 p-8 rounded-xl backdrop-blur-sm"
            >
              <motion.p 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl font-extrabold text-white"
              >
                30%
              </motion.p>
              <p className="mt-2 text-xl text-blue-100">Average Time Saved</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:text-center mb-12"
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Blog</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Latest News & Articles
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-medium">{post.date}</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">{post.title}</h3>
                  <p className="mt-3 text-gray-500">{post.excerpt}</p>
                  <div className="mt-6">
                    <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-500">
                      Read more <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 text-center">
            <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              View All Articles
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:text-center mb-12"
          >
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Contact Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Get in Touch
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Have questions or want to learn more about implementing our system? We're here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-50 p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue TRI-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900">Our Location</p>
                      <p className="text-gray-600">123 Smart Street, Tech Park, Innovation City, CA 94103</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">info@parksmart.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900">Support</p>
                      <p className="text-gray-600">24/7 technical support available</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-3 border"
                      placeholder="Your message here..."
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Transform Your Parking Experience?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Get started today and join thousands of satisfied users who have already made parking smarter.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                >
                  Download Now
                </a>
              </div>
              <div className="ml-3 inline-flex shadow">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">ParkSmart</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-md">
                ParkSmart is revolutionizing urban parking through smart technology. 
                Our IoT-powered solution makes finding and paying for parking effortless.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-200">Testimonials</a></li>
                <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} ParkSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaParking, FaUser, FaCar, FaMoon, FaSun, FaBlog, FaStar, FaEnvelope } from "react-icons/fa";
// import { motion } from "framer-motion"; // Motion for animations

// export const Home = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [feedback, setFeedback] = useState({ name: "", message: "" });
//   const [submitted, setSubmitted] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   const handleFeedback = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
//     setFeedback({ name: "", message: "" });
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-all duration-500`}>
//       {/* Navbar */}
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg"
//       >
//         <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <Link to="/" className="text-3xl font-extrabold flex items-center gap-2">
//             <FaParking className="text-blue-600 animate-spin-slow" /> ParkSmart
//           </Link>
//           <div className="hidden md:flex space-x-10">
//             {["Home", "Features", "Blog", "Contact"].map((item) => (
//               <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//                 <Link to={`/${item.toLowerCase()}`} className="text-lg hover:text-blue-600 transition-colors duration-300">
//                   {item}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//           <div className="flex items-center space-x-6">
//             <motion.button
//               whileHover={{ rotate: 360 }}
//               onClick={toggleDarkMode}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//             >
//               {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
//             </motion.button>
//             <Link to="/login" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">
//               Login
//             </Link>
//             <Link to="/signup" className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-transform transform hover:scale-105">
//               Sign Up
//             </Link>
//           </div>
//         </nav>
//       </motion.header>

//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2 }}
//         className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24"
//       >
//         <div className="container mx-auto px-6 text-center">
//           <motion.h1
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="text-5xl md:text-7xl font-extrabold mb-6"
//           >
//             Park Smarter, Live Better
//           </motion.h1>
//           <motion.p
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
//           >
//             Discover a seamless parking experience with real-time bookings, smart management, and more.
//           </motion.p>
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.7, duration: 0.6 }}
//             className="flex justify-center gap-6"
//           >
//             <Link to="/signup" className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-transform transform hover:scale-110">
//               Get Started
//             </Link>
//             <Link to="/bookparking" className="px-8 py-4 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-transform transform hover:scale-110">
//               Book Parking
//             </Link>
//           </motion.div>
//         </div>
//         <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center animate-pulse"></div>
//       </motion.section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-100 dark:bg-gray-800">
//         <div className="container mx-auto px-6">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl font-bold text-center mb-16"
//           >
//             Our Smart Features
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {[
//               { icon: <FaUser />, title: "Role-Based Access", desc: "Custom dashboards for users, owners, admins, and security." },
//               { icon: <FaCar />, title: "Live Availability", desc: "Check and book parking slots in real-time." },
//               { icon: <FaParking />, title: "Owner Tools", desc: "Manage spaces, bookings, and revenue effortlessly." },
//               { icon: <FaStar />, title: "Smart Suggestions", desc: "AI-driven parking spot recommendations." },
//               { icon: <FaEnvelope />, title: "Notifications", desc: "Get updates on bookings and availability." },
//             ].map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: idx * 0.2, duration: 0.6 }}
//                 className="p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
//               >
//                 <div className="text-blue-600 text-5xl mb-6 mx-auto flex justify-center">{feature.icon}</div>
//                 <h3 className="text-2xl font-semibold mb-4 text-center">{feature.title}</h3>
//                 <p className="text-center text-gray-600 dark:text-gray-300">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Blog Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-6">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl font-bold text-center mb-16"
//           >
//             Parking Insights & Updates
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {[
//               { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", title: "Urban Parking Hacks", desc: "Top tricks to park in busy cities." },
//               { img: "https://images.unsplash.com/photo-1506521781263-d8422e7f6323", title: "Tech in Parking", desc: "How IoT is revolutionizing parking." },
//               { img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7", title: "Owner Success Stories", desc: "How ParkSmart boosted revenue." },
//             ].map((post, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 whileInView={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: idx * 0.2, duration: 0.6 }}
//                 className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
//               >
//                 <img src={post.img} alt={post.title} className="w-full h-56 object-cover" />
//                 <div className="p-6">
//                   <h3 className="text-2xl font-semibold mb-3">{post.title}</h3>
//                   <p className="text-gray-600 dark:text-gray-300 mb-4">{post.desc}</p>
//                   <Link to={`/blog/${idx + 1}`} className="text-blue-600 hover:underline font-medium">Read More</Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gray-100 dark:bg-gray-800">
//         <div className="container mx-auto px-6">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl font-bold text-center mb-16"
//           >
//             Voices of ParkSmart
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {[
//               { quote: "ParkSmart saved me hours of searching for parking!", name: "Rahul Verma" },
//               { quote: "A game-changer for managing my parking lots.", name: "Neha Singh" },
//               { quote: "The real-time feature is just brilliant!", name: "Aakash Patel" },
//             ].map((testimonial, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ x: idx % 2 === 0 ? -100 : 100, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 transition={{ delay: idx * 0.3, duration: 0.8 }}
//                 className="p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg"
//               >
//                 <FaStar className="text-yellow-400 text-3xl mb-4" />
//                 <p className="italic text-lg mb-4">"{testimonial.quote}"</p>
//                 <p className="font-semibold text-blue-600">{testimonial.name}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Feedback Form */}
//       <section className="py-20">
//         <div className="container mx-auto px-6">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-5xl font-bold text-center mb-16"
//           >
//             Tell Us What You Think
//           </motion.h2>
//           <motion.form
//             initial={{ scale: 0.9, opacity: 0 }}
//             whileInView={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             onSubmit={handleFeedback}
//             className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg"
//           >
//             <div className="mb-6">
//               <label className="block text-lg font-medium mb-2">Name</label>
//               <input
//                 type="text"
//                 value={feedback.name}
//                 onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
//                 className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-lg font-medium mb-2">Message</label>
//               <textarea
//                 value={feedback.message}
//                 onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
//                 className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 rows="4"
//                 required
//               />
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="w-full px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
//             >
//               Submit Feedback
//             </motion.button>
//             {submitted && (
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-green-600 text-center mt-4"
//               >
//                 Thanks for your feedback!
//               </motion.p>
//             )}
//           </motion.form>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
//           <div>
//             <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
//               <FaParking /> ParkSmart
//             </h3>
//             <p className="text-gray-400">Your one-stop solution for smart parking.</p>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Explore</h3>
//             <ul className="space-y-3">
//               {["Home", "Features", "Blog", "Contact"].map((item) => (
//                 <motion.li key={item} whileHover={{ x: 5 }}>
//                   <Link to={`/${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
//                     {item}
//                   </Link>
//                 </motion.li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Support</h3>
//             <ul className="space-y-3">
//               {["FAQ", "Privacy Policy", "Terms of Service"].map((item) => (
//                 <motion.li key={item} whileHover={{ x: 5 }}>
//                   <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-blue-400 transition-colors">
//                     {item}
//                   </Link>
//                 </motion.li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
//             <p className="text-gray-400">Email: support@parksmart.com</p>
//             <p className="text-gray-400">Phone: +91 98765 43210</p>
//             <div className="flex gap-4 mt-4">
//               {["facebook", "twitter", "instagram"].map((social) => (
//                 <motion.a
//                   key={social}
//                   href={`https://${social}.com`}
//                   whileHover={{ scale: 1.2 }}
//                   className="text-gray-400 hover:text-blue-400"
//                 >
//                   <FaBlog />
//                 </motion.a>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="text-center mt-10 border-t border-gray-700 pt-6">
//           <p>© 2025 ParkSmart. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Link for navigation
// import { motion } from 'framer-motion'; // For animations
// import { FaParking, FaSearch, FaCalendarCheck, FaCreditCard, FaMapSigns, FaStar, FaEnvelope, FaBlog, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Icons

// export const Home = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const testimonials = [
//     { name: "Sarah Johnson", position: "City Planner", text: "Reduced traffic congestion by 35% in three months!", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
//     { name: "Michael Chen", position: "Business Owner", text: "20% more foot traffic thanks to reserved parking.", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
//     { name: "Elena Rodriguez", position: "Daily Commuter", text: "Saves me 15 minutes every morning—love the app!", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
//   ];

//   const blogPosts = [
//     { title: "The Future of Urban Parking", excerpt: "AI and IoT revolutionizing city parking...", date: "Feb 27, 2025", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
//     { title: "Smart Parking & Carbon Reduction", excerpt: "Cut emissions with efficient parking...", date: "Feb 15, 2025", image: "https://images.unsplash.com/photo-1506521781263-d8422e7f6323" },
//     { title: "EV Charging + Smart Parking", excerpt: "Prioritizing electric vehicles...", date: "Jan 30, 2025", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-500">
//       {/* Navbar */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
//               <FaParking className="text-3xl mr-2" />
//               <span className="text-2xl font-extrabold">ParkSmart</span>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex space-x-8">
//               {["Home", "Features", "How It Works", "Testimonials", "Blog", "Contact"].map((item) => (
//                 <motion.a
//                   key={item}
//                   href={`#${item.toLowerCase().replace(" ", "-")}`}
//                   whileHover={{ scale: 1.1, color: "#dbeafe" }}
//                   className="text-lg font-medium px-3 py-2 rounded-md transition-colors duration-300"
//                 >
//                   {item}
//                 </motion.a>
//               ))}
//             </div>

//             {/* CTA & Mobile Menu Button */}
//             <div className="flex items-center space-x-4">
//               <Link to="/login" className="hidden md:block px-4 py-2 text-white hover:bg-blue-600 rounded-full transition-colors">Login</Link>
//               <Link to="/signup" className="hidden md:block px-4 py-2 bg-white text-blue-700 rounded-full font-semibold hover:bg-blue-50 transition-transform transform hover:scale-105">Sign Up</Link>
//               <motion.button whileHover={{ scale: 1.1 }} className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
//                 </svg>
//               </motion.button>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               className="md:hidden bg-blue-800 py-2"
//             >
//               {["Home", "Features", "How It Works", "Testimonials", "Blog", "Contact", "Login", "Sign Up"].map((item) => (
//                 <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md">{item}</a>
//               ))}
//             </motion.div>
//           )}
//         </div>
//       </motion.nav>

//       {/* Hero Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.2 }}
//         className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-blue-900 text-white py-20 overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
//           <motion.div
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="lg:w-1/2 text-center lg:text-left"
//           >
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
//               Smart Parking for <span className="text-blue-400">Smarter Cities</span>
//             </h1>
//             <p className="text-lg sm:text-xl mb-8 max-w-md mx-auto lg:mx-0">
//               Find, reserve, and pay for parking in real-time with our IoT-powered solution.
//             </p>
//             <div className="flex justify-center lg:justify-start gap-4">
//               <Link to="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">Get Started</Link>
//               <Link to="#how-it-works" className="px-8 py-3 border border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-transform transform hover:scale-105">Learn More</Link>
//             </div>
//           </motion.div>
//           <motion.img
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
//             alt="Smart Parking"
//             className="lg:w-1/2 h-64 sm:h-96 lg:h-full object-cover rounded-lg shadow-2xl"
//           />
//         </div>
//       </motion.section>

//       {/* Features Section */}
//       <section id="features" className="py-16 bg-white dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
//           >
//             Why ParkSmart?
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               { icon: <FaSearch />, title: "Real-Time Availability", desc: "Instantly see available spots with our sensor network." },
//               { icon: <FaCalendarCheck />, title: "Reservation System", desc: "Book your spot ahead of time, stress-free." },
//               { icon: <FaCreditCard />, title: "Cashless Payments", desc: "Pay securely via app—no coins needed." },
//               { icon: <FaMapSigns />, title: "Smart Navigation", desc: "Get directions to your spot and back." },
//             ].map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: idx * 0.2, duration: 0.6 }}
//                 className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <div className="text-blue-600 text-4xl mb-4 flex justify-center">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-center">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-16 bg-gray-100 dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
//           >
//             How It Works
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {[
//               { step: "1", title: "Download App", desc: "Get it on iOS/Android and sign up.", img: "https://images.unsplash.com/photo-1611162617213-7d673e9e31ca" },
//               { step: "2", title: "Find & Reserve", desc: "Locate and book a spot near you.", img: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91" },
//               { step: "3", title: "Park & Pay", desc: "Arrive and pay via the app.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
//             ].map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 whileInView={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: idx * 0.2, duration: 0.6 }}
//                 className="text-center"
//               >
//                 <div className="flex justify-center items-center h-16 w-16 mx-auto rounded-full bg-blue-600 text-white text-2xl font-bold">{step.step}</div>
//                 <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300">{step.desc}</p>
//                 <img src={step.img} alt={step.title} className="mt-4 h-48 w-full object-cover rounded-lg shadow-md" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-16 bg-white dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
//           >
//             What Users Say
//           </motion.h2>
//           <div className="relative max-w-3xl mx-auto">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: index === activeTestimonial ? 1 : 0, x: index === activeTestimonial ? 0 : 50 }}
//                 transition={{ duration: 0.5 }}
//                 className={`absolute top-0 left-0 w-full ${index === activeTestimonial ? 'relative' : 'hidden'}`}
//               >
//                 <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg">
//                   <div className="flex items-start">
//                     <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4" />
//                     <div>
//                       <p className="text-lg italic text-gray-800 dark:text-gray-200">"{testimonial.text}"</p>
//                       <p className="mt-2 text-blue-600 font-semibold">{testimonial.name}</p>
//                       <p className="text-gray-500 dark:text-gray-400">{testimonial.position}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//             <div className="flex justify-center mt-6 space-x-2">
//               {testimonials.map((_, idx) => (
//                 <motion.button
//                   key={idx}
//                   whileHover={{ scale: 1.2 }}
//                   className={`h-3 w-3 rounded-full ${idx === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
//                   onClick={() => setActiveTestimonial(idx)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Blog Section */}
//       <section id="blog" className="py-16 bg-gray-100 dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
//           >
//             Latest Insights
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {blogPosts.map((post, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: idx * 0.2, duration: 0.6 }}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
//               >
//                 <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
//                 <div className="p-6">
//                   <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
//                   <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h3>
//                   <p className="mt-2 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
//                   <Link to={`/blog/${idx}`} className="mt-4 inline-block text-blue-600 hover:underline">Read More</Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-16 bg-white dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.h2
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
//           >
//             Get in Touch
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg"
//             >
//               <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
//               <form className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
//                   <input type="text" className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                   <input type="email" className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
//                   <textarea rows="4" className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600"></textarea>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                 >
//                   Submit
//                 </motion.button>
//               </form>
//             </motion.div>
//             <motion.div
//               initial={{ x: 50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="space-y-6">
//                 {[
//                   { icon: <FaPhone />, title: "Phone", detail: "+1 (555) 123-4567" },
//                   { icon: <FaEnvelope />, title: "Email", detail: "info@parksmart.com" },
//                   { icon: <FaMapMarkerAlt />, title: "Address", detail: "123 Innovation Way, Smart City, SC 10101" },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex items-center">
//                     <div className="flex-shrink-0 h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">{item.icon}</div>
//                     <div className="ml-4">
//                       <h3 className="text-lg font-semibold">{item.title}</h3>
//                       <p className="text-gray-600 dark:text-gray-300">{item.detail}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-2xl font-bold flex items-center gap-2"><FaParking /> ParkSmart</h2>
//             <p className="mt-2 text-gray-400">Smart parking for smarter cities.</p>
//           </motion.div>
//           {[
//             { title: "Solutions", links: ["For Cities", "For Businesses", "For Operators"] },
//             { title: "Resources", links: ["Documentation", "Blog", "Case Studies"] },
//             { title: "Company", links: ["About Us", "Careers", "Contact Us"] },
//           ].map((section, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ delay: idx * 0.2, duration: 0.8 }}
//             >
//               <h3 className="text-lg font-semibold">{section.title}</h3>
//               <ul className="mt-4 space-y-2">
//                 {section.links.map((link) => (
//                   <motion.li key={link} whileHover={{ x: 5 }}><Link to="#" className="text-gray-400 hover:text-white">{link}</Link></motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//         <div className="mt-8 text-center text-gray-400 border-t border-gray-700 pt-4">
//           <p>© {new Date().getFullYear()} ParkSmart. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };