// src/models/ParkingSlotModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSlotSchema = new Schema({
  parkingId: { type: Schema.Types.ObjectId, ref: 'addParking', required: true },
  slotNumber: { type: String, required: true },
  vehicleType: { type: String, enum: ['2 Wheeler', '4 Wheeler', 'SUV'], required: true },
  isOccupied: { type: Boolean, default: false },
  reservationId: { type: Schema.Types.ObjectId, ref: 'Reservation', default: null }
}, { timestamps: true });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema); 