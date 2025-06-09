import { createContext, useContext, useState, useRef } from 'react';

const PreloaderContext = createContext();

export const PreloaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const hasShownOnce = useRef(false);

  return (
    <PreloaderContext.Provider value={{ loading, setLoading, hasShownOnce }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => useContext(PreloaderContext);
