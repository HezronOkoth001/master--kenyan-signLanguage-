import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-mark">KSL</span>

          <span className="logo-text">
            Master Kenyan
            <small>Sign Language</small>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="/#home" onClick={closeMenu}>
            Home
          </a>

          <a href="/#about" onClick={closeMenu}>
            About
          </a>

          <a href="/#services" onClick={closeMenu}>
            Services
          </a>

          <a href="/#classes" onClick={closeMenu}>
            Classes
          </a>

          <Link to="/blog" onClick={closeMenu}>
            Blog
          </Link>

          <a href="/#contact" onClick={closeMenu}>
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="navbar-actions">

          {/* Dark Mode */}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Book Button */}
          <a href="/#services" className="navbar-button">
            Book a Class
          </a>

          {/* Mobile Menu */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;