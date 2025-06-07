import Hero from '../components/Hero';
import ScrollReveal from '../components/ScrollReveal';
import CarCard from '../components/CarCard';
import CarDetailsModal from '../components/CarDetailsModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import '../components/ScrollReveal.css';
import Car3DCarousel from '../components/Car3DCarousel';
import '../components/Car3DCarousel.css';
import GarageShowcase from '../components/GarageShowcase';
import '../components/GarageShowcase.css';
import CarShowroom3D from '../components/CarShowroom3D';



function Home() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:14000/api/cars')
      .then(res => {
  console.log(res.data); 
  setCars(res.data);
})
      .catch(err => console.error(err));
  }, []);

  return (
  <>
  <section id="hero" data-color="#ce0fdf" className="car-section">
    <ScrollReveal>
      <h2>Our Featured Cars</h2>
    </ScrollReveal>

    <div className="car-grid">
      {cars.map((car) => (
        <ScrollReveal key={car._id}>
          <CarCard car={car} onViewDetails={setSelectedCar} />
        </ScrollReveal>
      ))}
    </div>
  </section>

    
    <div className="carousel-section">
    <ScrollReveal>
      <h2>360° Car Showroom</h2>
    </ScrollReveal>
    <Car3DCarousel cars={cars} />
  </div>

  {cars.length > 0 && (
   <section id="garage-showcase" data-color="#00ffff" className="garage-section">
      <ScrollReveal>
        <h2>2D Garage Showcase</h2>
      </ScrollReveal>
      <GarageShowcase cars={cars} />
    </section>
  )}

  <section id="showroom3d" data-color="#2adbbd" className="showroom3d-section">
    <ScrollReveal></ScrollReveal>
    <CarShowroom3D />
  </section>





  <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />
</>

  );
}

export default Home;
