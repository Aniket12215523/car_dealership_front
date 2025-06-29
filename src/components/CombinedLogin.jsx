import { useState } from 'react';
import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import LoginForm from './login';
import GoogleLoginButton from './GoogleLoginButton';
import PhoneLoginForm from './PhoneLoginForm';
import './AuthForms.css';

function CombinedLogin() {
  const [activeTab, setActiveTab] = useState('email');

  return (
    <div className="auth-page">
      <VideoBackground />

      <motion.div 
        className="auth-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="auth-tabs">
          <button 
            className={activeTab === 'email' ? 'active' : ''} 
            onClick={() => setActiveTab('email')}
          >
            Email Login
          </button>
          <button 
            className={activeTab === 'google' ? 'active' : ''} 
            onClick={() => setActiveTab('google')}
          >
            Google
          </button>
          <button 
            className={activeTab === 'phone' ? 'active' : ''} 
            onClick={() => setActiveTab('phone')}
          >
            Phone
          </button>
        </div>

        <div className="auth-form-content">
          {activeTab === 'email' && <LoginForm />}
          {activeTab === 'google' && <GoogleLoginButton />}
          {activeTab === 'phone' && <PhoneLoginForm />}
        </div>
      </motion.div>
    </div>
  );
}

export default CombinedLogin;
