import React, { useState, useEffect } from 'react';
import './CarVideoShowcase.css';

const CarVideoShowcase = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setSelectedCar(data[0]);
      })
      .catch((err) => console.error('Error fetching cars:', err));
  }, []);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="video-showcase-wrapper"
      style={{ backgroundPositionY: `${offsetY * 0.5}px` }}
    >
      <h2>Car Video Showcase</h2>

      <select
        className="car-select-video"
        value={selectedCar?._id || ''}
        onChange={(e) => {
        const foundCar = cars.find(car => car._id === e.target.value);
        console.log('Selected Car:', foundCar);
        setSelectedCar(foundCar);
        }

        }
      >
        {cars.map((car) => (
          <option key={car._id} value={car._id}>
            {car.name}
          </option>
        ))}
      </select>

  <div className="video-player" key={selectedCar._id}>
  {selectedCar?.videoUrl ? (
    <video
      autoPlay
      muted
      loop
      controls
      playsInline
      preload="auto"
    >
      <source src={selectedCar.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <p>No video available for selected car</p>
  )}
</div>


    </div>
  );
};

export default CarVideoShowcase;
