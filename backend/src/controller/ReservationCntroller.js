// src/controller/ReservationController.js
// const Reservation = require('../models/ReservationModel');
// const ParkingSlot = require('../models/ParkingSlotModel');

// const addReservation = async (req, res) => {
//   try {
//     const { parkingId, vehicleId, userId, date, startTime, endTime } = req.body;
//     const availableSlot = await ParkingSlot.findOne({ parkingId, isOccupied: false });
//     if (!availableSlot) return res.status(400).json({ success: false, message: 'No available slots' });

//     const reservation = await Reservation.create({ ...req.body, parkingSlotId: availableSlot._id });
//     await ParkingSlot.findByIdAndUpdate(availableSlot._id, { isOccupied: true, reservationId: reservation._id });
//     res.status(201).json({ success: true, message: 'Reservation added', data: reservation });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getAllReservations = async (req, res) => {
//   try {
//     const reservations = await Reservation.find().populate('userId', 'fullName').populate('parkingId', 'title').populate('vehicleId', 'registrationNum');
//     res.status(200).json({ success: true, data: reservations });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = { addReservation, getAllReservations };

// src/controller/ReservationController.js

// const Reservation = require('../models/ReservationModel');
// const ParkingSlot = require('../models/ParkingSlotModel');
// const Parking = require('../models/ParkingModel');
// const Payment = require('../models/PaymentModel');
// const Razorpay = require('razorpay');
// const axios = require('axios');
// require('dotenv').config();
// const crypto = require('crypto'); 

// // Fix: Use the correct keys from .env without fallback to test values
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// const vehicleApiBaseUrl = process.env.VEHICLE_API_URL || 'http://localhost:3000'; 
         
// const addReservation = async (req, res) => {
//   try {
//     const { parkingId, vehicleId, userId, date, startTime, endTime } = req.body;

//     if (!parkingId || !vehicleId || !userId || !date || !startTime || !endTime) {
//       return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }

//     const parking = await Parking.findById(parkingId);
//     if (!parking) {
//       return res.status(404).json({ success: false, message: 'Parking not found' });
//     }

//     const availableSlot = await ParkingSlot.findOne({ parkingId, isOccupied: false });
//     if (!availableSlot) {
//       return res.status(400).json({ success: false, message: 'No available parking slots' });
//     }

//     let vehicle;
//     try {
//       const Vehicle = require('../models/VehicalModel');
//       vehicle = await Vehicle.findById(vehicleId);
//     } catch (err) {
//       console.log('Error finding vehicle in local DB:', err.message);
//       try {
//         const vehicleResponse = await axios.get(`${vehicleApiBaseUrl}/vehicles/${vehicleId}`, {
//           headers: { Authorization: req.headers.authorization }
//         });
//         vehicle = vehicleResponse.data;
//       } catch (apiErr) {
//         console.error('Error fetching vehicle from API:', apiErr.message);
//         return res.status(404).json({ success: false, message: 'Vehicle not found' });
//       }
//     }
//     if (!vehicle) {
//       return res.status(404).json({ success: false, message: 'Vehicle not found' });
//     }

//     const User = require('../models/UserModel');
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const start = new Date(`1970-01-01T${startTime}`);
//     const end = new Date(`1970-01-01T${endTime}`);
//     let durationHours;
//     if (end < start) {
//       const endNextDay = new Date(`1970-01-02T${endTime}`);
//       durationHours = Math.max(1, Math.ceil((endNextDay - start) / (1000 * 60 * 60)));
//     } else {
//       durationHours = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)));
//     }

//     const isTwoWheeler = vehicle.vehicleType === '2 Wheeler';
//     const hourlyCharge = isTwoWheeler ? parking.HourlyChargeTwoWheeler : parking.HourlyChargeFourWheeler;
//     const totalAmount = (hourlyCharge * durationHours) + 100;

//     const options = {
//       amount: totalAmount * 100,
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     };

//     console.log('Attempting to create Razorpay order with options:', options);
//     const order = await razorpay.orders.create(options);
//     console.log('Razorpay order created successfully:', order);

//     const reservation = await Reservation.create({
//       userId,
//       parkingId,
//       vehicleId,
//       date,
//       startTime,
//       endTime,
//       parkingSlotId: availableSlot._id,
//       paymentStatus: 'Pending' // Make sure this field exists in your schema
//     });

//     await ParkingSlot.findByIdAndUpdate(availableSlot._id, { 
//       isOccupied: true, 
//       reservationId: reservation._id 
//     });

//     const payment = await Payment.create({
//       reservationId: reservation._id,
//       orderId: order.id,
//       razorpay_order_id: order.id,
//       amount: totalAmount,
//       status: 'Pending'
//     });

