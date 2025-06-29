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
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    const initializeRecaptcha = () => {
      try {
        // Clear existing if any
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }

        window.recaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: () => setRecaptchaReady(true),
            'expired-callback': () => setRecaptchaReady(false)
          },
          auth
        );

        window.recaptchaVerifier.render().then(() => {
          console.log("reCAPTCHA ready");
          setRecaptchaReady(true);
        });

      } catch (error) {
        console.error("reCAPTCHA init error:", error);
        setAlert({
          message: 'Security verification failed. Please refresh.',
          type: 'error'
        });
      }
    };

    initializeRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!recaptchaReady) {
      setAlert({ message: 'Security check not ready. Please wait.', type: 'error' });
      return;
    }

    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );
      
      setConfirmationResult(result);
      setAlert({ message: 'OTP sent!', type: 'success' });
    } catch (error) {
      console.error("Send OTP error:", error);
      setAlert({
        message: error.message.includes('invalid-phone-number') 
          ? 'Invalid phone number format' 
          : 'Failed to send OTP. Try again.',
        type: 'error'
      });
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmationResult.confirm(otp);
      localStorage.setItem('token', result.user.accessToken);
      setAlert({ message: 'Login successful!', type: 'success' });
      setTimeout(() => window.location.href = '/', 1500);
    } catch (error) {
      console.error("Verify OTP error:", error);
      setAlert({
        message: error.message.includes('invalid-verification-code')
          ? 'Invalid OTP code'
          : 'Verification failed',
        type: 'error'
      });
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

      <motion.div className="auth-card">
        <h2>Phone Login</h2>
        <form onSubmit={confirmationResult ? handleVerifyOTP : handleSendOTP}>
          <input 
            type="tel" 
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
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