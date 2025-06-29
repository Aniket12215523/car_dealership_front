import { useState } from 'react';
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { motion } from 'framer-motion';
import { auth } from './firebaseConfig';
import VideoBackground from './VideoBackground';
import CustomAlert from './CustomAlert';
import GoogleLoginButton from './GoogleLoginButton';
import './AuthForms.css';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState(null);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem('token', res.data.token);
      setAlert({ message: 'Login Successful!', type: 'success' });
      setTimeout(() => (window.location.href = '/'), 2000);
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || 'Login failed. Please try again.',
        type: 'error',
      });
    }
  };

  const setupRecaptcha = () => {
    // Clear existing recaptcha if any
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          console.log('Recaptcha verified');
        },
      },
      auth
    );
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setAlert({ message: 'OTP Sent successfully!', type: 'success' });
    } catch (error) {
      console.error(error);
      setAlert({ message: error.message, type: 'error' });
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmationResult.confirm(otp);
      localStorage.setItem('token', result.user.accessToken);
      setAlert({ message: 'Phone Login Successful!', type: 'success' });
      setTimeout(() => (window.location.href = '/'), 2000);
    } catch (error) {
      console.error(error);
      setAlert({ message: 'Invalid OTP. Please try again.', type: 'error' });
    }
  };

  const handleTogglePhoneLogin = () => {
    // Reset phone form state and clear recaptcha verifier if any
    setPhone('');
    setOtp('');
    setConfirmationResult(null);
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    setShowPhoneLogin(!showPhoneLogin);
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
        <h2>{showPhoneLogin ? 'Phone Login' : 'Login'}</h2>

        {!showPhoneLogin ? (
          <>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email || ''}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password || ''}
                required
              />
              <button type="submit">Login</button>
            </form>

            <GoogleLoginButton />

            <button
              type="button"
              className="secondary-button"
              onClick={handleTogglePhoneLogin}
            >
              Sign in with Phone Number
            </button>
          </>
        ) : (
          <>
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

            <button
              type="button"
              className="secondary-button"
              onClick={handleTogglePhoneLogin}
            >
              Back to Email Login
            </button>

            <div id="recaptcha-container"></div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default LoginForm;
