// src/models/PaymentModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  reservationId: { type: Schema.Types.ObjectId, ref: 'Reservation', required: true },
  orderId: { type: String, required: true }, // Razorpay order ID
  razorpay_order_id: { type: String }, // Optional initially
  razorpay_payment_id: { type: String }, // Optional initially
  razorpay_signature: { type: String }, // Optional initially
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);