import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './CarCard.css';

function CarCard({ car, onViewDetails, onBookNow, showBookNow = true }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        boxShadow: '0 10px 20px rgba(42, 219, 189, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="car-card" ref={cardRef}>
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
