import React from 'react';
import './CarDetailsModal.css'; 

function CarDetailsModal({ car, onClose }) {
  if (!car) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={car.image} alt={car.name} />
        <h2>{car.name}</h2>
        <p>{car.description}</p>
        <div className="car-specs">
          {Object.entries(car.specs).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarDetailsModal;
