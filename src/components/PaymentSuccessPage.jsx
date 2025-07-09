import { useLocation, Link } from 'react-router-dom';
import './PaymentSuccessPage.css';

function PaymentSuccessPage() {
  const { state } = useLocation();

  if (!state)
    return <p>No payment info found. Please make a booking first.</p>;

  return (
    <div className="payment-success-page">
      <h2>🎉 Payment Successful!</h2>
      <p>Payment ID: <strong>{state.paymentId}</strong></p>
      <p>Order ID: <strong>{state.orderId}</strong></p>

      <div className="summary-card">
        <h3>Car Booking Details</h3>
        <p>Car: {state.booking.car.name}</p>
        <p>Date: {state.booking.bookingDetails.date}</p>
        <p>Time: {state.booking.bookingDetails.time}</p>
      </div>

      <Link to="/" className="home-btn">Go Back to Home</Link>
    </div>
  );
}

export default PaymentSuccessPage;
