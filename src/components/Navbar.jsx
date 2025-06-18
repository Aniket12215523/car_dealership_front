import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ className = '' }) => {
  const [navColor, setNavColor] = useState('transparent');
  const [textColor, setTextColor] = useState('#fff');
  const [showBorder, setShowBorder] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      const section = document.getElementById('scroll-target');
      if (!hero || !section) return;

      const scrollY = window.scrollY;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const sectionTop = section.offsetTop;

      if (scrollY < heroBottom - 100) {
        setNavColor('rgba(0, 0, 0, 0)');
        setTextColor('#fff');
        setShowBorder(false); 
      } else if (scrollY >= sectionTop - 100) {
        setNavColor('#fff');
        setTextColor('#000');
        setShowBorder(true); 
      } else {
        setNavColor('rgba(0, 0, 0, 0.8)');
        setTextColor('#fff');
        setShowBorder(true); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${className}`} style={{ background: navColor, borderBottom: showBorder ? '3px solid #2adbbd80' : 'none' }}>
      <div className="navbar-logo" style={{ color: textColor }}>
        AK Dealer'S
      </div>

      <div
        className="mobile-hamburger"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        style={{ color: textColor }}
      >
        ☰
      </div>

      <ul
        className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}
        ref={menuRef}
      >
        <li>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: textColor }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/Car3DCarousel" onClick={() => setIsMobileMenuOpen(false)} style={{ color: textColor }}>
            About
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: textColor }}>
            Services
          </Link>
        </li>

        <li
          className="hamburger-dropdown"
          ref={dropdownRef}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="hamburger-icon" style={{ color: textColor }}>
            &#9776;
          </div>

          {!isMobileMenuOpen && isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/garageshowcase">2D GarageShowcase</Link></li>
              <li><Link to="/carshowroom3d">3D Carshowroom</Link></li>
              <li><Link to="/Car3DCarousel">360° Car Showroom</Link></li>
            </ul>
          )}

          {isMobileMenuOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/web-dev" onClick={() => setIsMobileMenuOpen(false)}>Web Development</Link>
              </li>
              <li>
                <Link to="/design" onClick={() => setIsMobileMenuOpen(false)}>UI/UX Design</Link>
              </li>
              <li>
                <Link to="/marketing" onClick={() => setIsMobileMenuOpen(false)}>Marketing</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
