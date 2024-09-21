// import { useEffect, useState } from 'react'; 
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Box, Typography, CircularProgress, ListItem, ListItemText, Paper, Grid, Select, MenuItem, InputLabel, FormControl, Modal, IconButton } from '@mui/material';
// import { motion } from 'framer-motion';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';

// const Works = () => {
//   const [requestedBookings, setRequestedBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [openModal, setOpenModal] = useState(false); // Modal state
//   const [selectedBooking, setSelectedBooking] = useState(null); // To track the selected booking

//   // Get the user and token from the Redux store
//   const { user, token } = useSelector((state) => state.auth);

//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!user) return; // Don't fetch if userId is not available
  
//       try {
//         const response = await axios.get(`http://localhost:5000/api/bookings/requestedbooking/${user.id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setRequestedBookings(response.data.bookings || []); // Ensure it's an array
//         setLoading(false);
//       } catch (err) {
//         setError(err.message || 'Error fetching bookings');
//         setLoading(false);
//       }
//     };
  
//     fetchBookings();
//   }, [user, token]);

//   // Filter bookings based on the selected status
//   const filteredBookings = requestedBookings.filter(booking => 
//     filterStatus === 'All' || booking.status === filterStatus
//   );

//   const getBookingsByStatus = (status) => {
//     return requestedBookings.filter(booking => status.includes(booking.status));
//   };

//   // Handle double-click to open the modal
//   const handleDoubleClick = (booking) => {
//     setSelectedBooking(booking);
//     setOpenModal(true);
//   };

//   // Handle double-click on Confirmed status to navigate to another route
//   const handleDoubleClickConfirmed = (bookingId) => {
//     navigate(`/verifywork/${bookingId}`); // Navigate to the VerifyWork page with the booking ID
//   };

//   // Handle accept or reject task
//   const handleResponse = async (responseMessage) => {
//     if (!selectedBooking) return;

//     try {
//       const res = await axios.post('http://localhost:5000/api/bookings/notify', {
//         message: responseMessage,
//         bookingId: selectedBooking._id
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(res.data); // Handle response
//       // Close the modal after submitting the response
//       setOpenModal(false);
//       setSelectedBooking(null);
//     } catch (err) {
//       console.log('Error sending response:', err);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Requested Bookings
//       </Typography>

//       {/* Filter Dropdown */}
//       <FormControl fullWidth sx={{ marginBottom: 2 }}>
//         <InputLabel>Status Filter</InputLabel>
//         <Select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           label="Status Filter"
//         >
//           <MenuItem value="All">All</MenuItem>
//           <MenuItem value="Pending">Pending</MenuItem>
//           <MenuItem value="Confirmed">Confirmed</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Closed">Closed</MenuItem>
//         </Select>
//       </FormControl>

//       {loading ? (
//         <Box display="flex" justifyContent="center">
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Typography color="error" align="center">{error}</Typography>
//       ) : filteredBookings.length === 0 ? (
//         <Typography align="center">No bookings found.</Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {/* Pending Column */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" align="center" gutterBottom>Pending</Typography>
//             {getBookingsByStatus(['Pending']).map((booking) => (
//               <motion.div 
//                 key={booking._id}
//                 initial={{ opacity: 0, scale: 0.9 }} 
//                 animate={{ opacity: 1, scale: 1 }} 
//                 transition={{ duration: 0.3 }}
//                 onDoubleClick={() => handleDoubleClick(booking)} // Open modal on double-click
//               >
//                 <Paper elevation={3} sx={{ margin: 2, padding: 2, borderRadius: 2 }}>
//                   <ListItem>
//                     <ListItemText 
//                       primary={<Typography variant="h6">{booking.userId.name}</Typography>}
//                       secondary={
//                         <>
//                           <Typography variant="body2">Service: {booking.serviceProviderId.serviceName}</Typography>
//                           <Typography variant="body2">Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 </Paper>
//               </motion.div>
//             ))}
//           </Grid>

//           {/* Confirmed Column */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" align="center" gutterBottom>Confirmed</Typography>
//             {getBookingsByStatus(['Confirmed']).map((booking) => (
//               <motion.div 
//                 key={booking._id}
//                 initial={{ opacity: 0, scale: 0.9 }} 
//                 animate={{ opacity: 1, scale: 1 }} 
//                 transition={{ duration: 0.3 }}
//                onDoubleClick={() => handleDoubleClickConfirmed(booking._id)} // Navigate to verify work on double-click
//               >
//                 <Paper elevation={3} sx={{ margin: 2, padding: 2, borderRadius: 2 }}>
//                   <ListItem>
//                     <ListItemText 
//                       primary={<Typography variant="h6">{booking.userId.name}</Typography>}
//                       secondary={
//                         <>
//                           <Typography variant="body2">Service: {booking.serviceProviderId.serviceName}</Typography>
//                           <Typography variant="body2">Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 </Paper>
//               </motion.div>
//             ))}
//           </Grid>

//           {/* Completed/Closed Column */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" align="center" gutterBottom>Completed / Closed</Typography>
//             {getBookingsByStatus(['Completed', 'Closed']).map((booking) => (
//               <motion.div 
//                 key={booking._id}
//                 initial={{ opacity: 0, scale: 0.9 }} 
//                 animate={{ opacity: 1, scale: 1 }} 
//                 transition={{ duration: 0.3 }}
//               >
//                 <Paper elevation={3} sx={{ margin: 2, padding: 2, borderRadius: 2 }}>
//                   <ListItem>
//                     <ListItemText 
//                       primary={<Typography variant="h6">{booking.userId.name}</Typography>}
//                       secondary={
//                         <>
//                           <Typography variant="body2">Service: {booking.serviceProviderId.serviceName}</Typography>
//                           <Typography variant="body2">Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 </Paper>
//               </motion.div>
//             ))}
//           </Grid>
//         </Grid>
//       )}

