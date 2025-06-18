import React from 'react';
import './CarCard.css';

function CarCard({ car, onViewDetails, onBookNow,showBookNow = true }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>${car.price}</p>
      <div className="button-group">
        {onViewDetails && (
        <button className="view-details-btn" onClick={() => onViewDetails(car)}>
          View Details
        </button>
        )}
        {showBookNow && onBookNow && (
        <button className="view-details-btn" onClick={() => onBookNow(car)}>
          Book Now
        </button>
        )}
      </div>
    </div>
  );
}

export default CarCard;
