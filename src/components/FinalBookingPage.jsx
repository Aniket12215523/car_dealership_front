import { useLocation, useNavigate } from 'react-router-dom';
import './FinalBookingPage.css';
import { useState } from 'react';

function FinalBookingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({ date: '', time: '' });

  if (!state || !state.car) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No car selected. Please return to booking page.</p>;
  }

  const { car } = state;

  const handleContinue = () => {
    navigate('/checkout', { state: { car, bookingDetails } });
  };

  return (
    <div className="final-booking-page">
      <h2>Confirm Your Booking</h2>
      <div className="car-preview-card">
        <img src={car.image} alt={car.name} />
        <h3>{car.name}</h3>
        <p>${car.price}</p>
      </div>

      <div className="datetime-selector">
        <label>
          Select Date:
          <input
            type="date"
            value={bookingDetails.date}
            onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
          />
        </label>
        <label>
          Select Time:
          <input
            type="time"
            value={bookingDetails.time}
            onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
          />
        </label>
      </div>

      <button onClick={handleContinue}>Continue to Checkout</button>
    </div>
  );
}

export default FinalBookingPage;
