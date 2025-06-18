import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('isMobile:', mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="hero-section">
      <video autoPlay loop muted className="hero-video">
        <source
          src={isMobile ? "/videos/car-driving-mobile.mp4" : "/videos/car-driving.mp4"}
          type="video/mp4"
        />
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
