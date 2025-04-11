
// const routes = require('express').Router();
// const userController = require('../controller/UserController');

// routes.post('/signup', userController.signup);
// routes.post('/login', userController.login);
// routes.delete('/delete/:id', userController.deleteUser);
// routes.get('/getuser/:id', userController.getoneUser);
// routes.get('/getusers', userController.getAllUser);
// routes.put('/update/:id', userController.updateUser);

// module.exports = routes;
const routes = require('express').Router();
const userController = require('../controller/UserController');
const { body } = require('express-validator');
const auth = require('../middleware/auth'); // Protected routes ke liye

// Public Routes
try {   
  routes.post(
    '/signup',
    [
      body('fullName').notEmpty().withMessage('Full name is required'),
      body('email').isEmail().withMessage('Please enter a valid email'),
      body('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must be 8+ characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character'),
      body('PhoneNumber').matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
      body('role').isIn(['User', 'Admin', 'ParkingOwner', 'Security']).withMessage('Invalid role'),
    ],
    userController.signup
  );
} catch (error) {
  console.log("this is signup error",error);
}

// ... (other routes remain same)

routes.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  userController.login
);

routes.post('/forgot-password', userController.forgotPassword);
routes.post('/reset-password', userController.resetPassword);

// Protected Routes
routes.delete('/delete/:id', auth, userController.deleteUser);
routes.get('/getuser/:id', auth, userController.getoneUser);
routes.get('/getusers', auth, userController.getAllUser);
routes.put('/update/:id', auth, userController.updateUser);
routes.get('/verify-token', userController.verifyToken);

module.exports = routes;