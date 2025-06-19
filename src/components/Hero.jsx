import  React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();

  const handleScroll = () => {
    const nextSection = document.querySelector('.scroll-target');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroBookNow = () => {
    navigate('/book');
  };

  return (
    <section className="hero-section">
     <video autoPlay loop muted playsInline preload="auto" className="hero-video desktop-video">
        <source src="/videos/car-driving.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    
      <video autoPlay loop muted playsInline className="hero-video mobile-video">
        <source src="/videos/car-driving-mobile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-content">
        <h1>Find Your Dream Car</h1>
        <p>Luxury. Speed. Power. All in one place.</p>
        <button onClick={handleHeroBookNow} className="hero-book-button">
          <span>Book Now</span>
        </button>
      </div>
      <div className="scroll-down" onClick={handleScroll}></div>
    </section>
  );
}

export default Hero;
