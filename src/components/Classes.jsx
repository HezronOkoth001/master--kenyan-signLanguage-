import "./Classes.css";

const Classes = () => {
  const classes = [
    {
      level: "BEGINNER",
      title: "Basic KSL Class",
      description:
        "Learn the basics of Kenyan Sign Language, including common signs, greetings, numbers, and everyday communication.",
      duration: "4 Weeks",
      price: "KSh 1,500",
    },
    {
      level: "INTERMEDIATE",
      title: "Intermediate KSL Class",
      description:
        "Improve your KSL skills and learn more advanced signs, sentences, conversations, and expressions.",
      duration: "6 Weeks",
      price: "KSh 2,500",
    },
    {
      level: "ADVANCED",
      title: "Advanced KSL Class",
      description:
        "Develop stronger communication skills and gain confidence using Kenyan Sign Language in real situations.",
      duration: "8 Weeks",
      price: "KSh 3,500",
    },
  ];

  const handleBookNow = (selectedClass) => {
    const message = `Hello, I would like to book the ${selectedClass.title}.`;

    const phoneNumber = "254700806728";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <section className="classes-section" id="classes">
      <div className="classes-container">

        {/* Heading */}
        <div className="classes-heading">
          <span>OUR CLASSES</span>

          <h1>
            Choose Your
            <strong> KSL Class</strong>
          </h1>

          <p>
            Start learning Kenyan Sign Language from the basics
            and develop your communication skills step by step.
          </p>
        </div>

        {/* Classes */}
        <div className="classes-grid">
          {classes.map((item, index) => (
            <div className="class-card" key={index}>

              <div className="class-level">
                {item.level}
              </div>

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <div className="class-details">

                <div>
                  <span>Duration</span>
                  <strong>{item.duration}</strong>
                </div>

                <div>
                  <span>Price</span>
                  <strong>{item.price}</strong>
                </div>

              </div>

              <button
                className="class-book-btn"
                onClick={() => handleBookNow(item)}
              >
                Book Now
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Classes;