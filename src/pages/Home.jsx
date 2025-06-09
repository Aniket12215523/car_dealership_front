import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import ScrollReveal from '../components/ScrollReveal';
import CarCard from '../components/CarCard';
import CarDetailsModal from '../components/CarDetailsModal';
import './Home.css';
import '../components/ScrollReveal.css';

const Car3DCarousel = lazy(() => import('../components/Car3DCarousel'));
const GarageShowcase = lazy(() => import('../components/GarageShowcase'));
const CarShowroom3D = lazy(() => import('../components/CarShowroom3D'));

function Home({ loading }) {
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
        <ScrollReveal enabled={!loading}>
          <h2>Our Featured Cars</h2>
        </ScrollReveal>

        <div className="car-grid">
          {cars.map((car) => (
            <ScrollReveal key={car._id} enabled={!loading}>
              <CarCard car={car} onViewDetails={setSelectedCar} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="carousel-section">
        <ScrollReveal enabled={!loading}>
          <h2>360° Car Showroom</h2>
        </ScrollReveal>
        <Suspense fallback={<div className="lazy-fallback">Loading Carousel...</div>}>
          <Car3DCarousel cars={cars} />
        </Suspense>
      </div>

      {cars.length > 0 && (
        <section id="garage-showcase" data-color="#00ffff" className="garage-section">
          <ScrollReveal enabled={!loading}>
            <h2>2D Garage Showcase</h2>
          </ScrollReveal>
          <Suspense fallback={<div className="lazy-fallback">Loading Garage...</div>}>
            <GarageShowcase cars={cars} />
          </Suspense>
        </section>
      )}

      <section id="showroom3d" data-color="#2adbbd" className="showroom3d-section">
        <ScrollReveal enabled={!loading}>
        </ScrollReveal>
          <CarShowroom3D />
      </section>

      <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </>
  );
}

export default Home;
