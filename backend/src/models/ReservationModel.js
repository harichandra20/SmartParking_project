// // src/models/ReservationModel.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const reservationSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   parkingId: { type: Schema.Types.ObjectId, ref: 'addParking', required: true },
//   parkingSlotId: { type: Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
//   vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
//   date: { type: Date, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
//   amountPaid: { type: Number, default: 0 },
//   securityAmountPaid: { type: Number, default: 100 }
// }, { timestamps: true });

// module.exports = mongoose.model('Reservation', reservationSchema);

// src/models/ReservationModel.js

// src/models/ReservationModel.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const reservationSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   parkingId: { type: Schema.Types.ObjectId, ref: 'addParking', required: true },
//   parkingSlotId: { type: Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
//   vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
//   date: { type: Date, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
//   paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' }, // Link to Payment model
// }, { timestamps: true });

// module.exports = mongoose.model('Reservation', reservationSchema);
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addParking',
    required: true
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  parkingSlotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingSlot',
    required: true
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Cancelled'],
    default: 'Active'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);