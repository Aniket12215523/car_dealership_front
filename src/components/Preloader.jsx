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

    setTimeout(() => {
      const images = Array.from(document.images);
      const videos = Array.from(document.querySelectorAll('video'));
      const totalAssets = images.length + videos.length || 1;
      let loaded = 0;

      const updateProgress = () => {
        loaded++;
        const percent = Math.min(100, Math.floor((loaded / totalAssets) * 100));
        setProgress(percent);
        if (percent === 100) {
          finishLoading();
        }
      };

      const finishLoading = () => {
        hasShownOnce.current = true;
        setTimeout(() => setLoading(false), 500);
      };

      images.forEach((img) => {
        if (img.complete) updateProgress();
        else {
          img.addEventListener('load', updateProgress);
          img.addEventListener('error', updateProgress);
        }
      });

      videos.forEach((vid) => {
        if (vid.readyState >= 3) updateProgress();
        else {
          vid.addEventListener('canplaythrough', updateProgress);
          vid.addEventListener('error', updateProgress);
        }
      });

      const hardTimeout = setTimeout(() => {
        setProgress(100);
        finishLoading();
      }, 8000);

      return () => clearTimeout(hardTimeout);
    }, 100);
  }, [setLoading, hasShownOnce]);

  


  return (
  <div className="preloader">
    <div className="loader">
      <h1 className="logo-text">AK Dealer's</h1>
      <div className="loader-title">Please wait while we rev up the engines...</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}%</p>
    </div>
  </div>
);

};

export default Preloader;
