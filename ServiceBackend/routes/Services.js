



const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Service = require('../models/Service');
const router = express.Router();
const auth = require('../middlewares/auth');

// Get services by category
router.get('/category/:category', 
  param('category')
    .trim()
    .notEmpty().withMessage('Category ID is required')
    .isMongoId().withMessage('Invalid category ID format'), // Assuming categoryId is MongoDB ObjectID
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const services = await Service.find({ categoryId: req.params.category });
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching services' });
    }
  }
);

router.get('/category', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services' });
  }
});

// Create a new Service (Worker only)
router.post('/services', 
  auth,
  [
    // Category ID validation
    body('categoryId')
      .trim()
      .notEmpty().withMessage('Category ID is required')
      .isMongoId().withMessage('Invalid category ID format'),
    // Service Name validation
    body('serviceName')
      .trim()
      .notEmpty().withMessage('Service name is required')
      .isLength({ min: 3 }).withMessage('Service name must be at least 3 characters long')
      .escape(),
    // Description validation
    body('description')
      .optional() // description is optional
      .trim()
      .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters')
      .escape(),
    // Price Range validation
    body('priceRange')
      .notEmpty().withMessage('Price range is required')
      .isNumeric().withMessage('Price range must be a number')
      .custom(value => value > 0).withMessage('Price range must be positive'),
  ],
  async (req, res) => {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Only workers can create services.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryId, serviceName, description, priceRange } = req.body;
    try {
      const service = new Service({ 
        categoryId, 
        serviceName, 
        description, 
        priceRange,
        serviceProviderId: req.user.id 
      });
      await service.save();

      res.status(201).json({ message: 'Service created successfully', service });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Update rating for a service
router.post('/:id/rate', 
  [
    // Service ID validation
    param('id')
      .isMongoId().withMessage('Invalid service ID format'),
    // Rating validation
    body('rating')
      .notEmpty().withMessage('Rating is required')
      .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating } = req.body;
    const serviceId = req.params.id;

    try {
      // Find the service
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Update the service's average rating
      await service.updateAverageRating(rating);

      res.json({ message: 'Rating submitted successfully', service });
    } catch (error) {
      console.error('Error submitting rating:', error);
      res.status(500).json({ error: 'Error submitting rating' });
    }
  }
);

module.exports = router;
