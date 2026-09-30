import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function KSLGuide({ type }) {
  const data = {
    learn: {
      title: "How to Learn Kenyan Sign Language (KSL) | Beginner Guide",
      description: "Learn Kenyan Sign Language step by step. Start with basic KSL signs, greetings, numbers and everyday communication.",
      heading: "How to Learn Kenyan Sign Language",
      intro: "If you are new to Kenyan Sign Language (KSL), you can start with simple signs and build your communication skills step by step.",
      sections: [
        ["Start with basic KSL signs", "Begin with greetings, common expressions, numbers and signs used in everyday conversations."],
        ["Practice regularly", "Short, consistent practice sessions can help you remember signs and become more comfortable communicating."],
        ["Learn useful phrases", "Move from individual signs to practical phrases and everyday communication situations."],
        ["Get guided support", "A structured KSL class or private session can help you practise correctly and ask questions as you learn."]
      ]
    },
    classes: {
      title: "KSL Classes in Kenya | Learn Kenyan Sign Language",
      description: "Looking for KSL classes in Kenya? Explore beginner, intermediate and private Kenyan Sign Language learning options.",
      heading: "KSL Classes in Kenya",
      intro: "Looking for a Kenyan Sign Language class? Master Kenyan Sign Language provides learning options for beginners and people who want to improve their communication skills.",
      sections: [
        ["Beginner KSL classes", "Start with basic signs, greetings, numbers and everyday expressions."],
        ["Intermediate KSL learning", "Build vocabulary, sentence structure and practical conversation skills."],
        ["Private KSL sessions", "Learn at your own pace with guidance based on your goals and experience."],
        ["Choose the right learning path", "If you are not sure where to start, you can contact us for guidance before booking a session."]
      ]
    },
    basics: {
      title: "Kenyan Sign Language (KSL) Basics | Beginner Resources",
      description: "Understand the basics of Kenyan Sign Language, including what KSL is, who can learn it and how to get started.",
      heading: "Kenyan Sign Language Basics",
      intro: "You do not need previous sign language experience to begin learning KSL. The best starting point is practical communication.",
      sections: [
        ["What is KSL?", "Kenyan Sign Language, commonly called KSL, is used by Deaf people and communities in Kenya."],
        ["Who can learn KSL?", "Anyone interested in communication and inclusion can learn KSL, including students, families, teachers, professionals and beginners."],
        ["What should beginners learn first?", "Start with greetings, introductions, numbers, common everyday signs and simple communication."],
        ["Keep learning", "Use structured lessons, practise regularly and gradually expand your vocabulary and conversation skills."]
      ]
    }
  }[type];

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: data.title,
            description: data.description,
            url: window.location.href,
            about: {
              "@type": "Thing",
              name: "Kenyan Sign Language"
            },
            isPartOf: {
              "@type": "WebSite",
              name: "Master Kenyan Sign Language",
              url: "https://master-kenyan-sign-language-x4v8.vercel.app/"
            }
          })}
        </script>
      </Helmet>

      <div className="seo-page">
        <main className="seo-page-content">
          <span className="section-label">Master Kenyan Sign Language</span>
          <h1>{data.heading}</h1>
          <p className="seo-page-intro">{data.intro}</p>

          <div className="seo-topic-grid">
            {data.sections.map(([title, text]) => (
              <article className="seo-topic-card" key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <section className="seo-page-cta">
            <h2>Ready to start learning KSL?</h2>
            <p>Explore our learning options or read more KSL resources.</p>
            <div className="seo-page-links">
              <Link to="/#services" className="btn btn-primary">View KSL Learning Options</Link>
              <Link to="/blog" className="btn btn-secondary">Read the KSL Blog</Link>
              <Link to="/" className="btn btn-secondary">Back to Home</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default KSLGuide;
