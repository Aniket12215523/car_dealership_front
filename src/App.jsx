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
import CombinedLogin from './components/CombinedLogin';

function AppWrapper() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />
      {isHome && <Hero />}
      <div className="scroll-target">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/book/:id" element={<FinalBookingPage />} />
          <Route path="/final-booking" element={<FinalBookingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/carshowroom3d" element={<CarShowroom3D />} />
          <Route path="/car3dcarousel" element={<Car3DCarousel />} />
          <Route path="/garageshowcase" element={<GarageShowcase />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/phone-login" element={<PhoneLoginForm />} />
          <Route path="/combinedlogin" element={<CombinedLogin />} />
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
