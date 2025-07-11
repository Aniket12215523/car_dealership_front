import { useEffect, useState } from 'react';
import EditOrderModal from '../components/EditOrderModal';
import './MyOrdersPage.css';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userId = localStorage.getItem('userId');

  const fetchOrders = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/payment/my-bookings/${userId}`)
      .then(res => res.json())
      .then(data => setOrders(data.bookings));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      fetch(`${import.meta.env.VITE_API_URL}/api/payment/delete-booking/${orderId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(() => fetchOrders()
      );
    }
  };

  return (
    <div className="orders-page">
      <video autoPlay muted loop className="orders-bg-video">
        <source src="/videos/orders-bg.mp4" type="video/mp4" />
      </video>

      <div className="orders-content">
        <div className="orders-content nelphim-panel">
  <h2 className="orders-heading mybookings-nelphim">My Bookings</h2>
</div>


        {orders.length === 0 ? (
          <p className="empty-message">You haven't booked any cars yet.</p>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <img src={order.carImage} alt={order.carName} className="order-car-image" />
                <h3>{order.carName}</h3>
                <p><strong>Amount:</strong> ₹{order.amountPaid}</p>
                <p><strong>Date:</strong> {order.bookingDate}</p>
                <p><strong>Time:</strong> {order.bookingTime}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></p>
                <p><strong>Booked By:</strong> {order.userName} ({order.userEmail})</p>
                <p><strong>Phone:</strong> {order.userPhone}</p>

                <div className="card-actions">
                  <button onClick={() => setSelectedOrder(order)}>Edit</button>
                  <button className="cancel-btn" onClick={() => cancelOrder(order._id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOrder && (
          <EditOrderModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onUpdated={() => {
              fetchOrders();
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;
