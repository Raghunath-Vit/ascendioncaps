import { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography,
  TextField, Button, Box, InputAdornment, Divider,
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Snackbar
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with updated color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // purple
    },
    secondary: {
      main: '#d1c4e9', // light purple
    },
    error: {
      main: '#f44336', // red
    },
    background: {
      default: '#fafafa', // light grey
    },
  },
});

// Styled card for categories with proper background and text color
const StyledCard = styled(motion(Card))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Light grey from theme for card background
  color: theme.palette.primary.main, // Text color will use the primary color (purple)
  transition: 'transform 0.3s, box-shadow 0.3s',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4], // Slight elevation on hover
  },
  position: 'relative', // For positioning the delete icon
}));

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteCategoryId, setDeleteCategoryId] = useState(null); // Holds the id of category to delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Controls the delete modal visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const token = useSelector((state) => state.auth.token);
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories').then((response) => {
      setCategories(response.data);
      setFilteredCategories(response.data);
    });
  }, []);

  const handleSubmit = async () => {
    if (categoryName && categoryDescription) {
      try {
        await axios.post(
          'http://localhost:5000/api/categories',
          {
            name: categoryName,
            description: categoryDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
        setFilteredCategories(response.data);
        setCategoryName('');
        setCategoryDescription('');
        setSnackbarMessage('Category created successfully!');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage(error.response?.data?.message || 'Error creating category');
        setSnackbarOpen(true);
        console.error('Error creating category:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilteredCategories(
      categories.filter((category) =>
        category.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };


  const handleDeleteClick = (categoryId) => {
    console.log('Selected categoryId:', categoryId); // Check the ID being passed
    setDeleteCategoryId(categoryId);
    setOpenDeleteModal(true);
  };
  

  const handleDeleteCategory = async () => {
    console.log('Deleting category with id:', deleteCategoryId); // Check the value before sending the request
    try {
      await axios.delete(`http://localhost:5000/api/delcategory/${deleteCategoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Remove the deleted category from the state
      const updatedCategories = categories.filter((category) => category._id !== deleteCategoryId);
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
      setOpenDeleteModal(false); // Close the modal after deletion
      setOpenDeleteModal(false);
      setSnackbarMessage('Category deleted successfully!');
      setSnackbarOpen(true);
  
      
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Error deleting category');
      setSnackbarOpen(true);
      console.error('Error deleting category:', error);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {/* Add Category Form - Centered */}
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                flexDirection="column"
                gap={3}
                padding={3}
                sx={{
                  maxWidth: '400px',
                  width: '100%',
                  backgroundColor: 'background.paper',
                  boxShadow: 3,
                  borderRadius: 2,
                  marginTop: 2,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                component={motion.div}
                initial={{ translateY: 100, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h5" align="center" color="primary">
                  Add New Category
                </Typography>
                <TextField
                  label="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  color="primary"
                />
                <TextField
                  label="Category Description"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  multiline
                  rows={3}
                />
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add Category
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Divider */}
            <Grid item xs={12}>
              <Divider sx={{ my: 4 }} />
            </Grid>

            {/* Search and Category List */}
            <Grid item xs={12} mb={4}>
              <TextField
                label="Search Categories"
                value={searchQuery}
                onChange={handleSearch}
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Grid container spacing={3}>
                {filteredCategories.map((category) => (
                   // Log to check the structure
                  <Grid item xs={12} sm={6} md={4} key={category._id}>
                    <StyledCard whileHover={{ scale: 1.05 }}>
                      <CardContent>
                        <Typography variant="h6" color="primary"> {/* Primary color for the card title */}
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary"> {/* Default text color */}
                          {category.description}
                        </Typography>

                        {/* Delete Icon */}
                        <IconButton
                          onClick={() => handleDeleteClick(category._id)}
                          sx={{ position: 'absolute', top: 8, right: 8, color: theme.palette.error.main }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        {/* </motion.div> */}

        {/* Delete Confirmation Modal */}
        <Dialog
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteModal(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDeleteCategory} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

         {/* Snackbar for notifications */}
         <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default CreateCategory;



