import './CarCard.css';
function CarCard({ car, onViewDetails }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p>${car.price}</p>
      <button onClick={() => onViewDetails(car)}>
  <span>View Details</span>
</button>

    </div>
  );
}

export default CarCard;
