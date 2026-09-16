import "./Blog.css";

const Blog = () => {
  const blogs = [
    {
      title: "What Is Kenyan Sign Language?",
      excerpt:
        "Learn what Kenyan Sign Language is and why it is important for communication and inclusion.",
      image: "/blog-1.jpg",
      date: "September 17, 2026",
    },
    {
      title: "Why Learn Kenyan Sign Language?",
      excerpt:
        "Discover some of the benefits of learning Kenyan Sign Language in everyday communication.",
      image: "/blog-2.jpg",
      date: "September 17, 2026",
    },
    {
      title: "Getting Started With KSL",
      excerpt:
        "A simple guide for beginners who want to start learning Kenyan Sign Language.",
      image: "/blog-3.jpg",
      date: "September 17, 2026",
    },
  ];

  return (
    <section className="blog-section" id="blog">
      <div className="blog-container">

        <div className="blog-heading">
          <span>OUR BLOG</span>

          <h2>
            Learn More About
            <strong> Kenyan Sign Language</strong>
          </h2>

          <p>
            Explore articles, tips, guides, and useful information
            about Kenyan Sign Language and inclusive communication.
          </p>
        </div>

        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <article className="blog-card" key={index}>

              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
              </div>

              <div className="blog-content">

                <span className="blog-date">
                  {blog.date}
                </span>

                <h3>{blog.title}</h3>

                <p>{blog.excerpt}</p>

                <button className="read-more">
                  Read More →
                </button>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;