//       {/* Modal for accepting or declining the task */}
//       {selectedBooking && (
//         <Modal
//           open={openModal}
//           onClose={() => setOpenModal(false)}
//         >
//           <Box sx={{ 
//             position: 'absolute', 
//             top: '50%', 
//             left: '50%', 
//             transform: 'translate(-50%, -50%)', 
//             bgcolor: 'background.paper', 
//             boxShadow: 24, 
//             p: 4, 
//             borderRadius: 2 
//           }}>
//             <Typography variant="h6" gutterBottom>
//               Do you want to accept the task?
//             </Typography>
//             <Box display="flex" justifyContent="space-around" mt={2}>
//               <IconButton onClick={() => handleResponse('Accepted')}>
//                 <CheckIcon color="primary" />
//               </IconButton>
//               <IconButton onClick={() => handleResponse('Rejected')}>
//                 <CloseIcon color="error" />
//               </IconButton>
//             </Box>
//           </Box>
//         </Modal>
//       )}
//     </Box>
//   );
// };

// export default Works;





import { useEffect, useState, useCallback } from 'react'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, ListItem, ListItemText, Paper, Grid, Select, MenuItem, InputLabel, FormControl, Modal, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const Works = () => {
  const [requestedBookings, setRequestedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [selectedBooking, setSelectedBooking] = useState(null); // To track the selected booking

  // Get the user and token from the Redux store
  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate(); // Hook for navigation

  const fetchBookings = useCallback(async () => {
    if (!user) return; // Don't fetch if userId is not available

    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/requestedbooking/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequestedBookings(response.data.bookings || []); // Ensure it's an array
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error fetching bookings');
      setLoading(false);
    }
  }, [user, token]); // Add user and token as dependencies

  useEffect(() => {
    fetchBookings();
  }, [user, token, fetchBookings]);

  // Filter bookings based on the selected status
  const filteredBookings = requestedBookings.filter(booking => 
    filterStatus === 'All' || booking.status === filterStatus
  );

  const getBookingsByStatus = (status) => {
    return requestedBookings.filter(booking => status.includes(booking.status));
  };

  // Handle double-click to open the modal
  const handleDoubleClick = (booking) => {
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  // Handle double-click on Confirmed status to navigate to another route
  const handleDoubleClickConfirmed = (bookingId) => {
    navigate(`/verifywork/${bookingId}`); // Navigate to the VerifyWork page with the booking ID
  };

  // Handle accept or reject task
  const handleResponse = async (responseMessage) => {
    if (!selectedBooking) return;

    try {
      const res = await axios.post('http://localhost:5000/api/bookings/notify', {
        message: responseMessage,
        bookingId: selectedBooking._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data); // Handle response

      // Close the modal after submitting the response
      setOpenModal(false);
      setSelectedBooking(null);

      // Re-fetch the bookings to update the UI
      fetchBookings();
    } catch (err) {
      console.log('Error sending response:', err);
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Requested Bookings
      </Typography>

      {/* Filter Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          label="Status Filter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : filteredBookings.length === 0 ? (
        <Typography align="center">No bookings found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {/* Pending Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" gutterBottom>Pending</Typography>
            {getBookingsByStatus(['Pending']).map((booking) => (
              <motion.div 
                key={booking._id}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.3 }}
                onDoubleClick={() => handleDoubleClick(booking)} // Open modal on double-click
              >
                <Paper elevation={3} sx={{ margin: 2, padding: 2, borderRadius: 2 }}>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="h6">{booking.userId.name}</Typography>}
                      secondary={
                        <>
                          <Typography variant="body2">Service: {booking.serviceProviderId.serviceName}</Typography>
                          <Typography variant="body2">Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              </motion.div>
            ))}
          </Grid>

          {/* Confirmed Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" gutterBottom>Confirmed</Typography>
            {getBookingsByStatus(['Confirmed']).map((booking) => (
              <motion.div 
                key={booking._id}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.3 }}
               onDoubleClick={() => handleDoubleClickConfirmed(booking._id)} // Navigate to verify work on double-click
              >
                <Paper elevation={3} sx={{ margin: 2, padding: 2, borderRadius: 2 }}>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="h6">{booking.userId.name}</Typography>}
                      secondary={
                        <>
                          <Typography variant="body2">Service: {booking.serviceProviderId.serviceName}</Typography>
                          <Typography variant="body2">Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              </motion.div>
            ))}
          </Grid>

          {/* Completed/Closed Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" gutterBottom>Completed / Closed</Typography>
            {getBookingsByStatus(['Completed', 'Closed']).map((booking) => (
              <motion.div 
                key={booking._id}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.3 }}
              >
                <Paper elevation={3} sx={{ margin: 2, padding: 2, borderRadius: 2 }}>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="h6">{booking.userId.name}</Typography>}
                      secondary={
                        <>
                          <Typography variant="body2">Service: {booking.serviceProviderId.serviceName}</Typography>
                          <Typography variant="body2">Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              </motion.div>
            ))}
          </Grid>
        </Grid>
      )}

      {/* Modal for accepting or declining the task */}
      {selectedBooking && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2 
          }}>
            <Typography variant="h6" gutterBottom>
              Do you want to accept the task?
            </Typography>
            <Box display="flex" justifyContent="space-around" mt={2}>
              <IconButton onClick={() => handleResponse('Accepted')}>
                <CheckIcon color="primary" />
              </IconButton>
              <IconButton onClick={() => handleResponse('Rejected')}>
                <CloseIcon color="error" />
              </IconButton>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Works;
