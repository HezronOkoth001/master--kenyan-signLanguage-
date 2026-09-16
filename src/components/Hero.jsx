function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <div className="hero-text">

          <div className="floating-label">
            communicate without barriers.
          </div>

          <h1>
            Master kenyan
            <br />
            Sign Language
          </h1>

          <p>
            Learn Kenyan Sign Language, improve communication,
            and connect with others through an inclusive
            and practical learning experience.
          </p>

          <div className="hero-buttons">
            <button className="primary-button">
              Learn With Us
            </button>

            <button className="secondary-button">
              Book a Class with lucia
            </button>
          </div>

        </div>

        <div className="hero-image-container">

          <div className="hero-image-glow"></div>

          <img
            src="src/assets/seda.jpg"
            alt="Person learning and communicating"
            className="hero-image"
          />

          <div className="floating-card">
            <span>Learn</span>
            <strong>Connect</strong>
            <span>Communicate</span>
          </div>

        </div>

      </div>

      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>

    </section>
  );
}

export default Hero;