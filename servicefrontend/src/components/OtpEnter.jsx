import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OtpEnter = () => {
  const { id } = useParams(); // Get booking ID from the route
  const navigate = useNavigate();
  
  const [otpCode, setOtpCode] = useState('');
  const [otpExpired, setOtpExpired] = useState(false);
  const [timer, setTimer] = useState(180); // Set 3-minute timer (180 seconds)
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Format timer to display as MM:SS
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle OTP verification submission
  const handleValidateOtp = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/bookings/bookings/${id}/verify-otp`, { 
        otp: otpCode, // Change this to 'otp' to match the backend
      });

      setSuccess(response.data.message);
      setError(null);
      
      // Navigate to the success page or handle post-verification logic
      navigate('/works'); // Adjust navigation as per your app flow
    } catch (err) {
      setSuccess(null);
      setError(err.response?.data?.error || 'Invalid OTP, please try again.');
    }
  };

  // Handle timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setOtpExpired(true); // Disable OTP input after time expires
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timer]);

  return (
    <div className="otp-container">
      <motion.div
        className="otp-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="otp-heading">OTP Verification</h2>
        <p className="otp-description">
          We messaged you a 6-character code for verification on your registered phone number. Enter the code to Complete your task.
        </p>
        <p className="otp-warning">
          Kindly enter the OTP manually as the Copy Paste feature is disabled.
        </p>
        <div className="otp-input-container">
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="Enter OTP"
            disabled={otpExpired}
            className="otp-input"
            onPaste={(e) => e.preventDefault()} // Disable copy-paste
          />
          <span className="otp-timer">{formatTimer()}</span>
        </div>
        <button
          onClick={handleValidateOtp}
          disabled={!otpCode || otpExpired}
          className="otp-button"
        >
          Verify
        </button>
        {error && <p className="otp-error">{error}</p>}
        {success && <p className="otp-success">{success}</p>}
      </motion.div>
    </div>
  );
};

export default OtpEnter;
