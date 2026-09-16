function VideoSection() {
  return (
    <section className="video-section">

      <div className="section-heading">
        <span className="section-label">
          LEARN THROUGH VISUAL COMMUNICATION
        </span>

        <h2>
          See how sign language
          <br />
          brings people together.
        </h2>

        <p>
          Sign language is more than communication.
          It creates connection, understanding, and inclusion.
        </p>
      </div>

      <div className="video-container">

        <video
          className="sample-video"
          controls
          autoPlay
          loop
          playsInline
        >
          <source
            src="/WIN_20260616_10_09_44_Pro.mp4"
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>

      </div>

      <p className="video-note">
        Sample video for demonstration purposes.
        Our own Kenyan Sign Language videos will be added later.
      </p>

    </section>
  );
}

export default VideoSection;