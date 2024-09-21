const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProviderModel'); 
const Service = require('../models/Service');
const auth = require('../middlewares/auth');

// Only workers can add ServiceProviderModel
router.post('/:serviceId/service-providers', auth, async (req, res) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ message: 'Access denied. Only workers can add service providers.' });
  }

  try {
    const serviceId = req.params.serviceId;
    const { serviceProviderEmail, serviceName, price, description } = req.body;

    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res.status(400).json({ error: 'Invalid serviceId. The specified service does not exist.' });
    }

    const serviceProvider = new ServiceProvider({
      categoryId: serviceExists.categoryId,
      serviceProviderEmail,
      serviceId,
      userId: req.user.id, // Associate with the logged-in worker
      serviceName,
      price,
      description
    });
    await serviceProvider.save();
    res.status(201).json(serviceProvider);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve all service providers for a service
router.get('/:serviceId/service-providers', async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const serviceProviders = await ServiceProvider.find({ serviceId })
          .populate('userId');
      // .populate('serviceId') // Populate service details
      // .populate('userId'); // Optionally populate user details if needed
    res.status(200).json(serviceProviders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a single service provider by ID
router.get('/:serviceId/service-providers/:providerId', async (req, res) => {
  try {
    const { serviceId, providerId } = req.params;
    
    // Check if the service exists
    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res.status(400).json({ error: 'Invalid serviceId. The specified service does not exist.' });
    }

    // Find the service provider
    const serviceProvider = await ServiceProvider.findOne({ _id: providerId, serviceId })
      // .populate('serviceId');
      .populate('userId');

    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found.' });
    }

    res.status(200).json(serviceProvider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Delete a service provider by ID
router.delete('/:serviceId/deleteprovider/:id', auth, async (req, res) => {
  try {
    const { serviceId, id } = req.params;

    // Ensure the user is a worker and is authorized to delete the provider
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Access denied. Only workers can delete service providers.' });
    }

    const serviceExists = await Service.findById(serviceId);
    if (!serviceExists) {
      return res.status(400).json({ error: 'Invalid serviceId. The specified service does not exist.' });
    }

    // Find and delete the service provider by ID
    const serviceProvider = await ServiceProvider.findOneAndDelete({ _id: id, serviceId });
    if (!serviceProvider) {
      return res.status(404).json({ error: 'Service provider not found.' });
    }

    res.status(200).json({ message: 'Service provider deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
