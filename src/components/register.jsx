import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import CustomAlert from './CustomAlert';
import './AuthForms.css';

function RegisterForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      localStorage.setItem('token', res.data.token);
      setAlert({ message: 'Registration Successful!', type: 'success' });
      setTimeout(() => (window.location.href = '/'), 2000);
    } catch (err) {
      setAlert({ 
        message: err.response?.data?.message || 'Registration failed. Please try again.', 
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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
          <button type="submit">Register</button>
        </form>
        <p className="toggle-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterForm;
