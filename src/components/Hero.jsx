import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">

        {/* LEFT SIDE */}
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

            <Link
              to="/#classes"
              className="hero-btn hero-btn-primary"
            >
              Start Learning
            </Link>

            <Link
              to="/#services"
              className="hero-btn hero-btn-secondary"
            >
              Explore Classes
            </Link>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hero-visual">

          <div className="hero-main-card">

            <img
              src="/ksl-hero.jpg"
              alt="Kenyan Sign Language"
              className="hero-image"
            />

            <div className="hero-image-overlay">
              <span>KSL</span>

              <h2>
                Kenyan
                <br />
                Sign Language
              </h2>
            </div>

          </div>

          {/* SERVICES BUTTON */}
          <Link
            to="/#services"
            className="hero-service-button"
          >
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