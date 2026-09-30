import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-label">
            <span></span>
            Learn • Connect • Communicate
          </div>

          <h1 className="hero-title">
            Learn Kenyan
            <br />
            <span>Sign Language</span>
            <br />
            with confidence.
          </h1>

          <p className="hero-description">
            Learn Kenyan Sign Language through simple, practical
            and accessible lessons designed to help you communicate
            with confidence.
          </p>

          <div className="hero-buttons">
            <Link to="/#classes" className="hero-btn hero-btn-primary">
              Start Learning
            </Link>
            <Link to="/#services" className="hero-btn hero-btn-secondary">
              Explore Classes
            </Link>
          </div>

          <div className="hero-trust-row">
            <span>🤟 Practical lessons</span>
            <span>•</span>
            <span>🌍 Open to everyone</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-main-card">
            <img
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85"
              alt="Diverse international students learning together"
              className="hero-photo"
              loading="eager"
            />

            <div className="hero-photo-overlay"></div>

            <div className="hero-image-overlay">
              <span>KSL</span>
              <h2>
                Kenyan
                <br />
                Sign Language
              </h2>
            </div>

            <div className="hero-floating-badge hero-floating-badge-one">
              <span>🤟</span>
              <div>
                <strong>Keep learning</strong>
                <small>One sign at a time</small>
              </div>
            </div>

            <div className="hero-floating-badge hero-floating-badge-two">
              <span>✓</span>
              <div>
                <strong>Learn together</strong>
                <small>Connect with confidence</small>
              </div>
            </div>
          </div>

          <Link to="/#services" className="hero-service-button">
            <span>Learn with confidence</span>
            <small>Step-by-step KSL lessons</small>
            <strong>→</strong>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;