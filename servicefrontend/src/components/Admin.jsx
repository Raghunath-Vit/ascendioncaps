import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BuildIcon from '@mui/icons-material/Build';
import GroupIcon from '@mui/icons-material/Group';
import { motion } from 'framer-motion';

// Styled card with hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex', // Make the card a flex container
  flexDirection: 'column', // Ensure content flows vertically
  justifyContent: 'space-between', // Ensure the button stays at the bottom
  height: '100%', // Card should stretch to fill available height
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4] || '0px 4px 20px rgba(0, 0, 0, 0.1)', // Fallback shadow
  },
}));

// Global body background style
const globalStyle = {
  minHeight: '100vh',
  backgroundColor: '#fff', // Light grey background to match Material UI design
};
const AdminPage = () => {
  return (
    <div style={globalStyle}>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={3} alignItems="stretch">
        {/* Category Card */}
        <Grid item xs={12} sm={6} md={4} display="flex">
          <StyledCard component={motion.div} whileHover={{ scale: 1.05 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AddBoxIcon color="primary" sx={{ fontSize: 30, mr: 1 }} />
                <Typography variant="h5" component="div">
                  Add New Category
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Create a new category for your services.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 2 }}
              component={Link}
              to="/create-category"
            >
              Go to Add Category
            </Button>
          </StyledCard>
        </Grid>

        {/* Service Card */}
        <Grid item xs={12} sm={6} md={4} display="flex">
          <StyledCard component={motion.div} whileHover={{ scale: 1.05 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <BuildIcon color="secondary" sx={{ fontSize: 30, mr: 1 }} />
                <Typography variant="h5" component="div">
                  Add New Service
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Create a new service for an existing category.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="secondary"
              sx={{ m: 2 }}
              component={Link}
              to="/create-service"
            >
              Go to Add Service
            </Button>
          </StyledCard>
        </Grid>

        {/* Users Card */}
        <Grid item xs={12} sm={6} md={4} display="flex">
          <StyledCard component={motion.div} whileHover={{ scale: 1.05 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <GroupIcon color="success" sx={{ fontSize: 30, mr: 1 }} />
                <Typography variant="h5" component="div">
                  View All Users
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View and manage all users and their roles.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="success"
              sx={{ m: 2 }}
              component={Link}
              to="/view-users"
            >
              Go to Manage Users
            </Button>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default AdminPage;
