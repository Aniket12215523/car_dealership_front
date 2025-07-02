import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';
import axios from 'axios';
import './GoogleLoginButton.css';
import { useNavigate } from 'react-router-dom';


const GoogleLoginButton = () => {
    const navigate = useNavigate(); 

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google User:', user);

      const idToken = await user.getIdToken();

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, {
        idToken
      });

      localStorage.setItem('token', res.data.token);
      navigate(window.location.href = '/profile');
    } catch (error) {
      console.error(error);
      alert('Google sign-in failed');
    }
  };

  return (
    <button className="google-login-btn" onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