//     reservation.paymentId = payment._id;
//     await reservation.save();

//     // Fix: Send the correct Razorpay key ID from .env
//     res.status(201).json({
//       success: true,
//       message: 'Reservation created, please pay',
//       data: reservation,
//       order: {
//         id: order.id,
//         amount: order.amount,
//         currency: order.currency,
//         reservationId: reservation._id
//       },
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error) {
//     console.error('Reservation error details:', {
//       message: error.message || 'No error message available',
//       stack: error.stack || 'No stack trace available',
//       code: error.code || 'No error code available',
//       name: error.name || 'Unknown error',
//       response: error.response?.data || 'No response data',
//       request: error.request || 'No request data',
//     });
//     res.status(500).json({ success: false, message: error.message || 'Internal server error' });
//   }
// };

// const verifyPayment = async (req, res) => {
//   try {
//     console.log('Received verifyPayment request with body:', req.body);
//     const { reservationId, razorpayPaymentId, razorpaySignature, razorpayOrderId } = req.body;

//     if (!reservationId || !razorpayPaymentId || !razorpaySignature || !razorpayOrderId) {
//       console.log('Validation failed due to missing fields');
//       return res.status(400).json({ success: false, message: 'Missing required payment verification fields' });
//     }

//     const reservation = await Reservation.findById(reservationId).populate('paymentId');
//     console.log('Fetched reservation:', reservation);
//     if (!reservation || !reservation.paymentId) {
//       console.log('Reservation or payment not found');
//       return res.status(404).json({ success: false, message: 'Reservation or payment record not found' });
//     }

//     const payment = reservation.paymentId;
    
//     // Fix: Use the correct secret from .env without fallback
//     const generatedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_SECRET)
//       .update(`${razorpayOrderId}|${razorpayPaymentId}`)
//       .digest('hex');

//     console.log('Generated Signature:', generatedSignature);
//     console.log('Received Signature:', razorpaySignature);

//     if (generatedSignature !== razorpaySignature) {
//       payment.status = 'Failed';
//       payment.errorMessage = 'Signature mismatch';
//       await payment.save();
//       console.log('Signature mismatch detected, updating payment status to Failed');

//       reservation.paymentStatus = 'Failed';
//       await reservation.save();
//       console.log('Updated reservation payment status to Failed');

//       await ParkingSlot.findByIdAndUpdate(reservation.parkingSlotId, { 
//         isOccupied: false, 
//         reservationId: null 
//       });
//       console.log('Released parking slot');

//       return res.status(400).json({ 
//         success: false, 
//         message: 'Payment verification failed due to signature mismatch',
//         debug: { generatedSignature, receivedSignature: razorpaySignature }
//       });
//     }

//     payment.razorpay_payment_id = razorpayPaymentId;
//     payment.razorpay_signature = razorpaySignature;
//     payment.razorpay_order_id = razorpayOrderId;
//     payment.status = 'Completed';
//     await payment.save();
//     console.log('Updated payment with verification details');

//     reservation.paymentStatus = 'Completed';
//     await reservation.save();
//     console.log('Updated reservation payment status to Completed');

//     res.status(200).json({ success: true, message: 'Payment verified, reservation confirmed' });
//   } catch (error) {
//     console.error('Payment verification error details:', {
//       message: error.message || 'No error message available',
//       stack: error.stack || 'No stack trace available',
//       code: error.code || 'No error code available',
//       name: error.name || 'Unknown error',
//       response: error.response?.data || 'No response data',
//       request: error.request || 'No request data',
//     });
//     res.status(500).json({ success: false, message: error.message || 'Internal server error during payment verification' });
//   }
// };

// const getAllReservations = async (req, res) => {
//   try {
//     const reservations = await Reservation.find()
//       .populate('userId', 'fullName')
//       .populate('parkingId', 'title')
//       .populate('vehicleId', 'registrationNum')
//       .populate('paymentId');
//     res.status(200).json({ success: true, data: reservations });
//   } catch (error) {
//     console.error('Error fetching reservations:', error);
//     res.status(500).json({ success: false, message: error.message || 'Error fetching reservations' });
//   }
// };

// const getUserReservations = async (req, res) => {
//   try {
//     const userId = req.params.userId || req.userId;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: 'User ID is required' });
//     }

//     const reservations = await Reservation.find({ userId })
//       .populate('parkingId', 'title location')
//       .populate('vehicleId', 'registrationNum vehicleType')
//       .populate('paymentId')
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, count: reservations.length, data: reservations });
//   } catch (error) {
//     console.error('Error fetching user reservations:', error);
//     res.status(500).json({ success: false, message: error.message || 'Error fetching user reservations' });
//   }
// };

