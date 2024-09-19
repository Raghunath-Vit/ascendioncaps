// const express = require('express');
// const https = require('https');
// const twilio = require('twilio');
// const Booking = require('../models/Booking');
// const auth = require('../middlewares/auth');
// const router = express.Router();
// const multer = require('multer');
// const dotenv=require('dotenv');
// const upload = multer({ dest: 'uploads/' }); // Store proof images
// const {  verifyOtp } = require('../controllers/otp');
// const Service = require('../models/Service');
// // const { updateServiceAverageRating } = require('../controllers/booking');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
// dotenv.config();
// const agent = new https.Agent({
//   rejectUnauthorized: false, 
// });

// // Configure Twilio client
// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);


// // Create a booking
// router.post('/', auth, async (req, res) => {
//   try {
//     const { userId, serviceId, bookingDate } = req.body;

//     // Fetch the service to get the service provider ID
//     const service = await Service.findById(serviceId);
//     if (!service) {
//       return res.status(404).json({ error: 'Service not found' });
//     }

//     // Create the booking with serviceProviderId
//     const booking = new Booking({
//       userId,
//       serviceId,
//       serviceProviderId: service.serviceProviderId, // Populate from the service
//       bookingDate
//     });

//     await booking.save();
//     res.json({ message: 'Booking successful', booking });

//     // (Optional) You can notify the service provider here using Twilio or another method
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating booking' });
//   }
// });


// // Upload proof image and complete booking
// // router.post('/:id/proof',upload.single('proofImage'), async (req, res) => {
// //   try {
// //     const booking = await Booking.findById(req.params.id);
// //     if (!booking) return res.status(404).json({ error: 'Booking not found' });

// //     booking.proofImage = req.file.path;
// //     booking.status = 'Completed';
// //     await booking.save();

// //     res.json({ message: 'Booking completed', booking });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error completing booking' });
// //   }
// // });

// // Upload beforeWorking and afterWorking proof images and complete the booking
// // router.post('/:id/proof', upload.fields([
// //   { name: 'beforeWorking', maxCount: 1 },
// //   { name: 'afterWorking', maxCount: 1 }
// // ]), async (req, res) => {
// //   try {
// //     const booking = await Booking.findById(req.params.id);
// //     if (!booking) return res.status(404).json({ error: 'Booking not found' });

// //     // Check if both files were uploaded
// //     const beforeWorking = req.files['beforeWorking'] ? req.files['beforeWorking'][0].path : null;
// //     const afterWorking = req.files['afterWorking'] ? req.files['afterWorking'][0].path : null;

// //     if (!beforeWorking || !afterWorking) {
// //       return res.status(400).json({ error: 'Both beforeWorking and afterWorking files are required' });
// //     }

// //     // Save the file paths and mark booking as completed
// //     booking.beforeWorking = beforeWorking;
// //     booking.afterWorking = afterWorking;
// //     booking.status = 'Completed';
// //     await booking.save();

// //     res.json({ message: 'Booking completed with proof images', booking });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error completing booking with proof images' });
// //   }
// // });



// // Upload beforeWorking and afterWorking proof images and complete the booking
// // router.post('/:id/proof', upload.fields([
// //   { name: 'beforeWorking', maxCount: 1 },
// //   { name: 'afterWorking', maxCount: 1 }
// // ]), async (req, res) => {
// //   try {
// //     const booking = await Booking.findById(req.params.id);
// //     if (!booking) return res.status(404).json({ error: 'Booking not found' });

// //     // Check if both files were uploaded
// //     const beforeWorking = req.files['beforeWorking'] ? req.files['beforeWorking'][0].path : null;
// //     const afterWorking = req.files['afterWorking'] ? req.files['afterWorking'][0].path : null;

// //     if (!beforeWorking || !afterWorking) {
// //       return res.status(400).json({ error: 'Both beforeWorking and afterWorking files are required' });
// //     }

// //     // Save the file paths and mark booking as completed
// //     booking.beforeWorking = beforeWorking;
// //     booking.afterWorking = afterWorking;
// //     booking.status = 'Completed';
// //     await booking.save();

