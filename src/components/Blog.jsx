import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const API_URL = "http://localhost:5000/api/blogs";
const SERVER_URL = "http://localhost:5000";

const Blog = () => {
  const [latestBlog, setLatestBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    // Old Base64 images
    if (imagePath.startsWith("data:")) {
      return imagePath;
    }

    // Full image URL
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Images uploaded by Multer
    if (imagePath.startsWith("/uploads/")) {
      return `${SERVER_URL}${imagePath}`;
    }

    return imagePath;
  };

  useEffect(() => {
    const loadLatestBlog = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load blogs");
        }

        const blogs = await response.json();

        if (blogs.length > 0) {
          // Backend already sorts newest first
          setLatestBlog(blogs[0]);
        } else {
          setLatestBlog(null);
        }
      } catch (error) {
        console.error("Error loading latest blog:", error);
        setLatestBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadLatestBlog();
  }, []);

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

        {/* LATEST BLOG */}

        {loading ? (
          <div className="blog-loading">
            <p>Loading latest article...</p>
          </div>
        ) : latestBlog ? (
          <div className="blog-grid">

            <article className="blog-card">

              {/* IMAGE */}

              <div className="blog-image">

                {latestBlog.cover_image ? (
                  <img
                    src={getImageUrl(latestBlog.cover_image)}
                    alt={latestBlog.title}
                  />
                ) : (
                  <div className="blog-no-image">
                    No Image
                  </div>
                )}

              </div>

              {/* CONTENT */}

              <div className="blog-content">

                <span className="blog-date">
                  {latestBlog.published_at
                    ? new Date(
                        latestBlog.published_at
                      ).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>

                <h3>
                  {latestBlog.title}
                </h3>

                <p>
                  {latestBlog.content &&
                  latestBlog.content.length > 180
                    ? `${latestBlog.content.substring(
                        0,
                        180
                      )}...`
                    : latestBlog.content}
                </p>

                {/* READ MORE */}

                <Link
                  to={`/blog/${latestBlog.id}`}
                  className="read-more"
                >
                  Read More →
                </Link>

              </div>

            </article>

          </div>
        ) : (
          <div className="blog-empty">
            <p>No blog posts available yet.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Blog;