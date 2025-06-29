import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuRef = useRef();
  const dropdownRef = useRef();
  const userDropdownRef = useRef();
  const navbarRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById('hero-section')?.offsetHeight || 0;
      setIsScrolled(window.scrollY > heroHeight * 0.6);

      const sections = ['home', 'about', 'services', 'showcase'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      ref={navbarRef}
      className={`navbar ${className} ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <span className="logo-text">AK Dealer'S</span>
          <span className="logo-highlight"></span>
        </Link>
      </div>

      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <div className="mobile-close-icon" onClick={(e) => { e.stopPropagation(); closeMobileMenu(); }}>✕</div>
        ) : (
          <div className="mobile-hamburger">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        )}
      </div>

      <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <li className={activeSection === 'home' ? 'active' : ''}>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li className={activeSection === 'about' ? 'active' : ''}>
          <Link to="/Car3DCarousel" onClick={closeMobileMenu}>About</Link>
        </li>
        <li className={activeSection === 'services' ? 'active' : ''}>
          <Link to="/services" onClick={closeMobileMenu}>Services</Link>
        </li>

        <li className="hamburger-dropdown" ref={dropdownRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className="dropdown-toggle">
            Showrooms <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </div>
          <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            <li><Link to="/garageshowcase" onClick={closeMobileMenu}>2D GarageShowcase</Link></li>
            <li><Link to="/carshowroom3d" onClick={closeMobileMenu}>3D Carshowroom</Link></li>
            <li><Link to="/Car3DCarousel" onClick={closeMobileMenu}>360° Car Showroom</Link></li>
          </ul>
        </li>
      </ul>

      <div className="user-menu" ref={userDropdownRef} onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
        <img src="./images/user.png" alt="User" className="user-icon" />
        <ul className={`user-dropdown ${isUserDropdownOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile" onClick={() => setIsUserDropdownOpen(false)}>Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsUserDropdownOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setIsUserDropdownOpen(false)}>Register</Link></li>
              <li><Link to="/phone-login" onClick={() =>setIsUserDropdownOpen(false)}>Phone Login</Link></li>
              <li><Link to="/CombinedLogin" onClick={() => setIsUserDropdownOpen(false)}>Combined Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
