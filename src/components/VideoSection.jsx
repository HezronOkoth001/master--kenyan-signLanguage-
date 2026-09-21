function VideoSection() {
  return (
    <section className="video-section" id="video">
      <div className="video-container">

        {/* LEFT CONTENT */}
        <div className="video-content">

          <span className="video-label">
            KSL Learning Preview
          </span>

          <h2>
            See how
            <span> KSL </span>
            brings people together.
          </h2>

          <p>
            Kenyan Sign Language is more than learning individual signs.
            It is a way to communicate, connect, and understand one another.
          </p>

          <p>
            Explore our learning videos and practice practical signs
            that you can use in everyday communication.
          </p>

          <a
            href="#classes"
            className="video-button"
          >
            Start Learning
            <span>→</span>
          </a>

        </div>

        {/* VIDEO */}
        <div className="video-wrapper">

          <div className="video-frame">

            <video
            autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              poster="/WIN_20230830_11_51_47_Pro.jpg"
            >
              <source
                src="/public/WIN_20230830_11_51_47_Pro.mp4"
                type="video/mp4"
              />

              Your browser does not support the video element.
            </video>

            <div className="video-corner video-corner-one"></div>
            <div className="video-corner video-corner-two"></div>

          </div>

          <div className="video-caption">
            <span>01</span>

            <div>
              <strong>Kenyan Sign Language</strong>
              <p>Learn visually. Practice confidently.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default VideoSection;