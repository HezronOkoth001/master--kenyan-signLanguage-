import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-column footer-about">
          <h2>Kenyan Sign Language</h2>

          <p>
            Promoting communication, inclusion, and access
            through Kenyan Sign Language.
          </p>

          <p className="footer-location">
            Nairobi, Kenya
          </p>
          <a
            className="footer-map"
            href="https://www.google.com/maps/search/?api=1&query=Nairobi%2C%20Kenya"
            target="_blank"
            rel="noreferrer"
          >
            View on map →
          </a>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <a href="/#classes">Classes</a>
          <a href="/blog">Blog</a>
          <a href="/#contact">Contact</a>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h3>Services</h3>

          <a href="/#services">KSL Training</a>
          <a href="/#services">Sign Language Interpretation</a>
          <a href="/#services">KSL Resources</a>
          <a href="/#services">Community Support</a>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact Us</h3>

          <a className="footer-contact-link" href="mailto:luciaseda354@gmail.com">
            luciaseda354@gmail.com
          </a>

          <a className="footer-contact-link" href="tel:+254795592258">
            +254 795 592 258
          </a>

          <p>
            Nairobi, Kenya
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">

          <p>
            © {currentYear} Kenyan Sign Language.
            All rights reserved.
          </p>

          <p>
            Built with ❤️ for accessibility and inclusion.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
