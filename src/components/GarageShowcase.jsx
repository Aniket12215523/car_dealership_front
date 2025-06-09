import React, { useEffect, useState } from 'react';
import './GarageShowcase.css';

const maxRpm = 9000;
const maxNitro = 100;

function GarageShowcase() {
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:14000/api/cars')
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  if (cars.length === 0) return <div>Loading...</div>;

  const currentCar = cars[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
  };

  return (
    <div className="garage-container">
      <div className="garage-background"></div>
      <div className="car-display">
        <div className="rotating-platform">
          <div className="turntable"></div>
          <img src={currentCar.image} alt={currentCar.name} className="garage-car-standalone" />
        </div>

        <div className="hud-overlay">
          <div className="hud-section">
            <span className="hud-label">RPM</span>
            <div className="hud-bar">
              <div
                className="hud-bar-fill"
                style={{ width: `${Math.min((currentCar.specs.rpm / maxRpm) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="hud-section">
            <span className="hud-label">Nitro</span>
            <div className="hud-bar">
              <div
                className="hud-bar-fill"
                style={{ width: `${Math.min((currentCar.specs.nitro / maxNitro) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="hud-section speed-readout">
            <span>Speed:</span>
            <span className="hud-value">{currentCar.specs.topSpeed} km/h</span>
          </div>
        </div>
      </div>

      <h2 className="car-name">{currentCar.name}</h2>
      <div className="stats-panel">
        <h3>Vehicle Specs</h3>
        <div className="stat-item"><span className="label">Top Speed:</span> <span className="value">{currentCar.specs.topSpeed}</span></div>
        <div className="stat-item"><span className="label">Acceleration:</span> <span className="value">{currentCar.specs.acceleration}</span></div>
        <div className="stat-item"><span className="label">Power:</span> <span className="value">{currentCar.specs.horsepower}</span></div>
        <div className="stat-item"><span className="label">Engine:</span> <span className="value">{currentCar.specs.engine}</span></div>
      </div>

      <div className="garage-buttons">
        <button onClick={handlePrev}>⟵</button>
        <button onClick={handleNext}>⟶</button>
      </div>
    </div>
  );
}

export default GarageShowcase;
