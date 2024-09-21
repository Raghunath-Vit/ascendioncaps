// import { useState, useEffect } from 'react';
// import { Container, Grid, Card, CardContent, Typography, TextField, Button, Box, InputAdornment, Divider } from '@mui/material';
// import { styled } from '@mui/system';
// import { motion } from 'framer-motion';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// // Styled form container
// const StyledForm = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: theme.spacing(2),
//   maxWidth: '400px',
//   width: '100%',
// }));

// // Styled card for categories
// const StyledCard = styled(Card)(({ theme }) => ({
//   transition: 'transform 0.3s, box-shadow 0.3s',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: theme.shadows[4] || '0px 4px 20px rgba(0, 0, 0, 0.1)',
//   },
// }));

// const CreateCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [categoryName, setCategoryName] = useState('');
//   const [categoryDescription, setCategoryDescription] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Access the token from Redux store
//   const token = useSelector((state) => state.auth.token);


//   useEffect(() => {
//     // Fetch categories
//     axios.get('http://localhost:5000/api/categories').then((response) => {
//       setCategories(response.data);
//       setFilteredCategories(response.data);
//     });
//   }, []);

//   const handleSubmit = async () => {
//     if (categoryName && categoryDescription) {
//       try {
//         await axios.post(
//           'http://localhost:5000/api/categories',
//           {
//             name: categoryName,
//             description: categoryDescription,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Attach the token as a Bearer token
//             },
//           }
//         );

//         const response = await axios.get('http://localhost:5000/api/categories');
//         setCategories(response.data);
//         setFilteredCategories(response.data);
//         setCategoryName('');
//         setCategoryDescription('');
//       } catch (error) {
//         console.error('Error creating category:', error);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setFilteredCategories(
//       categories.filter((category) =>
//         category.name.toLowerCase().includes(e.target.value.toLowerCase())
//       )
//     );
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Grid container spacing={4}>
//         {/* Left Side - Form */}
//         <Grid item xs={12} md={6}>
//           <StyledForm component={motion.div} whileHover={{ scale: 1.02 }}>
//             <Typography variant="h5">Add New Category</Typography>
//             <TextField
//               label="Category Name"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//               fullWidth
//               variant="outlined"
//             />
//             <TextField
//               label="Category Description"
//               value={categoryDescription}
//               onChange={(e) => setCategoryDescription(e.target.value)}
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={3}
//             />
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Add Category
//             </Button>
//           </StyledForm>
//         </Grid>

//         {/* Right Side - Image */}
//         <Grid item xs={12} md={6}>
//           <Box
//             component={motion.div}
//             whileHover={{ scale: 1.05 }}
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               minHeight: '100%',
//               p: 2,
//             }}
//           >
//             <img
//               src="./src/utils/DALL·E 2024-09-19 22.21.59 - An illustration related to adding a new category, represented by a colorful abstract symbol of folders or data structure icons, with a plus sign indic.webp"
//               alt="Category Illustration"
//               style={{ width: '100%', objectFit: 'cover', borderRadius: '8px' }}
//             />
//           </Box>
//         </Grid>

//         {/* Divider */}
//         <Grid item xs={12}>
//           <Divider sx={{ my: 4 }} />
//         </Grid>

//         {/* Search and Category List */}
//         <Grid item xs={12} mb={4}>
//           <TextField
//             label="Search Categories"
//             value={searchQuery}
//             onChange={handleSearch}
//             fullWidth
//             variant="outlined"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ mb: 3 }}
//           />
//           <Grid container spacing={3}>
//             {filteredCategories.map((category) => (
//               <Grid item xs={12} sm={6} md={4} key={category.id}>
//                 <StyledCard component={motion.div} whileHover={{ scale: 1.05 }}>
//                   <CardContent>
//                     <Typography variant="h6">{category.name}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {category.description}
//                     </Typography>
//                   </CardContent>
//                 </StyledCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CreateCategory;
import { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography,
  TextField, Button, Box, InputAdornment, Divider
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

// Styled form container with animation
const StyledForm = styled(motion(Box))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  maxWidth: '400px',
  width: '100%',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  marginLeft: 'auto', // Centering the form
  marginRight: 'auto',
}));

// Styled card for categories with animation
const StyledCard = styled(motion(Card))(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4] || '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false); // To track typing activity

  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      } catch (error) {
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

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000); // Reset after typing stops
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* Add Category Form - Centered */}
          <Grid item xs={12} md={6}>
            <StyledForm
              initial={{ translateY: 100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5">Add New Category</Typography>
              <TextField
                label="Category Name"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  handleTyping(e); // Trigger typing activity
                }}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Category Description"
                value={categoryDescription}
                onChange={(e) => {
                  setCategoryDescription(e.target.value);
                  handleTyping(e); // Trigger typing activity
                }}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ ml: 'auto', mt: 2 }} // Shift button towards the right
              >
                Add Category
              </Button>
            </StyledForm>
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
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <StyledCard whileHover={{ scale: 1.05 }}>
                    <CardContent>
                      <Typography variant="h6">{category.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default CreateCategory;
