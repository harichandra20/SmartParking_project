const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registrationNum: { type: String, required: true, unique: true },
    vehicleType: { type: String, enum: ["4 Wheeler", "2 Wheeler"], required: true },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
