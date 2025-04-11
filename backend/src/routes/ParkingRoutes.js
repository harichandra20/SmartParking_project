const express = require('express');
const router = express.Router();
const {
    addParking,
    getAllParkings,
    getParkingById,
    updateParking,
    deleteParking
} = require('../controller/parkingController');

router.post('/add', addParking);
router.get('/', getAllParkings);
router.get('/:id', getParkingById);
router.put('/:id', updateParking);
router.delete('/:id', deleteParking);

module.exports = router;