// //     // Call sendOtp function after booking is saved
// //     const { phoneNumber } = req.body; // Ensure phoneNumber is passed in the request body
// //     const otpResponse = await sendOtp({ body: { phoneNumber, bookingId: booking._id } }); // Pass parameters to sendOtp

// //     res.json({ message: 'Booking completed with proof images and OTP sent', booking, otpResponse });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ error: 'Error completing booking with proof images' });
// //   }
// // });

// // Send OTP for service verification (adjusted to accept req and res directly)
// // const sendOtp = async ({ body }) => {
// //   const { phoneNumber, bookingId } = body; // Destructure the parameters
// //   const otp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP

// //   // Find the booking by ID
// //   const booking = await Booking.findById(bookingId);
// //   if (!booking) {
// //     throw new Error('Booking not found');
// //   }

// //   // Construct the Google Form link with the OTP
// //   const googleFormLink = 'https://forms.gle/5QrV5yKBFGqUdiUB6';

// //   // Send OTP via Twilio
// //   await client.messages.create({
// //     body: `Your OTP is ${otp}. Please provide feedback using this link: ${googleFormLink}`,
// //     from: process.env.TWILIO_PHONE_NUMBER,
// //     to: phoneNumber,
// //   });

// //   // Save the OTP in the booking record
// //   booking.otp = otp;
// //   await booking.save();

// //   return { message: 'OTP and Google Form link sent and saved', booking };
// // };





// router.post('/:id/proof', upload.fields([
//   { name: 'beforeWorking', maxCount: 1 },
//   { name: 'afterWorking', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     // Check if both files were uploaded
//     const beforeWorking = req.files['beforeWorking'] ? req.files['beforeWorking'][0].path : null;
//     const afterWorking = req.files['afterWorking'] ? req.files['afterWorking'][0].path : null;

//     if (!beforeWorking || !afterWorking) {
//       return res.status(400).json({ error: 'Both beforeWorking and afterWorking files are required' });
//     }

//     // Save the file paths and mark booking as completed
//     booking.beforeWorking = beforeWorking;
//     booking.afterWorking = afterWorking;
//     booking.status = 'Completed';
//     await booking.save();

//     // Call sendOtp function after booking is saved
//     const otpResponse = await sendOtp({ bookingId: booking._id }); // Only pass bookingId

//     res.json({ message: 'Booking completed with proof images and OTP sent', booking, otpResponse });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Error completing booking with proof images' });
//   }
// });



// const sendOtp = async ({ bookingId }) => {
//   // Find the booking by ID
//   const booking = await Booking.findById(bookingId).populate('userId'); // Populate the user data
//   if (!booking) {
//     throw new Error('Booking not found');
//   }

//   // Get the phoneNumber from the populated userId field
//   const { phoneNumber } = booking.userId;
//   if (!phoneNumber) {
//     throw new Error('User does not have a phone number');
//   }

//   // Generate a random 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000);

//   // Construct the Google Form link with the OTP
//   const googleFormLink = 'https://forms.gle/5QrV5yKBFGqUdiUB6';

//   // Send OTP via Twilio
//   await client.messages.create({
//     body: `Your OTP is ${otp}. Please provide feedback using this link: ${googleFormLink}`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phoneNumber,
//   });

//   // Save the OTP in the booking record
//   booking.otp = otp;
//   await booking.save();

//   return { message: 'OTP and Google Form link sent and saved', booking };
// };





// // Verify OTP to close the booking
// router.post('/bookings/:id/verify-otp', verifyOtp);




// router.post('/:id/rate', async (req, res) => {
//   const { rating } = req.body;
//   const bookingId = req.params.id;

//   try {
//     if (rating < 0 || rating > 5) {
//       return res.status(400).json({ error: 'Rating must be between 0 and 5' });
//     }

//     // Find the booking and update its rating
//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     if (booking.status === 'Pending') {
//       return res.status(400).json({ error: 'Cannot rate a service that is not completed or closed' });
//     }

//     // Update the booking's rating
//     await booking.updateRating(rating);

//     // Update the service's average rating
//     const service = await Service.findById(booking.serviceId);
//     await service.updateAverageRating(rating);

//     res.json({ message: 'Rating submitted successfully', booking });
//   } catch (error) {
//     res.status(500).json({ error: 'Error submitting rating' });
//   }
// });





