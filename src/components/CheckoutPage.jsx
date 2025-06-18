import { useLocation } from 'react-router-dom';
import './CheckoutPage.css';
import { useState } from 'react';

function CheckoutPage() {
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: ''
  });

  const handlePayment = () => {
    // Trigger your payment gateway (e.g., Razorpay/Stripe)
    alert('Redirecting to payment...');
  };

  if (!state?.car || !state?.bookingDetails) return <p>Missing booking info.</p>;

  return (
    <div className="checkout-page">
      <h2>Final Checkout</h2>

      <div className="car-summary-card">
        <img src={state.car.image} alt={state.car.name} />
        <h3>{state.car.name}</h3>
        <p>${state.car.price}</p>
        <p>Date: {state.bookingDetails.date}</p>
        <p>Time: {state.bookingDetails.time}</p>
      </div>

      <form className="user-details-form">
        <input placeholder="Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Email" type="email" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input placeholder="Phone" value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <textarea placeholder="Address" value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      </form>

      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
}

export default CheckoutPage;
