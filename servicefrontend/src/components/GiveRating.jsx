import { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GiveRating = () => {
  const { id: bookingId } = useParams(); // Get booking ID from URL params
  const { token } = useSelector((state) => state.auth); // Access token from Redux
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/bookings/${bookingId}/rate`, {
        rating,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSubmitted(true);
      console.log('Rating submitted successfully:', response.data.message);
    } catch (error) {
      console.error('Error submitting rating:', error.response?.data?.error || error.message);
    }
  };

  return (
    <Container sx={{ paddingY: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Rate Your Experience
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <ReactStars
            count={5}
            onChange={(newRating) => setRating(newRating)}
            size={48}
            activeColor="#ffd700"
            emptyIcon={<span>😢</span>}
            halfIcon={<span>😐</span>}
            fullIcon={<span>😄</span>}
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRatingSubmit}
            disabled={rating === 0}
            sx={{ padding: '10px 20px' }}
          >
            Submit Rating
          </Button>

          {submitted && (
            <Typography variant="body1" color="green" mt={3}>
              Thank you for your feedback!
            </Typography>
          )}
        </Box>
      </motion.div>
    </Container>
  );
};

export default GiveRating;