import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PreloaderProvider } from './context/PreloaderContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreloaderProvider>
    <App />
    </PreloaderProvider>
  </React.StrictMode>
)