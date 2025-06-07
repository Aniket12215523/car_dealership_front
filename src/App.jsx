import React, { useEffect} from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './pages/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

function App() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Home />
    </>
  );
}


export default App;
