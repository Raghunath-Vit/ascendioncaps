import { useEffect, useState, useRef } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Modal, Box, IconButton, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import EditIcon from '@mui/icons-material/Edit';   // Import edit icon
import CheckIcon from '@mui/icons-material/Check';  // Import tick icon
import CancelIcon from '@mui/icons-material/Cancel';  // Import close icon
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateService = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [newService, setNewService] = useState({ serviceName: '', description: '', priceRange: '' });
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editService, setEditService] = useState(null);  // State for editing service
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [deleteServiceName, setDeleteServiceName] = useState('');
  const servicesEndRef = useRef(null);
  
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchServices = async (categoryId) => {
    setLoadingServices(true);
    try {
      const response = await axios.get(`http://localhost:5000/apis/category/${categoryId}`);
      setServices(response.data);
      setLoadingServices(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoadingServices(false);
    }
  };

  const handleCardClick = (categoryId, categoryName) => {
    setModalOpen(true);
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    fetchServices(categoryId);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setServices([]);
    setNewService({ serviceName: '', description: '', priceRange: '' });
    setShowServiceForm(false);
    setEditService(null); // Clear edit state on close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleCreateService = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/apis/services',
        {
          categoryId: selectedCategoryId,
          serviceName: newService.serviceName,
          description: newService.description,
          priceRange: newService.priceRange,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServices((prevServices) => [...prevServices, response.data]);
      servicesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setNewService({ serviceName: '', description: '', priceRange: '' });
      setShowServiceForm(false);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleEditClick = (service) => {
    setEditService(service); // Set service to be edited
    setNewService({
      serviceName: service.serviceName,
      description: service.description,
      priceRange: service.priceRange,
    });
    setShowServiceForm(true); // Show form for editing
  };

  const handleUpdateService = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/apis/${editService._id}`,
        newService,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === response.data._id ? response.data : service
        )
      );
      setEditService(null);
      setNewService({ serviceName: '', description: '', priceRange: '' });
      setShowServiceForm(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteClick = (serviceId, serviceName) => {
    setDeleteServiceId(serviceId);
    setDeleteServiceName(serviceName);
    setConfirmDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteModal(false);
    setDeleteServiceId(null);
    setDeleteServiceName('');
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/apis/services/${deleteServiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices((prevServices) => prevServices.filter((service) => service._id !== deleteServiceId));
      setConfirmDeleteModal(false);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Home services at your doorstep
      </Typography>

      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => handleCardClick(category._id, category.name)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>{category.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{category.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal open={modalOpen} onClose={handleModalClose} sx={{ overflowY: 'auto' }}>
        <Box sx={{ ...modalBoxStyles }}>
          <IconButton onClick={handleModalClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" gutterBottom>Services under "{selectedCategoryName}"</Typography>

          {loadingServices ? (
            <Grid container justifyContent="center"><CircularProgress /></Grid>
          ) : (
            <Grid container spacing={2}>
              {services.map((service) => (
                <Grid item xs={12} key={service._id}>
                  <Card
                    sx={{ marginBottom: 2, position: 'relative', cursor: 'pointer' }}
                    onClick={() => {
                      // Navigate to add-service route with service ID for workers/users
                      if (user && (user.role === 'worker' || user.role === 'user')) {
                        navigate(`/add-service/${service._id}`);
                      }
                    }}
                  >
                    {user && user.role === 'admin' ? (
                      <>
                        <IconButton
                          sx={{ position: 'absolute', top: 8, right: 32, color: 'blue' }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering card click
                            handleEditClick(service);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering card click
                            handleDeleteClick(service._id, service.serviceName);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : null}
                    <CardContent>
                      <Typography variant="h6" gutterBottom>{service.serviceName}</Typography>
                      <Typography variant="body2" color="textSecondary">{service.description}</Typography>
                      <Typography variant="body1">Price Range: {service.priceRange}</Typography>
                      <Typography variant="body2" color="textSecondary">Rating: {service.rating}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <div ref={servicesEndRef} />
            </Grid>
          )}

          {user && user.role === 'admin' && (
            <>
              {showServiceForm && (
                <Box sx={{ marginTop: 3 }}>
                  <Typography variant="h6">{editService ? 'Edit Service' : 'Create New Service'}</Typography>
                  <TextField
                    label="Service Name"
                    name="serviceName"
                    value={newService.serviceName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={newService.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Price Range"
                    name="priceRange"
                    value={newService.priceRange}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={editService ? handleUpdateService : handleCreateService}
                    sx={{ marginTop: 2 }}
                  >
                    {editService ? 'Update Service' : 'Create Service'}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>

      <Modal open={confirmDeleteModal} onClose={handleDeleteCancel}>
        <Box sx={modalBoxStyles}>
          <Typography variant="h6" gutterBottom>Are you sure you want to delete "{deleteServiceName}"?</Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <IconButton onClick={handleDeleteConfirm} color="primary">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleDeleteCancel} color="secondary">
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

const modalBoxStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',  // Set maximum height for the modal
  overflowY: 'auto',  // Enable scrolling for overflowing content
};

export default CreateService;
