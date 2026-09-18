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

          <a href="mailto:info@ksl.com">
            info@ksl.com
          </a>

          <a href="tel:+254700806728">
            +254 700 806 728
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
