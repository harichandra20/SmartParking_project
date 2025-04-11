// const mongoose = require('mongoose');

// const Schema=mongoose.Schema;

// const userSchema = new Schema({

//          fullName :{
//             type:String,
//          },
//          email :{
//             type:String
//          },
//          PhoneNumber :{
//             type:Number
//          },
//          role : {
//             type:String
//          },
//          password : {
//             type:String
//          },
//          roleId:{
//             type:Schema.Types.ObjectId,
//             ref:"roles"
//          }


// })

// module.exports = mongoose.model("User",userSchema)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
  },
  password: { type: String, required: true }, // Removed regex validation
  role: {
    type: String,
    enum: ['User', 'Admin', 'ParkingOwner', 'Security'],
    default: 'User',
  },
  PhoneNumber: { // Added PhoneNumber field
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Phone number must be 10 digits'],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);