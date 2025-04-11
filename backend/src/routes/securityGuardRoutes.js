const express = require('express');
const router = express.Router();
const { verifyReservation } = require('../controller/SecurityGuardController');
const auth = require('../middleware/auth'); // Tera existing auth middleware

router.post('/verify-reservation', auth, verifyReservation);

module.exports = router;