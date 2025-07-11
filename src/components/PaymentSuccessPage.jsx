import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './PaymentSuccessPage.css';

function PaymentSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/my-orders');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!state)
    return <p>No payment info found. Please make a booking first.</p>;

  return (
    <div className="payment-success-page">
      <div className="success-overlay">
        <h2>🎉 Payment Successful!</h2>
        <p>Payment ID : <strong>{state.paymentId}</strong></p>
        <p>Order ID : <strong>{state.orderId}</strong></p>

        <div className="summary-card">
          <h3>Car Booking Details</h3>
          <img src={state.booking.car.image} alt={state.booking.car.name} />
          <p>Car Name : <strong>{state.booking.car.name}</strong></p>
          <p>Date : <strong>{state.booking.bookingDetails.date}</strong></p>
          <p>Time : <strong>{state.booking.bookingDetails.time}</strong></p>
        </div>

        <p className="redirect-msg">Redirecting to My Orders in 5 seconds...</p>
        <Link to="/my-orders" className="home-btn">View My Orders</Link>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
