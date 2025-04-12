const Reservation = require('../models/ReservationModel');
const ParkingSlot = require('../models/ParkingSlotModel');
const SecurityGuard = require('../models/SecurityGuardModel');
const bcrypt = require('bcryptjs');

const verifyReservation = async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({ success: false, message: 'QR data is required' });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
      console.log('Parsed QR Data:', parsedData); // Log parsed QR data
    } catch (parseError) {
      return res.status(400).json({ success: false, message: 'Invalid QR data format', error: parseError.message });
    }

    const reservation = await Reservation.findById(parsedData.reservationId)
      .populate('userId', 'fullName')
      .populate('vehicleId', 'registrationNum vehicleType')
      .populate('parkingId', 'title');

    if (!reservation) {
      console.log('Reservation not found for ID:', parsedData.reservationId); // Log if not found
      return res.status(404).json({ success: false, message: `Reservation not found for ID: ${parsedData.reservationId}` });
    }

    if (reservation.paymentStatus !== 'Completed') {
      console.log('Payment status issue:', reservation.paymentStatus); // Log payment status
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }

    if (reservation.status === 'Completed') {
      console.log('Reservation already completed for ID:', reservation._id); // Log if completed
      return res.status(400).json({ success: false, message: 'Reservation already verified and completed' });
    }

    // Debug logging for parking ID comparison
    console.log('Security Guard Parking ID:', req.user.parkingId);
    console.log('Reservation Parking ID:', reservation.parkingId._id);

    if (reservation.parkingId._id.toString() !== req.user.parkingId?.toString()) {
      console.log('Parking ID mismatch detected'); // Log mismatch
      return res.status(403).json({ success: false, message: 'Reservation not valid for this parking' });
    }

    reservation.status = 'Completed';
    await reservation.save();

    await ParkingSlot.findByIdAndUpdate(reservation.parkingSlotId, {
      isOccupied: false,
      reservationId: null,
    }).orFail(new Error('Failed to update parking slot'));

    res.status(200).json({
      success: true,
      message: 'Reservation verified and completed',
      data: {
        userName: reservation.userId.fullName,
        vehicleNumber: reservation.vehicleId.registrationNum,
        vehicleType: reservation.vehicleId.vehicleType,
        parkingTitle: reservation.parkingId.title,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
      },
    });
  } catch (error) {
    console.error('Verify Reservation Error:', {
      message: error.message,
      stack: error.stack,
      body: req.body,
      user: req.user ? { parkingId: req.user.parkingId } : 'No user data',
      parsedData: req.body.qrData ? JSON.parse(req.body.qrData) : 'No QR data',
    });
    if (error.message === 'Failed to update parking slot') {
      await Reservation.findByIdAndUpdate(parsedData.reservationId, { status: 'Pending' });
    }
    res.status(500).json({ success: false, message: error.message || 'Internal server error', details: error.stack });
  }
};



const createSecurityGuard = async (req, res) => {
  try {
    const { name, parkingId, email, password } = req.body;
   
    // Validate input
    if (!name || !parkingId || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields (name, parkingId, email, password) are required' });
    }

    // Check if email already exists
    const existingGuard = await SecurityGuard.findOne({ email });
    if (existingGuard) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new security guard
    const securityGuard = await SecurityGuard.create({
      name,
      parkingId,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: 'Security guard created successfully', data: securityGuard });
  } catch (error) {
    console.error('Create Security Guard Error:', {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(500).json({ success: false, message: 'Internal server error', details: error.stack });
  }
};


module.exports = { verifyReservation ,createSecurityGuard};