// module.exports = { addReservation, verifyPayment, getAllReservations, getUserReservations };

const Reservation = require('../models/ReservationModel');
const ParkingSlot = require('../models/ParkingSlotModel');
const Parking = require('../models/ParkingModel');
const Payment = require('../models/PaymentModel');
const Vehicle = require('../models/VehicalModel');
const User = require('../models/UserModel');
const Razorpay = require('razorpay');
const QRCode = require('qrcode');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Secure SSL port
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter setup failed:', error);
  } else {
    console.log('Email transporter is ready');
  }
});  

const addReservation = async (req, res) => {
  try {
    const { parkingId, vehicleId, userId, date, startTime, endTime } = req.body;

    // Input validation
    if (!parkingId || !vehicleId || !userId || !date || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: 'All fields (parkingId, vehicleId, userId, date, startTime, endTime) are required' });
    }

    // Fetch and validate parking
    const parking = await Parking.findById(parkingId);
    if (!parking) {
      return res.status(404).json({ success: false, message: 'Parking not found' });
    }

    // Find an available slot with better error handling
    const availableSlot = await ParkingSlot.findOne({ parkingId, isOccupied: false }).lean();
    if (!availableSlot) {
      return res.status(400).json({ success: false, message: 'No available parking slots' });
    }

    // Validate vehicle
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Calculate duration and amount
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const durationHours = end <= start
      ? Math.max(1, Math.ceil((new Date(`1970-01-02T${endTime}:00Z`) - start) / (1000 * 60 * 60)))
      : Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)));

    const isTwoWheeler = vehicle.vehicleType === '2 Wheeler';
    const hourlyCharge = isTwoWheeler ? parking.HourlyChargeTwoWheeler || 20 : parking.HourlyChargeFourWheeler || 40;
    const totalAmount = (hourlyCharge * durationHours) + 100; // Added 100 as base fee

    // Create reservation first
    const reservation = await Reservation.create({
      userId,
      parkingId,
      vehicleId,
      date,
      startTime,
      endTime,
      parkingSlotId: availableSlot._id,
      paymentStatus: 'Pending',
    });

    // Update parking slot
    await ParkingSlot.findByIdAndUpdate(availableSlot._id, {
      isOccupied: true,
      reservationId: reservation._id,
    }).orFail(new Error('Failed to update parking slot'));

    // Create Razorpay order after reservation with short receipt
    let order;
    try {
      const shortReceipt = `${reservation._id.toString().slice(0, 20)}_${Date.now().toString().slice(-6)}`; // Convert to string first
      order = await razorpay.orders.create({
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        receipt: shortReceipt,
      });
    } catch (razorpayError) {
      console.error('Razorpay Order Creation Error:', razorpayError);
      // Rollback: Free the slot if order fails
      await ParkingSlot.findByIdAndUpdate(availableSlot._id, { isOccupied: false, reservationId: null });
      await Reservation.findByIdAndDelete(reservation._id);
      return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }

    // Create payment record
    const payment = await Payment.create({
      reservationId: reservation._id,
      orderId: order.id,
      razorpay_order_id: order.id,
      amount: totalAmount,
      status: 'Pending',
    });

    reservation.paymentId = payment._id;
    await reservation.save();

    // Generate QR code
    const qrData = JSON.stringify({
      reservationId: reservation._id.toString(),
      userId: userId.toString(),
      vehicleId: vehicleId.toString(),
      parkingId: parkingId.toString(),
      paymentStatus: reservation.paymentStatus,
    });
    const qrCode = await QRCode.toDataURL(qrData);

    res.status(201).json({
      success: true,
      message: 'Reservation created, please pay',
      data: reservation,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        reservationId: reservation._id,
      },
      key: process.env.RAZORPAY_KEY_ID,
      qrCode,
    });
  } catch (error) {
    console.error('Add Reservation Error:', {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    // Rollback on error
    if (error.message === 'Failed to update parking slot' && availableSlot) {
      await ParkingSlot.findByIdAndUpdate(availableSlot._id, { isOccupied: false, reservationId: null });
    }
    res.status(500).json({ success: false, message: error.message || 'Internal server error', details: error.stack });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { reservationId, razorpayPaymentId, razorpaySignature, razorpayOrderId } = req.body;

    if (!reservationId || !razorpayPaymentId || !razorpaySignature || !razorpayOrderId) {
      return res.status(400).json({ success: false, message: 'Missing required payment verification fields' });
    }

    const reservation = await Reservation.findById(reservationId).populate('paymentId userId');
    if (!reservation || !reservation.paymentId) {
      return res.status(404).json({ success: false, message: 'Reservation or payment record not found' });
    }

    const payment = reservation.paymentId;
    const user = reservation.userId;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      payment.status = 'Failed';
      payment.errorMessage = 'Signature mismatch';
      await payment.save();

      reservation.paymentStatus = 'Failed';
      await reservation.save();

      await ParkingSlot.findByIdAndUpdate(reservation.parkingSlotId, {
        isOccupied: false,
        reservationId: null,
      });

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed due to signature mismatch',
      });
    }
  
    payment.razorpay_payment_id = razorpayPaymentId;
    payment.razorpay_signature = razorpaySignature;
    payment.razorpay_order_id = razorpayOrderId;
    payment.status = 'Completed';
    await payment.save();
  
    reservation.paymentStatus = 'Completed';
    await reservation.save();

    const qrData = JSON.stringify({
      reservationId: reservation._id.toString(),
      userId: user._id.toString(),
      vehicleId: reservation.vehicleId.toString(),
      parkingId: reservation.parkingId.toString(),
      paymentStatus: reservation.paymentStatus,
      status: reservation.status,
    });
    const qrCode = await QRCode.toDataURL(qrData);

    try {
      await transporter.sendMail({
        to: user.email,
        subject: 'Your Parking Reservation QR Code',
        html: `
          <h2>Reservation Confirmed!</h2>
          <p>Thank you for your payment. Here is your QR code for verification:</p>
          <img src="cid:unique-qrcode-id" alt="QR Code" />
          <p>Reservation ID: ${reservation._id}</p>
          <p>Show this QR code to the security guard at the parking location.</p>
        `,
        attachments: [{
          filename: 'qrcode.png',
          content: qrCode.split(';base64,')[1],
          encoding: 'base64',
          cid: 'unique-qrcode-id',
        }],
      });
      console.log(`Payment confirmation email sent to: ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send payment confirmation email:', emailError);
      return res.status(200).json({
        success: true,
        message: 'Payment verified, reservation confirmed (Email sending failed)',
        data: reservation,
        qrCode,
        emailError: {
          message: emailError.message,
          code: emailError.code,
          stack: emailError.stack,
        },
      });
    }  
  
    res.status(200).json({
      success: true,
      message: 'Payment verified, reservation confirmed',
      data: reservation,
      qrCode,
    });
  } catch (error) {
    console.error('Verify Payment Error:', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: 'Internal server error during payment verification',
      error: error.message,
      details: { stack: error.stack },
    });
  }
};  

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('userId', 'fullName email')
      .populate('parkingId', 'title location')
      .populate('vehicleId', 'registrationNum vehicleType')
      .populate('paymentId')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    console.error('Get All Reservations Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error fetching reservations' });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id; // Support both params and auth middleware

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }
  
    const reservations = await Reservation.find({ userId })
      .populate('parkingId', 'title location')
      .populate('vehicleId', 'registrationNum vehicleType')
      .populate('paymentId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reservations.length, data: reservations });
  } catch (error) {
    console.error('Get User Reservations Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error fetching user reservations' });
  }
};
  
const cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId).populate('paymentId');
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
  
    if (reservation.paymentStatus === 'Completed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel a completed reservation' });
    }

    reservation.status = 'Cancelled';
    reservation.paymentStatus = 'Failed';
    await reservation.save();

    if (reservation.paymentId) {
      await Payment.findByIdAndUpdate(reservation.paymentId, { status: 'Failed' });
    }

    await ParkingSlot.findByIdAndUpdate(reservation.parkingSlotId, {
      isOccupied: false,
      reservationId: null,
    });

    res.status(200).json({ success: true, message: 'Reservation cancelled successfully', data: reservation });
  } catch (error) {
    console.error('Cancel Reservation Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error cancelling reservation' });
  }
};

const getReservationQR = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findById(reservationId).populate('userId');

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    const qrData = JSON.stringify({
      reservationId: reservation._id.toString(),
      userId: reservation.userId._id.toString(),
      vehicleId: reservation.vehicleId.toString(),
      parkingId: reservation.parkingId.toString(),
      paymentStatus: reservation.paymentStatus,
      status: reservation.status,
    });
    const qrCode = await QRCode.toDataURL(qrData);

    res.status(200).json({ success: true, qrCode });
  } catch (error) {
    console.error('Get QR Code Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error generating QR code' });
  }
};

module.exports = {
  addReservation,
  verifyPayment,
  getAllReservations,
  getUserReservations,
  cancelReservation,
  getReservationQR,
};