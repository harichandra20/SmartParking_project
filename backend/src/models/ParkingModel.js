// src/models/ParkingModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const parkingSchema = new Schema({
  title: { type: String, required: true },
  totalCapacityTwoWheeler: { type: Number, required: true },
  totalCapacityFourWheeler: { type: Number, required: true },
  HourlyChargeTwoWheeler: { type: Number, required: true },
  HourlyChargeFourWheeler: { type: Number, required: true },
  state: { type: Schema.Types.ObjectId, ref: 'state', required: true },
  city: { type: Schema.Types.ObjectId, ref: 'city', required: true },
  area: { type: Schema.Types.ObjectId, ref: 'area', required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parkingType: { type: String, enum: ['Road', 'Ground', 'Building'], required: true },
  active: { type: Boolean, default: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: 'ParkingSlot' }] // Added slots reference
}, { timestamps: true }); 

module.exports = mongoose.model('addParking', parkingSchema); 