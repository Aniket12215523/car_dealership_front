import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { useState } from 'react';

function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!state?.car || !state?.bookingDetails) return <p>Missing booking info.</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) {
      setError('Please fill in all fields.');
      return false;
    }
    setError('');
    return true;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!validateForm()) return;

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load Razorpay SDK.');
      return;
    }

    try {
      setLoading(true);

      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: state.car.price,
          currency: 'INR',
          receipt: `receipt_order_${Date.now()}`
        })
      });

      const { order } = await orderResponse.json();

      if (!order) {
        alert('Failed to create order. Try again.');
        setLoading(false);
        return;
      }

      const options = {
        key: 'rzp_live_T1Yp0Uy7x8D7kJ',
        amount: order.amount,
        currency: order.currency,
        name: 'Car Booking',
        description: `Booking for ${state.car.name}`,
        image: '/images/logo.png',
        order_id: order.id,
        handler: async (response) => {
          
          await fetch(`${import.meta.env.VITE_API_URL}/api/payment/record-transaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              bookingDetails: state.bookingDetails,
              customer: formData,
              amount: state.car.price,
              status: 'captured'
            })
          });

          
          navigate('/payment-success', {
            state: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              booking: state
            }
          });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#2adbbd'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      setError('Something went wrong during payment.');
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Final Checkout</h2>

      <div className="car-summary-card">
        <img src={state.car.image} alt={state.car.name} />
        <h3>{state.car.name}</h3>
        <p>₹{state.car.price}</p>
        <p>Date: {state.bookingDetails.date}</p>
        <p>Time: {state.bookingDetails.time}</p>
      </div>

      <form className="user-details-form" onSubmit={(e) => e.preventDefault()}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <textarea
          name="address"
          placeholder="Complete Address"
          value={formData.address}
          onChange={handleInputChange}
        />

        {error && <p className="form-error">{error}</p>}

        <button type="button" onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
