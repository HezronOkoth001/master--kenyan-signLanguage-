import "./Contact.css";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const whatsappNumber = "254795592258"; // Replace with your WhatsApp number

    const whatsappMessage = `Hello, my name is ${name}.

Email: ${email}

Message:
${message}`;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* Heading */}
        <div className="contact-heading">
          <span>CONTACT US</span>

          <h1>
            Let's Talk About
            <strong> KSL</strong>
          </h1>

          <p>
            Have a question about our Kenyan Sign Language classes,
            training, or services? Get in touch with us.
          </p>
        </div>

        {/* Contact Content */}
        <div className="contact-content">

          {/* Contact Information */}
          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p>
              We are here to help you learn, practice, and
              communicate using Kenyan Sign Language.
            </p>

            <div className="contact-details">

              {/* Phone */}
              <div className="contact-item">
                <div className="contact-icon">📞</div>

                <div>
                  <span>Phone</span>

                  <a href="tel:+254795592258">
                    +254 795 592 258
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-item">
                <div className="contact-icon">💬</div>

                <div>
                  <span>WhatsApp</span>

                  <a
                    href="https://wa.me/254795592258"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat with us
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon">✉️</div>

                <div>
                  <span>Email</span>

                  <a href="mailto:luciaseda354@gmail.com">
                    luciaseda354@gmail.com
                    
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item">
                <div className="contact-icon">📍</div>

                <div>
                  <span>Location</span>

                  <p>Nairobi, Kenya</p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-box">

            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="name">Your Name</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit">
                Send Message
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;