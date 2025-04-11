const Vehicle = require('../models/VehicalModel');

// Add Vehicle
const addVehicle = async (req, res) => {
  try {
    const newVehicle = await Vehicle.create(req.body);
    res.status(200).json({ success: true, message: 'Vehicle added successfully', data: newVehicle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error adding vehicle', error });
  }
};

// Get all Vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('userId');
    res.status(200).json(vehicles); // Yeh array of vehicles return karega
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error fetching vehicles', error });
  }
};

const deleteVehicale = async (req, res) => {
  try {
    const vehicale = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicale) return res.status(404).json({ success: false, message: 'vehicale not found' });
    res.status(200).json({ success: true, message: 'vehicale deleted', data: vehicale });
  } catch (error) {
    console.error('Delete vehicale error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
module.exports = { addVehicle, getAllVehicles,deleteVehicale };