import React, { useEffect, useState } from 'react';
import './CarShowroom3D.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import CarModel from './CarModel';

const CarShowroom3D = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [environment, setEnvironment] = useState('sunset');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedWheel, setSelectedWheel] = useState('default');
  const [selectedInteriorColor, setSelectedInteriorColor] = useState('#1c1c1c');
  const [doorOpen, setDoorOpen] = useState(false);



  useEffect(() => {
    fetch('http://localhost:14000/api/cars').then(res => res.json()).then(data => {
        setCars(data);
        setSelectedCar(data[0]);
      });
  }, []);

  return (
    <div className="showroom-wrapper">
      <div className="header-section">
        <h1>3D Car Showroom</h1>
        <p>Explore ultra-realistic 3D models of the world’s most elite supercars.</p>

        <select
          className="car-select" value={selectedCar?._id} onChange={(e) =>
            setSelectedCar(cars.find((car) => car._id === e.target.value))
          }
        >
          {cars.map((car) => (
            <option key={car._id} value={car._id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

   <div className="selector-wrapper">
  <div className="selector-group">
    <label htmlFor="environment">Environment Background</label>
    <select
      id="environment"
      className="car-select"
      value={environment}
      onChange={(e) => setEnvironment(e.target.value)}
    >
      <option value="sunset">Sunset</option>
      <option value="night">Night</option>
      <option value="dawn">Dawn</option>
      <option value="warehouse">Warehouse</option>
      <option value="city">City</option>
      <option value="studio">Studio</option>
    </select>
  </div>

  <div className="selector-group">
    <label htmlFor="carColor">Car Color</label>
    <select
      id="carColor"
      className="car-select"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
    >
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
  <label htmlFor="wheelType">Wheel Style</label>
  <select
    id="wheelType"
    className="car-select"
    value={selectedWheel}
    onChange={(e) => setSelectedWheel(e.target.value)}
  >
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
  <label htmlFor="wheelType">Interior Color</label>
  <select
    id="interiorColor"
    className="car-select"
    value={selectedInteriorColor}
    onChange={(e) => setSelectedInteriorColor(e.target.value)}
  >
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
       <Canvas
        shadows
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: true, toneMappingExposure: 1.5 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset={environment} background />

        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.6} />
        {selectedCar && <CarModel car={selectedCar} selectedColor={selectedColor} selectedWheel={selectedWheel} selectedInteriorColor={selectedInteriorColor}  openDoor={doorOpen} />}

      </Canvas>
      </div>
    </div>
  );
};

export default CarShowroom3D;
