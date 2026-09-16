import "./Services.css";

const Services = () => {
  const handleBookNow = (serviceName, price) => {
    const message = `Hello, I would like to book ${serviceName}. The price is ${price}.`;

    const whatsappNumber = "254795592258"; // Replace with your WhatsApp number

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const services = [
    {
      title: "KSL Training",
      description:
        "Learn Kenyan Sign Language through simple and practical lessons designed for beginners.",
      price: "KSh 1,500",
    },
    {
      title: "Private KSL Session",
      description:
        "Get a one-on-one Kenyan Sign Language session with personalized guidance.",
      price: "KSh 2,000",
    },
    {
      title: "KSL Consultation",
      description:
        "Get guidance and support for your Kenyan Sign Language communication needs.",
      price: "KSh 1,000",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className="services-container">

        <div className="services-heading">
          <span>OUR SERVICES</span>

          <h2>
            Learn Kenyan Sign Language
            <strong> With Us</strong>
          </h2>

          <p>
            Choose a service that fits your needs and start your
            Kenyan Sign Language journey.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>

              <div className="service-number">
                0{index + 1}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="service-footer">

                <div className="service-price">
                  {service.price}
                </div>

                <button
                  className="book-now"
                  onClick={() =>
                    handleBookNow(service.title, service.price)
                  }
                >
                  Book Now
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
