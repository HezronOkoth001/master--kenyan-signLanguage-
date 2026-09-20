import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      number: "01",
      title: "KSL Training",
      description:
        "Learn Kenyan Sign Language through simple and practical lessons designed for beginners.",
      price: "KSh 1,500",
      button: "Book Training",
    },
    {
      number: "02",
      title: "Private KSL Session",
      description:
        "Get a one-on-one Kenyan Sign Language session with personalized guidance.",
      price: "KSh 2,000",
      button: "Book Session",
    },
    {
      number: "03",
      title: "KSL Consultation",
      description:
        "Discuss your KSL learning goals, communication needs, and the best way to get started.",
      price: "FREE",
      button: "Book Free Consultation",
      featured: true,
    },
  ];

  const handleBooking = (service) => {
    navigate("/payment", {
      state: {
        service: service.title,
        price: service.price === "FREE"
          ? 0
          : Number(
              service.price
                .replace("KSh", "")
                .replace(",", "")
                .trim()
            ),
      },
    });
  };

  return (
    <section className="services section" id="services">
      <div className="container">

        {/* Section heading */}
        <div className="section-header">

          <span className="section-label">
            What We Offer
          </span>

          <h2 className="section-title">
            Learn KSL your way.
          </h2>

          <p className="section-description">
            Choose the learning option that fits your goals,
            schedule and level of experience.
          </p>

        </div>


        {/* Services */}
        <div className="services-grid">

          {services.map((service) => (
            <div
              className={`service-card card ${
                service.featured ? "service-featured" : ""
              }`}
              key={service.title}
            >

              {service.featured && (
                <div className="service-badge">
                  FREE
                </div>
              )}

              <div className="service-number">
                {service.number}
              </div>

              <h3>
                {service.title}
              </h3>

              <p>
                {service.description}
              </p>

              <div
                className={`service-price ${
                  service.featured ? "free" : ""
                }`}
              >
                {service.price}
              </div>

              <button
                className={`btn ${
                  service.featured
                    ? "btn-gold"
                    : "btn-primary"
                }`}
                onClick={() => handleBooking(service)}
              >
                {service.button}
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;