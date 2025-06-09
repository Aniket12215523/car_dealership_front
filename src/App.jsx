import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePreloader } from './context/PreloaderContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';


import Home from './pages/Home';
import CarShowroom3D from './components/CarShowroom3D';
import Car3DCarousel from './components/Car3DCarousel';
import GarageShowcase from './components/GarageShowcase';

function App() {
  const { loading } = usePreloader();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (loading) return <Preloader />;

  return (
    <Router>
      <Navbar />
      <Hero />
      <div className="scroll-target">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carshowroom3d" element={<CarShowroom3D />} />
          <Route path="/car3dcarousel" element={<Car3DCarousel />} />
          <Route path="/garageshowcase" element={<GarageShowcase />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
