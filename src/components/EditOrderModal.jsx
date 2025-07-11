import { useState } from 'react';
import './EditOrderModal.css';

function EditOrderModal({ order, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    bookingDate: order.bookingDate,
    bookingTime: order.bookingTime,
    address: order.address,
    status: order.status
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/api/payment/update-booking/${order._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onUpdated();
          onClose();
        } else {
          alert('Failed to update booking.');
        }
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Edit Booking</h3>
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
          />

          <label>Time:</label>
          <input
            type="time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOrderModal;
