import React, { useEffect, useState, useMemo, Suspense } from 'react';
import './CarShowroom3D.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import CarModel from './CarModel';

const CarShowroom3D = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [environment, setEnvironment] = useState('sunset');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedWheel, setSelectedWheel] = useState('default');
  const [selectedInteriorColor, setSelectedInteriorColor] = useState('#1c1c1c');
  const [doorOpen, setDoorOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setSelectedCar(data[0]);
        setIsMounted(true);
      });
  }, []);

  const memoizedCarModel = useMemo(() => (
    selectedCar ? (
      <CarModel
        car={selectedCar}
        selectedColor={selectedColor}
        selectedWheel={selectedWheel}
        selectedInteriorColor={selectedInteriorColor}
        openDoor={doorOpen}
      />
    ) : null
  ), [selectedCar, selectedColor, selectedWheel, selectedInteriorColor, doorOpen]);

  const renderCanvas = useMemo(() => (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 2, 6], fov: 45 }}
    >
      <Suspense fallback={null}>
        {memoizedCarModel}
        <Environment preset={environment} background />
        <ContactShadows
          resolution={512}
          frames={1}
          scale={10}
          blur={1.5}
          opacity={0.3}
          far={5}
        />
      </Suspense>
      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  ), [memoizedCarModel, environment]);

  return (
    <div className="showroom-wrapper" ref={ref}>
      <div className="header-section">
        <h1>3D Car Showroom</h1>
        <p>Explore ultra-realistic 3D models of the world’s most elite supercars.</p>
        <select
          className="car-select"
          value={selectedCar?._id || ''}
          onChange={(e) => setSelectedCar(cars.find((car) => car._id === e.target.value))}
        >
          {cars.map((car) => (
            <option key={car._id} value={car._id}>{car.name}</option>
          ))}
        </select>
      </div>

      <div className="selector-wrapper">
        <div className="selector-group">
          <label>Environment Background</label>
          <select className="car-select" value={environment} onChange={(e) => setEnvironment(e.target.value)}>
            <option value="sunset">Sunset</option>
            <option value="night">Night</option>
            <option value="dawn">Dawn</option>
            <option value="warehouse">Warehouse</option>
            <option value="city">City</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        <div className="selector-group">
          <label>Car Color</label>
          <select className="car-select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="#ffffff">White</option>
            <option value="#000000">Black</option>
            <option value="#ff0000">Red</option>
            <option value="#1e90ff">Blue</option>
            <option value="#4caf50">Green</option>
            <option value="#C0C0C0">Silver</option>
            <option value="#ffd700">Gold</option>
            <option value="#800080">Purple</option>
            <option value="#ff69b4">Pink</option>
            <option value="#ffa500">Orange</option>
          </select>
        </div>

        <div className="selector-group">
          <label>Wheel Style</label>
          <select className="car-select" value={selectedWheel} onChange={(e) => setSelectedWheel(e.target.value)}>
            <option value="default">Default</option>
            <option value="sport">Sport</option>
            <option value="chrome">Chrome</option>
            <option value="black">Matte Black</option>
            <option value="gold">Gold</option>
            <option value="carbon">Carbon Fiber</option>
            <option value="offroad">Offroad</option>
          </select>
        </div>

        <div className="selector-group">
          <label>Interior Color</label>
          <select className="car-select" value={selectedInteriorColor} onChange={(e) => setSelectedInteriorColor(e.target.value)}>
            <option value="#1c1c1c">Default (Dark)</option>
            <option value="#a0522d">Brown Leather</option>
            <option value="#b22222">Red</option>
            <option value="#e0e0e0">Beige</option>
            <option value="#ffffff">White</option>
          </select>
        </div>

        <div className="selector-group">
          <label>Doors</label>
          <button onClick={() => setDoorOpen(!doorOpen)}>
            {doorOpen ? 'Close Doors' : 'Open Doors'}
          </button>
        </div>
      </div>

      <div className="canvas-section">
        {inView && isMounted && renderCanvas}
      </div>
    </div>
  );
};

export default CarShowroom3D;
