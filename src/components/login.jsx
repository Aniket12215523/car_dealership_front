import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import CustomAlert from './CustomAlert';
import GoogleLoginButton from './GoogleLoginButton';
import './AuthForms.css';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      setAlert({ message: 'Login Successful!', type: 'success' });
      setTimeout(() => (window.location.href = '/'), 2000);
    } catch (err) {
      setAlert({ 
        message: err.response?.data?.message || 'Login failed. Please try again.', 
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

      <motion.div 
        className="auth-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <GoogleLoginButton />
      </motion.div>
    </div>
  );
}

export default LoginForm;
