function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Service",
      description:
        "Choose KSL Training, a private session, or start with our free consultation.",
    },
    {
      number: "02",
      title: "Book Your Session",
      description:
        "Send your details and choose the learning option that works best for you.",
    },
    {
      number: "03",
      title: "Start Learning",
      description:
        "Meet with your instructor and begin learning Kenyan Sign Language step by step.",
    },
  ];

  return (
    <section className="how-it-works section">
      <div className="container">

        {/* Heading */}
        <div className="section-header">

          <span className="section-label">
            How It Works
          </span>

          <h2 className="section-title">
            Getting started is simple.
          </h2>

          <p className="section-description">
            From your first consultation to your first lesson,
            we keep the learning process simple.
          </p>

        </div>


        {/* Steps */}
        <div className="steps-grid">

          {steps.map((step, index) => (
            <div className="step" key={step.number}>

              <div className="step-number">
                {step.number}
              </div>

              <div className="step-content">

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="step-line"></div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;