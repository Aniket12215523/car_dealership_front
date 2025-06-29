import { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import CustomAlert from './CustomAlert';
import './AuthForms.css';

function PhoneLoginForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => console.log("reCAPTCHA solved"),
        'expired-callback': () => {
          setAlert({ message: 'Security session expired. Please try again.', type: 'error' });
        }
      },
      auth
    );

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );
      
      setConfirmationResult(result);
      setAlert({ message: 'OTP sent successfully!', type: 'success' });
    } catch (error) {
      console.error("OTP send error:", error);
      setAlert({
        message: error.message.includes('invalid-phone-number') 
          ? 'Invalid phone number format (include country code)' 
          : 'Failed to send OTP. Please try again.',
        type: 'error'
      });
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmationResult.confirm(otp);
      localStorage.setItem('token', result.user.accessToken);
      setAlert({ message: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => (window.location.href = '/'), 2000);
    } catch (error) {
      console.error("OTP verify error:", error);
      setAlert({ message: 'Invalid OTP. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="auth-page">
      <VideoBackground />
      {alert && (
        <CustomAlert 
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <motion.div 
        className="auth-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Phone Login</h2>
        <form onSubmit={confirmationResult ? handleVerifyOTP : handleSendOTP}>
          <input 
            type="tel" 
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={!!confirmationResult}
          />

          {confirmationResult && (
            <input 
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          )}

          <button type="submit">
            {confirmationResult ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>

        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
}

export default PhoneLoginForm;