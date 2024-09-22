
import { useState, useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { loginUser,clearError } from '../redux/actions';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Snackbar, CircularProgress, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
      navigate(user.role === 'admin' ? '/admin' : user.role === 'worker' ? '/worker' : '/user');
    } if (error) {
      setLoading(false);  // Stop loading when there is an error
      setSnackbarOpen(true);  // Open the snackbar to display error message
    }
  }, [user,error,navigate]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(clearError()); // Clear the error in Redux when Snackbar closes
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f3e5f5',
         minHeight: '600px',
      }}
    >
      <Container
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        maxWidth="xs"
        sx={{
          bgcolor: '#fafafa',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          marginBottom:'7rem'
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 2, color: '#6a1b9a' }}>
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: <EmailIcon sx={{ color: '#6a1b9a', mr: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#6a1b9a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6a1b9a',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6a1b9a',
                  },
                },
              }}
              aria-label="Email"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: <LockIcon sx={{ color: '#6a1b9a', mr: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#6a1b9a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6a1b9a',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6a1b9a',
                  },
                },
              }}
              aria-label="Password"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              bgcolor: '#6a1b9a',
              '&:hover': {
                bgcolor: '#4e0e6c',
              },
              boxShadow: 2,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
        <Snackbar
          open={snackbarOpen || !!error}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={error}
          onExited={() => setSnackbarOpen(false)}
          onEntered={() => setSnackbarOpen(true)}
          action={
            <Button color="inherit" onClick={handleSnackbarClose}>
              Close
            </Button>
          }
        />
       
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link component={RouterLink} to="/register" sx={{ color: '#6a1b9a', fontWeight: 'bold' }}>
            Register
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
