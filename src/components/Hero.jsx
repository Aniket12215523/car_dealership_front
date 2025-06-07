import './Hero.css';
function Hero() {
  return (
    <section className="hero-section">
      <video autoPlay loop muted className="hero-video">
        <source src="/videos/car-driving.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>Find Your Dream Car</h1>
        <p>Luxury. Speed. Power. All in one place.</p>
      </div>
    </section>
  );
}

export default Hero;
