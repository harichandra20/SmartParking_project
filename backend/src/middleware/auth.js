// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//  // console.log('Token received in middleware:', token); // Debug ke liye

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role }
//     //console.log('Decoded token:', decoded); // Debug ke liye
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({ success: false, message: 'Token is not valid' });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // console.log('Token received in middleware:', token); // Debug ke liye

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Initial req.user with decoded data (id, role, etc.)
    req.user = { ...decoded }; // Spread operator se original data copy

    // Check if user has a role and is a security guard (assuming role is in token)
    if (decoded.role && decoded.role === 'Security' && decoded.parkingId) {
      // Add parkingId to req.user for security guards
      req.user.parkingId = decoded.parkingId;
      console.log('Security Guard authenticated, parkingId added:', req.user.parkingId); // Debug
    } else {
      console.log('User authenticated, no parkingId (non-security or missing role):', req.user); // Debug
    }

    // console.log('Decoded token:', decoded); // Debug ke liye
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};