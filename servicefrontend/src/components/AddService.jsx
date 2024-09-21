// import { useEffect, useState } from 'react';
// import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Box, Modal, TextField, Snackbar, IconButton } from '@mui/material';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import {  useSelector } from 'react-redux';
// import { Close as CloseIcon } from '@mui/icons-material';

// const AddService = () => {
//   const { id: serviceId } = useParams(); // Get the serviceId from URL
//   const { token, user } = useSelector(state => state.auth); // Get user and token from Redux
//   const [workers, setWorkers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [serviceName, setServiceName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   // Fetch workers providing this service
//   const fetchWorkers = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/providers/${serviceId}/service-providers`);
//       setWorkers(response.data);
//     } catch (err) {
//       console.log(err);
//       setError('Error fetching workers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWorkers();
//   }, [serviceId]);

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   // Add new service provider
//   const handleSubmit = async () => {
//     try {
//       await axios.post(`http://localhost:5000/providers/${serviceId}/service-providers`, {
//         serviceId,
//         userId: user._id, // Get userId from Redux state
//         serviceName,
//         price,
//         description
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setSnackbarMessage('Service added successfully!');
//       setSnackbarOpen(true);
//       handleCloseModal();
//       fetchWorkers(); // Refresh the list of workers after adding a new company
//     } catch (err) {
//       console.log(err.response ? err.response.data : err.message);
//       setSnackbarMessage('Error adding service');
//       setSnackbarOpen(true);
//     }
//   };

//   if (loading) {
//     return (
//       <Container sx={{ paddingY: 5 }}>
//         <Grid container justifyContent="center">
//           <CircularProgress />
//         </Grid>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ paddingY: 5 }}>
//         <Typography variant="h6" color="error" align="center">{error}</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ paddingY: 5 }}>
//       <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
//         Workers for the Service
//       </Typography>
//       {/* Show 'Add Your Company' button only if the user role is 'worker' */}
//       {user?.role === 'worker' && (
//         <Button variant="contained" color="primary" onClick={handleOpenModal}>
//           Add Your Company
//         </Button>
//       )}
//       <Grid container spacing={3} sx={{ marginTop: 3 }}>
//         {workers.map((worker) => (
//           <Grid item xs={12} sm={6} md={4} key={worker._id}>
//             <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h6">{worker.serviceName}</Typography>
//                 <Typography variant="body1" sx={{ marginY: 1 }}>Price: ${worker.price}</Typography>
//                 <Typography variant="body2" color="textSecondary">{worker.description}</Typography>
//                 <Typography variant="body2" color="textSecondary">Rating: {worker.rating.toFixed(1)}</Typography>
//                 <Typography variant="body2" color="textSecondary">Provider: {worker.userId.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">Contact: {worker.userId.phoneNumber}</Typography>
//                 <Typography variant="body2" color="textSecondary">Email: {worker.userId.email}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box sx={{ width: 400, margin: 'auto', padding: 3, bgcolor: 'background.paper', marginTop: '10%', borderRadius: 2 }}>
//           <Typography id="modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
//             Add Your Company
//           </Typography>
//           <TextField
//             fullWidth
//             label="Service Name"
//             variant="outlined"
//             value={serviceName}
//             onChange={(e) => setServiceName(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Price"
//             variant="outlined"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             variant="outlined"
//             multiline
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
//             <IconButton onClick={handleCloseModal} sx={{ marginLeft: 1 }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </Box>
//       </Modal>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message={snackbarMessage}
//         action={
//           <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         }
//       />
//     </Container>
//   );
// };

// export default AddService;




import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Box, Modal, TextField, Snackbar, IconButton } from '@mui/material';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Close as CloseIcon, Delete as DeleteIcon, Check as CheckIcon, Clear as ClearIcon } from '@mui/icons-material';

const AddService = () => {
  const { id: serviceId } = useParams(); // Get the serviceId from URL
  const { token, user } = useSelector(state => state.auth); // Get user and token from Redux
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch workers providing this service
  const fetchWorkers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/providers/${serviceId}/service-providers`);
      setWorkers(response.data);
    } catch (err) {
      console.log(err);
      setError('Error fetching workers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [serviceId]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteClick = (workerId) => {
    setSelectedWorkerId(workerId);
    setConfirmDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/providers/${serviceId}/deleteprovider/${selectedWorkerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSnackbarMessage('Company removed successfully!');
      setSnackbarOpen(true);
      fetchWorkers(); // Refresh the list after deletion
    } catch (err) {
      console.log(err);
      setSnackbarMessage('Error removing company');
      setSnackbarOpen(true);
    } finally {
      setConfirmDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteModal(false);
    setSelectedWorkerId(null);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/providers/${serviceId}/service-providers`, {
        serviceId,
        userId: user._id, // Get userId from Redux state
        serviceName,
        price,
        description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSnackbarMessage('Service added successfully!');
      setSnackbarOpen(true);
      handleCloseModal();
      fetchWorkers(); // Refresh the list of workers after adding a new company
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
      setSnackbarMessage('Error adding service');
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return (
      <Container sx={{ paddingY: 5 }}>
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ paddingY: 5 }}>
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      </Container>
    );
  }

   // New handleBookNow function for navigating to the booking page
   const handleBookNow = (workerId) => {
    navigate(`/booknow/${workerId}`); // Navigate to the /booknow/:id route
  };

  if (loading) {
    return (
      <Container sx={{ paddingY: 5 }}>
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ paddingY: 5 }}>
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Workers for the Service
      </Typography>
      {/* Show 'Add Your Company' button only if the user role is 'worker' */}
      {user?.role === 'worker' && (
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add Your Company
        </Button>
      )}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {workers.map((worker) => (
          <Grid item xs={12} sm={6} md={4} key={worker._id}>
            <Card sx={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Red delete icon on the top right */}
              {user?.role === 'worker' && (
                <IconButton 
                  sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }} 
                  onClick={() => handleDeleteClick(worker._id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <CardContent>
                <Typography variant="h6">{worker.serviceName}</Typography>
                <Typography variant="body1" sx={{ marginY: 1 }}>Price: ${worker.price}</Typography>
                <Typography variant="body2" color="textSecondary">{worker.description}</Typography>
                <Typography variant="body2" color="textSecondary">Rating: {worker.rating.toFixed(1)}</Typography>
                <Typography variant="body2" color="textSecondary">Provider: {worker.userId.name}</Typography>
                <Typography variant="body2" color="textSecondary">Contact: {worker.userId.phoneNumber}</Typography>
                <Typography variant="body2" color="textSecondary">Email: {worker.userId.email}</Typography>
                {user?.role === 'user' && (
                  <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={() => handleBookNow(worker._id)}>
                    Book Now
                  </Button>
                )}
              </CardContent>
             
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation modal for deleting company */}
      <Modal
        open={confirmDeleteModal}
        onClose={handleDeleteCancel}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ width: 400, margin: 'auto', padding: 3, bgcolor: 'background.paper', marginTop: '10%', borderRadius: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Are you sure you want to remove your company?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
            <IconButton color="primary" onClick={handleDeleteConfirm}>
              <CheckIcon fontSize="large" />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteCancel}>
              <ClearIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Modal>

      {/* Modal for adding company */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ width: 400, margin: 'auto', padding: 3, bgcolor: 'background.paper', marginTop: '10%', borderRadius: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Add Your Company
          </Typography>
          <TextField
            fullWidth
            label="Service Name"
            variant="outlined"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            <IconButton onClick={handleCloseModal} sx={{ marginLeft: 1 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Container>
  );
};

export default AddService;
