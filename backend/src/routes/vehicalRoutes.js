const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/VehicalController");
const auth = require('../middleware/auth'); // Protected routes ke liye


// Add Vehicle
router.post("/add", vehicleController.addVehicle);

// Get all Vehicles
router.get("/", vehicleController.getAllVehicles);
router.delete("/:id", vehicleController.deleteVehicale);
module.exports = router;
