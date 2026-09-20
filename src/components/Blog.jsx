import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/blogs"
        );

        const data = await response.json();

        setArticles(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("data:image")) {
      return image;
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:5000${image}`;
  };

  return (
    <section className="blog-section" id="blog">
      <div className="blog-container">

        {/* HEADER */}
        <div className="blog-header">

          <div>
            <span className="blog-label">
              From The Blog
            </span>

            <h2>
              Learn beyond
              <span> the classroom.</span>
            </h2>
          </div>

          <div className="blog-header-right">
            <p>
              Discover useful KSL tips, communication advice,
              learning resources, and stories from the world
              of Kenyan Sign Language.
            </p>

            <Link
              to="/blog"
              className="blog-view-all"
            >
              View All Articles
              <span>→</span>
            </Link>
          </div>

        </div>

        {/* ARTICLES */}
        {loading ? (
          <div className="blog-loading">
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="blog-empty">
            <h3>No articles yet.</h3>
            <p>
              New KSL learning resources will appear here soon.
            </p>
          </div>
        ) : (
          <div className="blog-grid">

            {articles.map((article, index) => {

              const image = getImageUrl(
                article.cover_image
              );

              return (
                <article
                  className={`blog-card ${
                    index === 0
                      ? "blog-card-featured"
                      : ""
                  }`}
                  key={article.id}
                >

                  {/* IMAGE */}
                  <Link
                    to={`/blog/${article.id}`}
                    className="blog-image"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={article.title}
                      />
                    ) : (
                      <div className="blog-image-placeholder">
                        <span>KSL</span>
                      </div>
                    )}

                    <div className="blog-image-number">
                      0{index + 1}
                    </div>
                  </Link>

                  {/* CONTENT */}
                  <div className="blog-card-content">

                    <div className="blog-meta">
                      <span>
                        {article.author}
                      </span>

                      <span>•</span>

                      <span>
                        {new Date(
                          article.published_at
                        ).toLocaleDateString(
                          "en-KE",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <h3>
                      <Link
                        to={`/blog/${article.id}`}
                      >
                        {article.title}
                      </Link>
                    </h3>

                    <p>
                      {article.content.length > 140
                        ? `${article.content.slice(
                            0,
                            140
                          )}...`
                        : article.content}
                    </p>

                    <Link
                      to={`/blog/${article.id}`}
                      className="blog-read-more"
                    >
                      Read Article
                      <span>→</span>
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}

export default Blog;