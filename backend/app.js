// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// app.use(express.json());

// const cors = require('cors');
// app.use(cors());

// // Import all models to register them with Mongoose
// require('./src/models/UserModel');
// require('./src/models/VehicalModel');
// require('./src/models/ParkingModel'); // Parking model
// require('./src/models/ParkingSlotModel'); // ParkingSlot model
// require('./src/models/ReservationModel');
// require('./src/models/RoleModel'); // Assuming this exists for roleId
// require('./src/models/StateModel'); // Assuming for StateRoutes
// require('./src/models/CityModel'); // Assuming for CityRoutes
// require('./src/models/AreaModel'); // Assuming for AreaRoutes

// // Routes
// const roleRoutes = require('./src/routes/roleRoutes');
// const userRoutes = require('./src/routes/UserRoutes');
// const stateRoutes = require('./src/routes/StateRoutes');
// const cityRoutes = require('./src/routes/CityRoutes');
// const areaRoutes = require('./src/routes/AreaRoutes');
// const parkingRoutes = require('./src/routes/ParkingRoutes');
// const vehicleRoutes = require('./src/routes/vehicalRoutes');
// const reservationRoutes = require('./src/routes/ReservationRoutes');

// // Use routes with proper prefixes
// app.use('/roles', roleRoutes);
// app.use('/users', userRoutes);
// app.use('/state', stateRoutes);
// app.use('/city', cityRoutes);
// app.use('/area', areaRoutes);
// app.use('/parking', parkingRoutes);
// app.use('/vehicles', vehicleRoutes);
// app.use('/reservations', reservationRoutes);

// mongoose.connect("mongodb://127.0.0.1:27017/smartParking", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("database connected....");
// }).catch(err => {
//   console.error("Database connection error:", err);
// });

// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log("server is running port no ", PORT);
// });

// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config(); // .env file load karne ke liye (agar use kar raha ho)
const auth = require('./src/middleware/auth'); // Auth middleware

app.use(express.json());
app.use(cors());

// Import all models to register them with Mongoose
require('./src/models/UserModel');
require('./src/models/VehicalModel');
require('./src/models/ParkingModel');
require('./src/models/ParkingSlotModel');
require('./src/models/ReservationModel');
require('./src/models/RoleModel');
require('./src/models/StateModel');
require('./src/models/CityModel');
require('./src/models/AreaModel');
require('./src/models/PaymentModel');
require('./src/models/SecurityGuardModel')
// Routes
const roleRoutes = require('./src/routes/roleRoutes');
const userRoutes = require('./src/routes/UserRoutes');
const stateRoutes = require('./src/routes/StateRoutes');
const cityRoutes = require('./src/routes/CityRoutes');
const areaRoutes = require('./src/routes/AreaRoutes');
const parkingRoutes = require('./src/routes/ParkingRoutes');
const vehicleRoutes = require('./src/routes/vehicalRoutes');
const reservationRoutes = require('./src/routes/Reservationroutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const securityGuardRoutes = require('./src/routes/securityGuardRoutes');
// Use routes with proper prefixes
app.use('/roles', roleRoutes);
app.use('/users', userRoutes); // Public routes (signup, login, forgot-password, reset-password)
app.use('/state', stateRoutes);
app.use('/city', cityRoutes);
app.use('/area', areaRoutes); 
app.use('/payment', paymentRoutes);    

app.use('/parking', auth, parkingRoutes); // Protected
app.use('/vehicles', auth, vehicleRoutes); // Protected
app.use('/reservations', auth, reservationRoutes); // Protected
 app.use('/security-guard', auth ,securityGuardRoutes); // protected

// MongoDB connection without deprecated options
mongoose.connect("mongodb://127.0.0.1:27017/smartParking")
  .then(() => {
    console.log("Database connected....");
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});