// import { useEffect, useState } from 'react';
// import { Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const CreateService = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch categories from the backend
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/categories');
//         setCategories(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <Container sx={{ paddingY: 5 }}>
//       {/* Main Heading */}
//       <Typography
//         variant="h3"
//         align="center"
//         sx={{
//           fontWeight: 'bold',
//           marginBottom: 3,
//           fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
//           lineHeight: 1.3,
//           cursor: 'pointer',
//         }}
//         onClick={() => alert('Heading clicked!')} // You can add any action on click
//       >
//         Home services at your doorstep
//       </Typography>

//       {/* Subheading */}
//       <Typography
//         variant="h5"
//         align="center"
//         sx={{
//           marginBottom: 5,
//           fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem' },
//           color: 'gray',
//         }}
//       >
//         What are you looking for?
//       </Typography>

//       {/* Loading Indicator */}
//       {loading ? (
//         <Grid container justifyContent="center">
//           <CircularProgress />
//         </Grid>
//       ) : (
//         <Grid container spacing={3}>
//           {/* Category Cards */}
//           {categories.map((category) => (
//             <Grid item xs={12} sm={6} md={4} key={category._id}>
//               <Card
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {category.name}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {category.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default CreateService;




import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Modal, Box } from '@mui/material';
import axios from 'axios';

const CreateService = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

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

  // Fetch services for the selected category
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

  // Handle card click to open modal and fetch services
  const handleCardClick = (categoryId, categoryName) => {
    setModalOpen(true);
    setSelectedCategoryName(categoryName);
    fetchServices(categoryId); // Fetch services for the modal
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    setServices([]); // Clear services when modal closes
  };

  return (
    <Container sx={{ paddingY: 5 }}>
      {/* Main Heading */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 'bold',
          marginBottom: 3,
          fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
          lineHeight: 1.3,
        }}
      >
        Home services at your doorstep
      </Typography>

      {/* Subheading */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          marginBottom: 5,
          fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem' },
          color: 'gray',
        }}
      >
        What are you looking for?
      </Typography>

      {/* Loading Indicator */}
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {/* Category Cards */}
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => handleCardClick(category._id, category.name)} // Trigger modal on card click and pass category name and ID
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.name} 
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal for displaying services under the selected category */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="category-services-title"
        aria-describedby="category-services-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 300, sm: 400, md: 600 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography id="category-services-title" variant="h6" component="h2" gutterBottom>
            Services under "{selectedCategoryName}"
          </Typography>

          {loadingServices ? (
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          ) : services.length > 0 ? (
            <Grid container spacing={2}>
              {services.map((service) => (
                <Grid item xs={12} key={service._id}>
                  <Card sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {service.serviceName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {service.description}
                      </Typography>
                      <Typography variant="body1">
                        Price Range: {service.priceRange}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Rating: {service.rating}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No services available for this category.
            </Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default CreateService;

