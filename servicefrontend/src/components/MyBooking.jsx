import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, TextField, MenuItem, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import ReactStars from 'react-rating-stars-component'; // Import the package


const MyBooking = () => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState(''); // Single filter state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [ratingStatus, setRatingStatus] = useState({}); // Track rating submission
  const [ratings, setRatings] = useState({}); // Store ratings by booking ID


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/mybooking/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings); // Initial display
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Error fetching bookings');
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchBookings();
    }
  }, [id, token]);


  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings = {};
      for (const booking of bookings) {
        try {
          const response = await axios.get(`http://localhost:5000/api/bookings/${booking._id}/rate`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          newRatings[booking._id] = response.data.rating; // Store the rating by booking ID
        } catch (error) {
          console.error('Error fetching rating:', error.response?.data?.error || error.message);
        }
      }
      setRatings(newRatings); // Update state with all fetched ratings
    };
  
    if (bookings.length > 0) {
      fetchRatings();
    }
  }, [bookings, token]);

  useEffect(() => {
    // Filter bookings by search query and filter option
    let updatedBookings = bookings;

    if (searchQuery) {
      updatedBookings = updatedBookings.filter((booking) =>
        booking.serviceProviderId.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.serviceProviderId.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting or status filter
    if (filterOption === 'lastBooking') {
      updatedBookings = updatedBookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
    } else if (filterOption === 'oldBooking') {
      updatedBookings = updatedBookings.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
    } else if (filterOption === 'highestRating') {
      updatedBookings = updatedBookings.sort((a, b) => b.serviceProviderId.rating - a.serviceProviderId.rating);
    } else if (['Pending', 'Confirmed', 'Completed', 'Closed'].includes(filterOption)) {
      updatedBookings = updatedBookings.filter((booking) => booking.status === filterOption);
    }

    setFilteredBookings(updatedBookings);
  }, [searchQuery, filterOption, bookings]);

  if (loading) {
    return (
      <Container sx={{ paddingY: 5 }}>
        <Typography variant="h4" align="center">Loading your bookings...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ paddingY: 5 }}>
        <Typography variant="h4" align="center" color="error">{error}</Typography>
      </Container>
    );
  }

  // Function to handle rating submission
// const handleRatingSubmit = async (bookingId, rating) => {
//   try {
//     const response = await axios.post(`http://localhost:5000/api/bookings/${bookingId}/rate`, {
//       rating,
//     }, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//      // Update the rating status for the specific booking
//      setRatingStatus((prevState) => ({
//       ...prevState,
//       [bookingId]: true, // Mark this booking as rated
//     }));
//     console.log('Rating submitted successfully:', response.data.message);
//   } catch (error) {
//     console.error('Error submitting rating:', error.response?.data?.error || error.message);
//   }
// };

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#1976d2' }} align="center">
        My Bookings
      </Typography>

      {/* Search and Filter Options */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search by Service Provider or Service Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '100%', maxWidth: 400 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
        />

        {/* Combined Filter for Sorting and Status */}
        <TextField
          select
          label="Filter By"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          sx={{ width: '100%', maxWidth: 200 }}
        >
          <MenuItem value="">None</MenuItem>
          {/* Sorting Options */}
          <MenuItem disabled>Sorting Options</MenuItem>
          <MenuItem value="lastBooking">Last Booking</MenuItem>
          <MenuItem value="oldBooking">Old Booking</MenuItem>
          <MenuItem value="highestRating">Highest Rating</MenuItem>

          {/* Status Options */}
          <MenuItem disabled>Status Options</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </TextField>
      </Box>

      {/* Bookings List */}
      <Grid container spacing={3}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <Grid item xs={12} md={6} lg={4} key={booking._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                    background: '#fff',
                    borderRadius: '12px',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#37474f' }}>
                      Service Provider: {booking.serviceProviderId.userId.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                      {booking.serviceProviderId.serviceName}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ color: '#1976d2' }} /> {booking.serviceProviderId.userId.email}
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ color: '#388e3c' }} /> {booking.serviceProviderId.userId.phoneNumber}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventAvailableIcon sx={{ color: '#f57c00' }} /> Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}
                    </Typography>

                    {/* <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Rating: {ratings[booking._id] !== undefined ? ratings[booking._id] : 'Not rated yet'}
                    </Typography> */}

                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Rating: {ratings[booking._id] !== undefined ? (
                        <ReactStars
                          count={5}
                          value={ratings[booking._id]} // Display fetched rating
                          size={24}
                          edit={false} // Make it read-only
                          activeColor="#ffd700"
                        />
                      ) : 'Not rated yet'}
                    </Typography>

                    {/* <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: '#ffb300' }} /> Rating: {booking.serviceProviderId.rating} */}


                    {/* {booking.status && (
                    <Box sx={{ mt: 2 }}>
                    {ratingStatus[booking._id] ? (
                      // Rating submitted message
                      <Typography variant="body2" color="green">
                        Thank you for your rating!
                      </Typography>
                    ) : (
                      // Star rating component for submission
                      <>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          Rate this service:
                        </Typography>
                        <ReactStars
                          count={5}
                          onChange={(newRating) => handleRatingSubmit(booking._id, newRating)}
                          size={24}
                          activeColor="#ffd700"
                        />
                      </>
                    )}
                  </Box>
                      )} */}

                    {/* </Typography> */}

                    <Typography variant="body1" sx={{ color: '#1565c0', marginTop: 2 }}>
                      Status: {booking.status}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ color: '#f44336' }}>No bookings found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MyBooking;
