// Preloader.jsx
import React, { useEffect, useState } from 'react';
import './Preloader.css';
import { usePreloader } from '../context/PreloaderContext';

const Preloader = () => {
  const { setLoading, hasShownOnce } = usePreloader();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasShownOnce.current) {
      setLoading(false);
      return;
    }

    const images = Array.from(document.images);
    const videos = Array.from(document.querySelectorAll('video'));
    const totalAssets = images.length + videos.length || 1;
    let loaded = 0;

    const increment = () => {
      loaded++;
      const percent = Math.min(100, Math.floor((loaded / totalAssets) * 100));
      setProgress(percent);
      if (percent === 100) {
        hasShownOnce.current = true;
        setTimeout(() => setLoading(false), 500); // Small delay to smoothen fade out
      }
    };

    images.forEach((img) => {
      if (img.complete) increment();
      else {
        img.addEventListener('load', increment);
        img.addEventListener('error', increment);
      }
    });

    videos.forEach((vid) => {
      if (vid.readyState >= 3) increment();
      else {
        vid.addEventListener('canplaythrough', increment);
        vid.addEventListener('error', increment);
      }
    });

    const fallback = setTimeout(() => {
      setProgress(100);
      hasShownOnce.current = true;
      setLoading(false);
    }, 10000);

    return () => clearTimeout(fallback);
  }, [setLoading, hasShownOnce]);

  return (
    <div className="preloader">
      <div className="loader">
        <h2>{progress}%</h2>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Preloader;
