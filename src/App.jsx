import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { usePreloader } from './context/PreloaderContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Hero from './components/Hero';
import CarShowroom3D from './components/CarShowroom3D';
import Car3DCarousel from './components/Car3DCarousel';
import GarageShowcase from './components/GarageShowcase';
import BookingPage from './components/BookingPage'; 
import FinalBookingPage from './components/FinalBookingPage'; 
import CheckoutPage from './components/CheckoutPage';
import RegisterForm from './components/register';
import LoginForm from './components/login';
import PhoneLoginForm from './components/PhoneLoginForm';
import ProtectedRoute from './components/ProtectedRoute';

function AppWrapper() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />
      {isHome && <Hero />}
      <div className="scroll-target">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><FinalBookingPage /></ProtectedRoute>} />
          <Route path="/final-booking" element={<ProtectedRoute><FinalBookingPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/carshowroom3d" element={<ProtectedRoute><CarShowroom3D /></ProtectedRoute>} />
          <Route path="/car3dcarousel" element={<ProtectedRoute><Car3DCarousel /></ProtectedRoute>} />
          <Route path="/garageshowcase" element={<ProtectedRoute><GarageShowcase /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/phone-login" element={<PhoneLoginForm />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  const { loading } = usePreloader();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (loading) return <Preloader />;

  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
