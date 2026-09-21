import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css";

const SERVER_URL = import.meta.env.VITE_API_URL;
const API_URL = `${SERVER_URL}/api/blogs`;

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getImageUrl = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:image")
    ) {
      return image;
    }

    return `${SERVER_URL}${image}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load articles.");
        }

        const data = await response.json();

        setBlogs(data);
      } catch (error) {
        console.error("Blog loading error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="blog-loader"></div>
        <p>Loading KSL articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <div>
          <span>!</span>
          <h1>Unable to load articles</h1>
          <p>{error}</p>

          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredArticle = blogs[0];
  const remainingArticles = blogs.slice(1);

  return (
    <div className="blog-page">

      {/* =================================
          HEADER
      ================================= */}

      <header className="blog-navbar">

        <div className="blog-nav-inner">

          <Link to="/" className="blog-brand">

            <div className="blog-brand-icon">
              KSL
            </div>

            <div>
              <strong>
                Kenyan Sign Language
              </strong>

              <span>
                Learning • Community • Awareness
              </span>
            </div>

          </Link>

          <nav className="blog-navigation">

            <Link to="/">
              Home
            </Link>

            <a href="#articles">
              Articles
            </a>

            <a href="#about-blog">
              About
            </a>

          </nav>

          <Link
            to="/"
            className="blog-home-button"
          >
            Visit Website
          </Link>

        </div>

      </header>


      {/* =================================
          HERO
      ================================= */}

      <section className="blog-hero">

        <div className="blog-hero-pattern"></div>

        <div className="blog-hero-inner">

          <div className="blog-hero-content">

            <span className="blog-eyebrow">
              KSL JOURNAL
            </span>

            <h1>
              Learn.
              <br />
              Connect.
              <br />
              Understand.
            </h1>

            <p>
              Discover stories, educational resources
              and insights about Kenyan Sign Language
              and the Deaf community.
            </p>

            <a
              href="#articles"
              className="explore-button"
            >
              Explore Articles
              <span>↓</span>
            </a>

          </div>

          <div className="hero-decoration">

            <div className="hero-circle large"></div>

            <div className="hero-circle medium"></div>

            <div className="hero-circle small"></div>

            <div className="hero-card">

              <span>
                KSL
              </span>

              <strong>
                Communication
              </strong>

              <p>
                begins with understanding.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================
          FEATURED ARTICLE
      ================================= */}

      {featuredArticle && (

        <section className="featured-section">

          <div className="featured-inner">

            <div className="section-top">

              <div>

                <span>
                  FEATURED ARTICLE
                </span>

                <h2>
                  From the KSL Journal
                </h2>

              </div>

            </div>


            <Link
              to={`/blog/${featuredArticle.id}`}
              className="featured-card"
            >

              <div className="featured-image">

                {featuredArticle.cover_image ? (
                  <img
                    src={getImageUrl(
                      featuredArticle.cover_image
                    )}
                    alt={featuredArticle.title}
                  />
                ) : (
                  <div className="image-placeholder">
                    KSL
                  </div>
                )}

                <div className="featured-tag">
                  Latest
                </div>

              </div>


              <div className="featured-content">

                <span className="featured-date">
                  {formatDate(
                    featuredArticle.published_at
                  )}
                </span>

                <h3>
                  {featuredArticle.title}
                </h3>

                <p>
                  {featuredArticle.content
                    ? featuredArticle.content.length > 230
                      ? `${featuredArticle.content.substring(
                          0,
                          230
                        )}...`
                      : featuredArticle.content
                    : "Discover this article from the KSL Journal."}
                </p>


                <div className="featured-author">

                  <div className="author-circle">
                    {featuredArticle.author
                      ? featuredArticle.author
                          .charAt(0)
                          .toUpperCase()
                      : "K"}
                  </div>

                  <div>

                    <strong>
                      {featuredArticle.author}
                    </strong>

                    <span>
                      KSL Journal
                    </span>

                  </div>

                  <div className="featured-arrow">
                    →
                  </div>

                </div>

              </div>

            </Link>

          </div>

        </section>
      )}


      {/* =================================
          ARTICLES
      ================================= */}

      <section
        id="articles"
        className="articles-section"
      >

        <div className="articles-inner">

          <div className="articles-heading">

            <div>

              <span>
                EXPLORE THE JOURNAL
              </span>

              <h2>
                Latest Articles
              </h2>

              <p>
                Practical knowledge, stories and
                resources about Kenyan Sign Language.
              </p>

            </div>

            <div className="article-number">
              {blogs.length}{" "}
              {blogs.length === 1
                ? "Article"
                : "Articles"}
            </div>

          </div>


          {remainingArticles.length > 0 ? (

            <div className="blog-grid">

              {remainingArticles.map((blog) => (

                <Link
                  to={`/blog/${blog.id}`}
                  className="blog-card"
                  key={blog.id}
                >

                  <div className="blog-card-image">

                    {blog.cover_image ? (
                      <img
                        src={getImageUrl(
                          blog.cover_image
                        )}
                        alt={blog.title}
                      />
                    ) : (
                      <div className="image-placeholder">
                        KSL
                      </div>
                    )}

                    <span>
                      KSL
                    </span>

                  </div>


                  <div className="blog-card-content">

                    <div className="card-meta">

                      <span>
                        {formatDate(
                          blog.published_at
                        )}
                      </span>

                      <span>
                        •
                      </span>

                      <span>
                        KSL Journal
                      </span>

                    </div>


                    <h3>
                      {blog.title}
                    </h3>


                    <p>
                      {blog.content
                        ? blog.content.length > 140
                          ? `${blog.content.substring(
                              0,
                              140
                            )}...`
                          : blog.content
                        : "Read this article to learn more about Kenyan Sign Language."}
                    </p>


                    <div className="read-link">
                      Read article
                      <span>
                        →
                      </span>
                    </div>

                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <div className="no-articles">

              <div>
                KSL
              </div>

              <h3>
                More articles coming soon
              </h3>

              <p>
                We are preparing more educational
                content for the KSL community.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =================================
          ABOUT BLOG
      ================================= */}

      <section
        id="about-blog"
        className="blog-about"
      >

        <div className="blog-about-inner">

          <div className="about-mark">
            KSL
          </div>

          <div className="about-text">

            <span>
              ABOUT THE JOURNAL
            </span>

            <h2>
              A place to learn and connect
            </h2>

            <p>
              The KSL Journal is a space for sharing
              knowledge, educational resources and
              stories that help people understand
              Kenyan Sign Language and communicate
              more inclusively.
            </p>

          </div>

          <div className="about-stat">

            <strong>
              {blogs.length}
            </strong>

            <span>
              Published
              <br />
              Articles
            </span>

          </div>

        </div>

      </section>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="blog-footer">

        <div className="blog-footer-inner">

          <div className="footer-brand-area">

            <div className="footer-logo">
              KSL
            </div>

            <div>

              <strong>
                Kenyan Sign Language
              </strong>

              <p>
                Education • Awareness • Community
              </p>

            </div>

          </div>


          <div className="footer-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/blog">
              Articles
            </Link>

            <a href="#about-blog">
              About
            </a>

          </div>


          <p className="copyright">
            © {new Date().getFullYear()} Kenyan Sign
            Language. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default BlogPage;