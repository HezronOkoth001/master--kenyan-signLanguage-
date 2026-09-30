function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-heading">
          <span className="about-label">About Us</span>

          <h2>
            Making Kenyan Sign Language
            <span> easier to learn.</span>
          </h2>

          <p>
            Master Kenyan Sign Language is a learning platform
            created to make Kenyan Sign Language simple, practical,
            and accessible to everyone.
          </p>
        </div>

        <div className="about-visual-story">
          <div className="about-story-main">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5d0e26531c3e4d00019decc5/1719500408514-L7Z8YD0OSDVFOYWSTODS/UNICEF%2BGIGA%2BCONNECTIVITY%2BMASENO-28_small.jpg"
              alt="Deaf students practicing sign language during a digital learning session"
              loading="lazy"
            />
            <div className="about-story-caption">
              <span>LEARN TOGETHER</span>
              <strong>Communication starts with understanding.</strong>
            </div>
          </div>

          <div className="about-story-side">
            <div className="about-story-small">
              <img
                src="https://publish.eastleighvoice.co.ke/mugera_lock/uploads/2024/01/Sign-3.jpg"
                alt="Students practicing Kenyan Sign Language"
                loading="lazy"
              />
            </div>

            <div className="about-story-note">
              <span>🤟</span>
              <strong>Practice. Connect. Communicate.</strong>
              <p>
                Build useful KSL skills through clear lessons and
                practical communication.
              </p>
            </div>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-main">
            <p>
              Whether you are completely new to KSL, want to improve
              your communication skills, or want to communicate more
              effectively with Deaf people, our lessons are designed
              to help you learn step by step.
            </p>

            <p>
              We focus on practical communication, clear instruction,
              and a learning experience that helps you build confidence
              at your own pace.
            </p>
          </div>

          <div className="about-features">
            <div className="about-feature">
              <div className="about-feature-number">01</div>
              <div>
                <h3>Simple Learning</h3>
                <p>Clear and practical lessons that are easy to follow.</p>
              </div>
            </div>

            <div className="about-feature">
              <div className="about-feature-number">02</div>
              <div>
                <h3>Practical Communication</h3>
                <p>
                  Learn signs and communication skills for everyday
                  situations.
                </p>
              </div>
            </div>

            <div className="about-feature">
              <div className="about-feature-number">03</div>
              <div>
                <h3>Learn With Confidence</h3>
                <p>
                  Build your confidence through guided lessons and
                  personalized support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;