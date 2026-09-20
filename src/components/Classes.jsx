function Classes() {
  const classes = [
    {
      number: "01",
      level: "Beginner",
      title: "Start Your KSL Journey",
      description:
        "Learn the basic signs, greetings, numbers, and everyday expressions you need to start communicating in Kenyan Sign Language.",
      topics: [
        "Basic signs",
        "Greetings",
        "Numbers",
        "Everyday communication",
      ],
    },
    {
      number: "02",
      level: "Intermediate",
      title: "Build Your Communication Skills",
      description:
        "Improve your vocabulary and learn how to communicate more naturally in everyday conversations.",
      topics: [
        "Expanded vocabulary",
        "Sentence structure",
        "Daily conversations",
        "Practical communication",
      ],
    },
    {
      number: "03",
      level: "Private Learning",
      title: "Learn At Your Own Pace",
      description:
        "Get personalized guidance based on your goals, experience, and preferred learning pace.",
      topics: [
        "One-on-one sessions",
        "Personalized lessons",
        "Flexible learning",
        "Individual support",
      ],
    },
  ];

  return (
    <section className="classes-section" id="classes">
      <div className="classes-container">

        {/* HEADER */}
        <div className="classes-header">

          <div>
            <span className="classes-label">
              Our Classes
            </span>

            <h2>
              Learn KSL at
              <span> your pace.</span>
            </h2>
          </div>

          <p>
            Whether you are starting from zero or looking to improve
            your communication skills, choose a learning path that
            works for you.
          </p>

        </div>

        {/* CLASS CARDS */}
        <div className="classes-grid">

          {classes.map((item) => (
            <article
              className="class-card"
              key={item.number}
            >

              <div className="class-card-top">
                <span className="class-number">
                  {item.number}
                </span>

                <span className="class-level">
                  {item.level}
                </span>
              </div>

              <h3>
                {item.title}
              </h3>

              <p className="class-description">
                {item.description}
              </p>

              <div className="class-divider"></div>

              <ul>
                {item.topics.map((topic) => (
                  <li key={topic}>
                    <span>✓</span>
                    {topic}
                  </li>
                ))}
              </ul>

              <a
                href="#services"
                className="class-button"
              >
                View Learning Options
                <span>→</span>
              </a>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Classes;