import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';
import './GoogleLoginButton.css';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google User:', user);

      
      localStorage.setItem('token', user.accessToken);
      window.location.href = '/';
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