// module.exports = router;










const express = require('express');
const https = require('https');
const twilio = require('twilio');
const Booking = require('../models/Booking');
const auth = require('../middlewares/auth');
const router = express.Router();
const multer = require('multer');
const dotenv = require('dotenv');
const { body, param, validationResult } = require('express-validator');
const upload = multer({ dest: 'uploads/' }); // Store proof images
const { verifyOtp } = require('../controllers/otp');
const Service = require('../models/Service');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
dotenv.config();
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Configure Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Error handling middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a booking
router.post(
  '/',
  auth,
  [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('serviceId').isMongoId().withMessage('Invalid service ID'),
    body('bookingDate').isISO8601().withMessage('Invalid booking date'),
  ],
  validate,
  async (req, res) => {
    try {
      const { userId, serviceId, bookingDate } = req.body;

      // Fetch the service to get the service provider ID
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Create the booking with serviceProviderId
      const booking = new Booking({
        userId,
        serviceId,
        serviceProviderId: service.serviceProviderId, // Populate from the service
        bookingDate,
      });

      await booking.save();
      res.json({ message: 'Booking successful', booking });
    } catch (error) {
      res.status(500).json({ error: 'Error creating booking' });
    }
  }
);

// Upload beforeWorking and afterWorking proof images and complete the booking
router.post(
  '/:id/proof',
  [
    param('id').isMongoId().withMessage('Invalid booking ID'),
    upload.fields([
      { name: 'beforeWorking', maxCount: 1 },
      { name: 'afterWorking', maxCount: 1 },
    ]),
  ],
  validate,
  async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      // Check if both files were uploaded
      const beforeWorking = req.files['beforeWorking'] ? req.files['beforeWorking'][0].path : null;
      const afterWorking = req.files['afterWorking'] ? req.files['afterWorking'][0].path : null;

      if (!beforeWorking || !afterWorking) {
        return res.status(400).json({ error: 'Both beforeWorking and afterWorking files are required' });
      }

      // Save the file paths and mark booking as completed
      booking.beforeWorking = beforeWorking;
      booking.afterWorking = afterWorking;
      booking.status = 'Completed';
      await booking.save();

      // Call sendOtp function after booking is saved
      const otpResponse = await sendOtp({ bookingId: booking._id }); // Only pass bookingId

      res.json({ message: 'Booking completed with proof images and OTP sent', booking, otpResponse });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error completing booking with proof images' });
    }
  }
);

const sendOtp = async ({ bookingId }) => {
  // Find the booking by ID
  const booking = await Booking.findById(bookingId).populate('userId'); // Populate the user data
  if (!booking) {
    throw new Error('Booking not found');
  }

  // Get the phoneNumber from the populated userId field
  const { phoneNumber } = booking.userId;
  if (!phoneNumber) {
    throw new Error('User does not have a phone number');
  }

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Construct the Google Form link with the OTP
  const googleFormLink = 'https://forms.gle/5QrV5yKBFGqUdiUB6';

  // Send OTP via Twilio
  await client.messages.create({
    body: `Your OTP is ${otp}. Please provide feedback using this link: ${googleFormLink}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });

  // Save the OTP in the booking record
  booking.otp = otp;
  await booking.save();

  return { message: 'OTP and Google Form link sent and saved', booking };
};

// Verify OTP to close the booking
router.post('/bookings/:id/verify-otp', verifyOtp);

// Rate a booking and service
router.post(
  '/:id/rate',
  [
    param('id').isMongoId().withMessage('Invalid booking ID'),
    body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  ],
  validate,
  async (req, res) => {
    const { rating } = req.body;
    const bookingId = req.params.id;

    try {
      // Find the booking and update its rating
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      if (booking.status === 'Pending') {
        return res.status(400).json({ error: 'Cannot rate a service that is not completed or closed' });
      }

      // Update the booking's rating
      await booking.updateRating(rating);

      // Update the service's average rating
      const service = await Service.findById(booking.serviceId);
      await service.updateAverageRating(rating);

      res.json({ message: 'Rating submitted successfully', booking });
    } catch (error) {
      res.status(500).json({ error: 'Error submitting rating' });
    }
  }
);

module.exports = router;
