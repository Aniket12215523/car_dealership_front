import React, { useRef, useState, useEffect } from 'react';
import './Car3DCarousel.css';

function Car3DCarousel() {
  const carouselRef = useRef(null);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const startX = useRef(0);
  const idleTimer = useRef(null);

  
  useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/cars`)
        .then(res => res.json())
        .then(data => setCars(data));
    }, []);

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setRotateY((prev) => prev + 50);
    }, 3000);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    resetIdleTimer();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    startX.current = e.clientX;
    setRotateY((prev) => prev + delta * 0.5);
    resetIdleTimer();
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCarClick = (car) => setSelectedCar(car);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setRotateY((prev) => prev - 50);
      } else if (e.key === 'ArrowRight') {
        setRotateY((prev) => prev + 50);
      } else if (e.key === 'Escape') {
        setSelectedCar(null);
      }
      resetIdleTimer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    resetIdleTimer();
    return () => clearTimeout(idleTimer.current);
  }, []);

  if (!cars.length) return <div>Loading cars...</div>;

  return (
    <div
      className="carousel-container parallax-bg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="carousel"
        ref={carouselRef}
        style={{ transform: `rotateY(${rotateY}deg)` }}
      >
        {cars.map((car, index) => {
          const angle = (360 / cars.length) * index;
          return (
            <div
              className="carousel-item"
              key={car._id}
              onClick={() => handleCarClick(car)}
              style={{
                transform: `rotateY(${angle}deg) translateZ(800px)`,
              }}
            >
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
            </div>
          );
        })}
      </div>

      <div className="carousel-buttons">
        <button onClick={() => setRotateY(rotateY - 50)}>&larr;</button>
        <button onClick={() => setRotateY(rotateY + 50)}>&rarr;</button>
      </div>

      {selectedCar && (
        <div className="car-details-overlay">
          <button className="close-btn" onClick={() => setSelectedCar(null)}>
            ✕
          </button>
          <div className="car-details-content">
            <img src={selectedCar.image} alt={selectedCar.name} />
            <h2>{selectedCar.name}</h2>
            <p>{selectedCar.description}</p>
            <div className="specs">
              <p><strong>Price:</strong> ${selectedCar.price.toLocaleString()}</p>
              <p><strong>Engine:</strong> {selectedCar.specs.engine}</p>
              <p><strong>Horsepower:</strong> {selectedCar.specs.horsepower}</p>
              <p><strong>Top Speed:</strong> {selectedCar.specs.topSpeed}</p>
              <p><strong>Acceleration:</strong> {selectedCar.specs.acceleration}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Car3DCarousel;
