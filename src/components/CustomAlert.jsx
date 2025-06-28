import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ message, type, onClose }) => {
  return (
    <div className={`custom-alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✕</button>
    </div>
  );
};

export default CustomAlert;
