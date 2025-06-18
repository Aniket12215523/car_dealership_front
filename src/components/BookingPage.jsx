import { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import CarDetailsModal from '../components/CarDetailsModal';
import './BookingPage.css';
import { useNavigate } from 'react-router-dom';

function BookingPage() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/cars`)
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleBookNow = (car) => {
    if (car) {
      navigate('/final-booking', { state: { car } }); 
    }
  };

  return (
    <div className="booking-page">
      <h2 className="book-title">Available Cars</h2>
      <div className="car-grid">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            car={car}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
          />
        ))}
      </div>

      {showModal && selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => {
            setShowModal(false);
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
}

export default BookingPage;
