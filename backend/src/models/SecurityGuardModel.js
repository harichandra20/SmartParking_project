const mongoose = require('mongoose');

const securityGuardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  guardId: {
    type: String,
    required: true,
    unique: true,
  },
  parkingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addParking',
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SecurityGuard', securityGuardSchema);