// src/controller/ParkingController.js
const Parking = require('../models/ParkingModel');
const ParkingSlot = require('../models/ParkingSlotModel');

const addParking = async (req, res) => {
  try {
    const parking = await Parking.create(req.body);
    const slots = [];
    for (let i = 1; i <= req.body.totalCapacityTwoWheeler; i++) {
      slots.push({ parkingId: parking._id, slotNumber: `TW${i}`, vehicleType: '2 Wheeler', isOccupied: false });
    }
    for (let i = 1; i <= req.body.totalCapacityFourWheeler; i++) {
      slots.push({ parkingId: parking._id, slotNumber: `FW${i}`, vehicleType: '4 Wheeler', isOccupied: false });
    }

    const slotDocs = await ParkingSlot.insertMany(slots);
    parking.slots = slotDocs.map(slot => slot._id);
    await parking.save();

    res.status(201).json({ success: true, message: 'Parking added with slots', data: parking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.find().populate('ownerId', 'fullName').populate('slots');
    //console.log('Raw Parkings:', parkings);

    const updatedParkings = await Promise.all(parkings.map(async p => {
      // Agar slots empty hai, to ParkingSlot se fetch karo
      const slots = p.slots.length > 0 ? p.slots : await ParkingSlot.find({ parkingId: p._id });
      const twoWheelerSlots = slots.filter(s => s.vehicleType === '2 Wheeler');
      const fourWheelerSlots = slots.filter(s => s.vehicleType === '4 Wheeler' || s.vehicleType === 'SUV');
      return {
        ...p._doc,
        slots, // Update slots in response
        availableTwoWheeler: twoWheelerSlots.filter(s => !s.isOccupied).length,
        availableFourWheeler: fourWheelerSlots.filter(s => !s.isOccupied).length,
      };
    }));

    res.status(200).json({ success: true, data: updatedParkings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getParkingById = async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id).populate('slots');
    if (!parking) return res.status(404).json({ success: false, message: 'Parking not found' });
    res.status(200).json({
      success: true,
      data: {
        ...parking._doc,
        slots: parking.slots,
        availableSlots: parking.slots.filter(s => !s.isOccupied).length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateParking = async (req, res) => {
  try {
    const updatedParking = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParking) return res.status(404).json({ success: false, message: 'Parking not found' });
    res.status(200).json({ success: true, data: updatedParking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteParking = async (req, res) => {
  try {
    const deletedParking = await Parking.findByIdAndDelete(req.params.id);
    if (!deletedParking) return res.status(404).json({ success: false, message: 'Parking not found' });
    await ParkingSlot.deleteMany({ parkingId: req.params.id });
    res.status(200).json({ success: true, message: 'Parking and slots deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addParking, getAllParkings, getParkingById, updateParking, deleteParking };