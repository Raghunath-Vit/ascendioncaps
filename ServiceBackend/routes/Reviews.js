const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// API to receive reviews from Google Form
router.post('/reviews', async (req, res) => {
  const { name, email, review } = req.body;

  // Validate review data
  if (!name || !email || !review) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Find the service by the service provider's email
    const service = await Service.findOne({ serviceProviderEmail: email });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Convert review to a float rating
    const rating = parseFloat(review);
    
    // Validate the rating
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating. Must be between 0 and 5.' });
    }

    // Update the service's average rating using the method in the Service model
    await service.updateAverageRating(rating);

    // Send a success response
    res.status(200).json({ message: 'Review submitted and rating updated', service });

  } catch (error) {
    console.error('Error updating review:', error.message);
    res.status(500).json({ error: 'Error submitting review' });
  }
});


module.exports = router;
