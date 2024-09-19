// const express = require('express');
// const passport = require('passport');
// const twilio = require('twilio');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const router = express.Router();
// const dotenv = require('dotenv');
// const https = require('https');

// dotenv.config()
// // Create a custom HTTPS agent
// const agent = new https.Agent({
//   rejectUnauthorized: false, // Bypass SSL verification
// });
// // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, {
//   httpAgent: agent
// });



// // console.log(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUMBER);

// // Google OAuth login
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Generate JWT token
//     const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('jwt', token, { httpOnly: true });
//     res.redirect('/'); // Redirect to homepage or client-side route after login
//   }
// );


// router.post('/otp/send', async (req, res) => {
//   const { phoneNumber } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP

//   try {
//     const message = await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phoneNumber,
//     });

//     console.log('Twilio message sent:', message);

//     // Save OTP in session or database for future verification
//     req.session.otp = otp;
//     req.session.phoneNumber = phoneNumber;

//     res.json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error('Error sending OTP:', error); // Log the Twilio error
//     res.status(500).json({ error: 'Error sending OTP', details: error.message });
//   }
// });

// // Verify OTP
// router.post('/otp/verify', async (req, res) => {
//   const { otp } = req.body;

//   if (otp == req.session.otp) {
//     let user = await User.findOne({ phoneNumber: req.session.phoneNumber });
//     if (!user) {
//       user = new User({ phoneNumber: req.session.phoneNumber, name: 'New User' });
//       await user.save();
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('jwt', token, { httpOnly: true });
//     res.json({ message: 'OTP verified', token });
//   } else {
//     res.status(400).json({ error: 'Invalid OTP' });
//   }
// });



// router.post('/logout', (req, res) => {
//   res.clearCookie('jwt'); // Clear the JWT from cookies
//   res.json({ message: 'Logged out successfully' });
// });




// // Register User (Consumer)
// // router.post('/register', async (req, res) => {
// //   const { name, email, phoneNumber, password } = req.body;
// //   try {
// //       const existingUser = await User.findOne({ email });
// //       if (existingUser) return res.status(400).json({ message: 'User already exists' });

// //       const user = new User({ name, email, phoneNumber, password });
// //       await user.save();

// //       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

// //       res.status(201).json({ message: 'User registered successfully', token, user });
// //   } catch (err) {
// //       res.status(500).json({ message: err.message });
// //   }
// // });


// // Register Worker
// // router.post('/register-worker', async (req, res) => {
// //   const { name, email, phoneNumber, password } = req.body;
// //   try {
// //       const existingWorker = await User.findOne({ email });
// //       if (existingWorker) return res.status(400).json({ message: 'Worker already exists' });

// //       const worker = new User({ name, email, phoneNumber, password, role: 'worker' });
// //       await worker.save();

// //       const token = jwt.sign({ id: worker._id, role: worker.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

// //       res.status(201).json({ message: 'Worker registered successfully', token, worker });
// //   } catch (err) {
// //       res.status(500).json({ message: err.message });
// //   }
// // });


// // Register User (Consumer)
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const user = new User({ name, email, phoneNumber, password });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Register Worker
// router.post('/register-worker', async (req, res) => {
//   const { name, email, phoneNumber, password } = req.body;
//   try {
//     const existingWorker = await User.findOne({ email });
//     if (existingWorker) return res.status(400).json({ message: 'Worker already exists' });

//     const worker = new User({ name, email, phoneNumber, password, role: 'worker' });
//     await worker.save();

//     res.status(201).json({ message: 'Worker registered successfully', worker });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });








// // Login Route
// // router.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Check if the user exists
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid email or password' });
// //     }

// //     // Compare the password with the hashed password in the database
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid email or password' });
// //     }

// //     // Create a JWT payload
// //     const payload = {
// //       user: {
// //         id: user._id,
// //         role: user.role, // Add role in the token if needed
// //       },
// //     };

// //     // Sign the JWT token
// //     jwt.sign(
// //       payload,
// //       process.env.JWT_SECRET,
// //       { expiresIn: '1h' }, // Token expiration time
// //       (err, token) => {
// //         if (err) throw err;
// //         res.json({ token });
// //       }
// //     );
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).send('Server error');
// //   }
// // });


// // Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//     const payload = {
//       id: user._id,
//       role: user.role
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });





// module.exports = router;


const express = require('express');
const passport = require('passport');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // express-validator for validation
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
const dotenv = require('dotenv');
const https = require('https');

dotenv.config()

// Create a custom HTTPS agent
const agent = new https.Agent({
  rejectUnauthorized: false, // Bypass SSL verification
});

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, {
  httpAgent: agent
});

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/'); // Redirect to homepage or client-side route after login
  }
);

// Send OTP Route
router.post(
  '/otp/send',
  body('phoneNumber').isMobilePhone().withMessage('Invalid phone number').trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP

    try {
      const message = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      console.log('Twilio message sent:', message);

      // Save OTP in session or database for future verification
      req.session.otp = otp;
      req.session.phoneNumber = phoneNumber;

      res.json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error); // Log the Twilio error
      res.status(500).json({ error: 'Error sending OTP', details: error.message });
    }
  }
);

// Verify OTP Route
router.post(
  '/otp/verify',
  body('otp').isLength({ min: 6, max: 6 }).withMessage('Invalid OTP').trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { otp } = req.body;

    if (otp == req.session.otp) {
      let user = await User.findOne({ phoneNumber: req.session.phoneNumber });
      if (!user) {
        user = new User({ phoneNumber: req.session.phoneNumber, name: 'New User' });
        await user.save();
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true });
      res.json({ message: 'OTP verified', token });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  }
);

// Register User Route
router.post(
  '/register',
  [
    body('name').isLength({ min: 1 }).withMessage('Name is required').trim().escape(),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number').trim().escape(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });

      const user = new User({ name, email, phoneNumber, password });
      await user.save();

      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Register Worker Route
router.post(
  '/register-worker',
  [
    body('name').isLength({ min: 1 }).withMessage('Name is required').trim().escape(),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number').trim().escape(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phoneNumber, password } = req.body;
    try {
      const existingWorker = await User.findOne({ email });
      if (existingWorker) return res.status(400).json({ message: 'Worker already exists' });

      const worker = new User({ name, email, phoneNumber, password, role: 'worker' });
      await worker.save();

      res.status(201).json({ message: 'Worker registered successfully', worker });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email : { $regex: new RegExp(`^${email}$`, 'i') } });
      console.log(req.body.email);
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

      const payload = { id: user._id, role: user.role };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
