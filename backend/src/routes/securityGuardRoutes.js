const express = require('express');
const router = express.Router();
const SecurityGuardController = require('../controller/SecurityGuardController');
const auth = require('../middleware/auth'); // Tera existing auth middleware

router.post('/verify-reservation', auth, SecurityGuardController.verifyReservation);
// router.post('/addsecurity-guards', SecurityGuardController.createSecurityGuard);
router.post('/addsecurity-guards',SecurityGuardController.createSecurityGuard);

module.exports = router;