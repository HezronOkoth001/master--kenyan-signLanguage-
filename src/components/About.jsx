import React from "react";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* Header */}
        <div className="about-header">
          <span className="about-small-title">ABOUT US</span>

          <h2>
            Bridging Communication Through
            <span> Kenyan Sign Language</span>
          </h2>

          <p>
            Our platform is designed to make Kenyan Sign Language easier
            to learn, understand, and use. We believe communication should
            be accessible to everyone, regardless of hearing ability.
          </p>
        </div>

        {/* Main Content */}
        <div className="about-content">

          {/* Left Side */}
          <div className="about-text">
            <h3>Our Mission</h3>

            <p>
              Our mission is to promote communication and inclusion by
              providing accessible tools and resources for learning Kenyan
              Sign Language.
            </p>

            <p>
              We want to create a digital platform where students, families,
              teachers, professionals, and members of the deaf community can
              learn and interact with Kenyan Sign Language.
            </p>

            <div className="about-features">

              <div className="about-feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>Accessible Learning</h4>
                  <p>
                    Learn sign language through simple and accessible
                    digital resources.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>Inclusive Communication</h4>
                  <p>
                    Helping bridge communication between deaf and hearing
                    communities.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>Modern Technology</h4>
                  <p>
                    Using technology to make Kenyan Sign Language easier
                    to access and learn.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side */}
          <div className="about-card">

            <div className="about-card-icon">🤝</div>

            <h3>Building an Inclusive Community</h3>

            <p>
              Communication connects people. By supporting Kenyan Sign
              Language education and awareness, we can help create a more
              inclusive society where everyone has the opportunity to
              communicate and participate.
            </p>

            <div className="about-stat">
              <strong>100%</strong>
              <span>Focused on accessibility and inclusion</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;