import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Master Kenyan Sign Language
      </div>

      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#classes">Classes</a>
        <a href="#contact">Contact</a>
      </div>
      <Link to="/blog">Blog</Link>

      <button className="navbar-button">
        Book a Class
      </button>
    </nav>
  );
}

export default Navbar;