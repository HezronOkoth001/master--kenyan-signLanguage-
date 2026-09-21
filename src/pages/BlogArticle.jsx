import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "./BlogArticle.css";

const SERVER_URL = import.meta.env.VITE_API_URL;
const API_URL = `${SERVER_URL}/api/blogs`;

function BlogArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
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
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Article could not be found.");
        }

        const data = await response.json();

        setArticle(data);

        // Load other articles for the related section
        const blogsResponse = await fetch(API_URL);

        if (blogsResponse.ok) {
          const blogs = await blogsResponse.json();

          const related = blogs
            .filter((blog) => blog.id !== data.id)
            .slice(0, 3);

          setRelatedArticles(related);
        }
      } catch (error) {
        console.error("Article loading error:", error);

        setError(
          error.message ||
            "Something went wrong while loading the article."
        );
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="article-loading-page">
        <div className="article-loader"></div>

        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-error-page">
        <div className="article-error-box">
          <span>404</span>

          <h1>Article not found</h1>

          <p>
            Sorry, we couldn't find the article you are
            looking for.
          </p>

          <button onClick={() => navigate("/blog")}>
            ← Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* =================================
          SEO
      ================================= */}

      <Helmet>
        <title>
          {article.title} | Master Kenyan Sign Language
        </title>

        <meta
          name="description"
          content={`${article.content.slice(0, 155)}...`}
        />

        <meta
          name="author"
          content={article.author}
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          property="og:title"
          content={`${article.title} | Master Kenyan Sign Language`}
        />

        <meta
          property="og:description"
          content={`${article.content.slice(0, 155)}...`}
        />

        <meta
          property="og:type"
          content="article"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={`${article.title} | Master Kenyan Sign Language`}
        />

        <meta
          name="twitter:description"
          content={`${article.content.slice(0, 155)}...`}
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.content.slice(0, 155),
            author: {
              "@type": "Person",
              name: article.author,
            },
            datePublished: article.published_at,
            dateModified: article.updated_at || article.published_at,
            publisher: {
              "@type": "Organization",
              name: "Master Kenyan Sign Language",
            },
            image: article.cover_image
              ? [getImageUrl(article.cover_image)]
              : [],
          })}
        </script>
      </Helmet>

      {/* =================================
          ARTICLE PAGE
      ================================= */}

      <div className="article-page">

        {/* =================================
            TOP NAVIGATION
        ================================= */}

        <header className="article-navbar">

          <div className="article-nav-inner">

            <Link
              to="/blog"
              className="article-brand"
            >
              <div className="article-brand-icon">
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

            <Link
              to="/blog"
              className="back-blog-link"
            >
              ← All Articles
            </Link>

          </div>

        </header>


        {/* =================================
            ARTICLE HEADER
        ================================= */}

        <main>

          <section className="article-header">

            <div className="article-header-inner">

              <Link
                to="/blog"
                className="article-back-link"
              >
                ← Back to articles
              </Link>

              <div className="article-category">
                KENYAN SIGN LANGUAGE
              </div>

              <h1>
                {article.title}
              </h1>

              <div className="article-meta">

                <div className="author-avatar">
                  {article.author
                    ? article.author
                        .charAt(0)
                        .toUpperCase()
                    : "K"}
                </div>

                <div className="author-details">

                  <strong>
                    {article.author}
                  </strong>

                  <span>
                    Published{" "}
                    {formatDate(article.published_at)}
                  </span>

                </div>

                <span className="meta-divider">
                  •
                </span>

                <span className="reading-time">
                  KSL Learning Resource
                </span>

              </div>

            </div>

          </section>


          {/* =================================
              COVER IMAGE
          ================================= */}

          {article.cover_image && (
            <section className="article-cover-section">

              <div className="article-cover-wrapper">

                <img
                  src={getImageUrl(
                    article.cover_image
                  )}
                  alt={article.title}
                  className="article-cover-image"
                />

              </div>

            </section>
          )}


          {/* =================================
              ARTICLE CONTENT
          ================================= */}

          <section className="article-content-section">

            <article className="article-content">

              <div className="article-introduction">
                Kenyan Sign Language is an important
                part of communication, education and
                inclusion within the Deaf community.
              </div>

              <div className="article-body">

                {article.content
                  .split(/\n+/)
                  .filter(
                    (paragraph) =>
                      paragraph.trim()
                  )
                  .map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}

              </div>


              {/* ARTICLE IMAGES */}

              {article.article_images &&
                article.article_images.length > 0 && (

                  <div className="article-gallery">

                    {article.article_images.map(
                      (image, index) => (

                        <figure
                          className="article-image"
                          key={
                            image.id || index
                          }
                        >

                          <img
                            src={getImageUrl(
                              image.image_path
                            )}
                            alt={`${article.title} ${
                              index + 1
                            }`}
                          />

                        </figure>

                      )
                    )}

                  </div>
                )}


              {/* ARTICLE FOOTER */}

              <div className="article-end">

                <div className="article-end-line"></div>

                <div className="article-end-icon">
                  KSL
                </div>

                <h3>
                  Keep learning. Keep connecting.
                </h3>

                <p>
                  Explore more Kenyan Sign Language
                  resources and continue building
                  your understanding of KSL.
                </p>

              </div>

            </article>

          </section>


          {/* =================================
              RELATED ARTICLES
          ================================= */}

          {relatedArticles.length > 0 && (

            <section className="related-section">

              <div className="related-inner">

                <div className="related-heading">

                  <div>

                    <span>
                      CONTINUE READING
                    </span>

                    <h2>
                      More from KSL
                    </h2>

                  </div>

                  <Link to="/blog">
                    View all articles →
                  </Link>

                </div>


                <div className="related-grid">

                  {relatedArticles.map((blog) => (

                    <Link
                      to={`/blog/${blog.id}`}
                      className="related-card"
                      key={blog.id}
                    >

                      <div className="related-image">

                        {blog.cover_image ? (
                          <img
                            src={getImageUrl(
                              blog.cover_image
                            )}
                            alt={blog.title}
                          />
                        ) : (
                          <div className="related-placeholder">
                            KSL
                          </div>
                        )}

                      </div>

                      <div className="related-card-content">

                        <span>
                          {formatDate(
                            blog.published_at
                          )}
                        </span>

                        <h3>
                          {blog.title}
                        </h3>

                        <p>
                          By {blog.author}
                        </p>

                        <strong>
                          Read article →
                        </strong>

                      </div>

                    </Link>

                  ))}

                </div>

              </div>

            </section>
          )}

        </main>


        {/* =================================
            FOOTER
        ================================= */}

        <footer className="article-footer">

          <div className="article-footer-inner">

            <div>

              <div className="footer-brand">
                KSL
              </div>

              <p>
                Kenyan Sign Language education,
                awareness and community.
              </p>

            </div>

            <Link to="/blog">
              Back to Articles →
            </Link>

          </div>

        </footer>

      </div>
    </>
  );
}

export default BlogArticle;