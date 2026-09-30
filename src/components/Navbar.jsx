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
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
          aria-label="Master Kenyan Sign Language home"
        >
          <img
            src="/ksl-logo.svg"
            alt="KSL - Master Kenyan Sign Language"
            className="logo-image"
            style={{ width: "48px", height: "48px", flexShrink: 0, objectFit: "contain", borderRadius: "12px" }}
          />

          <span className="logo-text">
            Master Kenyan
            <small>Sign Language</small>
          </span>
        </Link>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="/#home" onClick={closeMenu}>Home</a>
          <a href="/#about" onClick={closeMenu}>About</a>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <a href="/#classes" onClick={closeMenu}>Classes</a>

          <Link
            to="/blog"
            className="blog-nav-link"
            onClick={closeMenu}
            aria-label="Visit our KSL blog"
          >
            <span className="blog-nav-icon">✦</span>
            <span>Blog</span>
            <span className="blog-nav-badge">NEW</span>
          </Link>

          <a href="/#contact" onClick={closeMenu}>Contact</a>
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <a href="/#services" className="navbar-button">
            Book a Class
          </a>

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
