import { useState } from 'react';
import { Container, TextField, Typography, Button, Box, Snackbar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Close as CloseIcon } from '@mui/icons-material';

const Booking = () => {
  const { id: serviceProviderId } = useParams(); // Fetch serviceProviderId from route
  const { user, token } = useSelector((state) => state.auth); // Fetch userId from Redux state
  // console.log(user.id);
  const [bookingDate, setBookingDate] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate(); // To navigate to another page after booking

  const handleSubmit = async () => {
    if (!bookingDate) {
      setSnackbarMessage('Please select a booking date');
      setSnackbarOpen(true);
      return;
    }

    try {
      // Make a POST request to create a booking
      await axios.post('http://localhost:5000/api/bookings', {
        userId: user.id,
        serviceProviderId: serviceProviderId,
        bookingDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSnackbarMessage('Booking created successfully!');
      setSnackbarOpen(true);

      // Optionally navigate to a different page after booking
      navigate('/create-service'); // Adjust this to the correct route for your app
    } catch (err) {
      console.error(err);
      setSnackbarMessage('Error creating booking');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }} align="center">
        Create a Booking
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 400, margin: 'auto' }}>
        <TextField
          label="User ID"
          variant="outlined"
          value={user.id} // Display userId
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <TextField
          label="Service Provider ID"
          variant="outlined"
          value={serviceProviderId} // Display serviceProviderId
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
        <TextField
          label="Booking Date"
          variant="outlined"
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Booking
        </Button>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Booking;
