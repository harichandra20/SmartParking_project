// // src/routes/ReservationRoutes.js
// const express = require('express');
// const router = express.Router();
// const { addReservation, verifyPayment, getAllReservations } = require('../controller/ReservationCntroller');

// // Routes
// router.post('/add', addReservation);
// router.post('/verify-payment', verifyPayment);
// router.get('/', getAllReservations);

// module.exports = router; // Ensure this exports the router object

const express = require('express');
const router = express.Router();
const { addReservation, verifyPayment, getAllReservations, getUserReservations, cancelReservation, getReservationQR } = require('../controller/ReservationCntroller');

router.post('/add', addReservation);
router.post('/verify-payment', verifyPayment);
router.get('/', getAllReservations);
router.get('/user/:userId', getUserReservations);
router.delete('/:reservationId', cancelReservation);
router.get('/:reservationId/qr-code', getReservationQR);

module.exports = router;