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
      image:
        "https://images.squarespace-cdn.com/content/v1/5d0e26531c3e4d00019decc5/1719500408514-L7Z8YD0OSDVFOYWSTODS/UNICEF%2BGIGA%2BCONNECTIVITY%2BMASENO-28_small.jpg",
    },
    {
      number: "02",
      title: "Private KSL Session",
      description:
        "Get a one-on-one Kenyan Sign Language session with personalized guidance.",
      price: "KSh 2,000",
      button: "Book Session",
      image:
        "https://i0.wp.com/www.alive-reli.org/wp-content/uploads/2025/04/We-Speak-the-Language-of-Inclusion-The-Power-of-Sign-Language-in-College-By-Erika-Mungai.webp?fit=900%2C600&ssl=1",
    },
    {
      number: "03",
      title: "KSL Consultation",
      description:
        "Discuss your KSL learning goals, communication needs, and the best way to get started.",
      price: "FREE",
      button: "Book Free Consultation",
      featured: true,
      image:
        "https://publish.eastleighvoice.co.ke/mugera_lock/uploads/2024/01/Sign-3.jpg",
    },
  ];

  const handleBooking = (service) => {
    navigate("/payment", {
      state: {
        service: service.title,
        price:
          service.price === "FREE"
            ? 0
            : Number(
                service.price.replace("KSh", "").replace(",", "").trim()
              ),
      },
    });
  };

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Learn KSL your way.</h2>
          <p className="section-description">
            Choose the learning option that fits your goals,
            schedule and level of experience.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              className={"service-card card " + (service.featured ? "service-featured" : "")}
              key={service.title}
            >
              <div className="service-image-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                  loading="lazy"
                />
                <span className="service-image-tag">KSL</span>
              </div>

              {service.featured && <div className="service-badge">FREE</div>}

              <div className="service-number">{service.number}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className={"service-price " + (service.featured ? "free" : "")}>
                {service.price}
              </div>

              <button
                className={"btn " + (service.featured ? "btn-gold" : "btn-primary")}
                onClick={() => handleBooking(service)}
              >
                {service.button}
              </button>
            </div>
          ))}
        </div>

        <p className="photo-credit">
          Learning photos shown for visual context and inspiration.
        </p>
      </div>
    </section>
  );
}

export default Services;