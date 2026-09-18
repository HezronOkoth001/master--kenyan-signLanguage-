import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css";

const API_URL = "http://localhost:5000/api/blogs";
const SERVER_URL = "http://localhost:5000";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ========================================
  // CONVERT IMAGE PATH TO FULL URL
  // ========================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "";
    }

    // Old Base64 images
    if (imagePath.startsWith("data:")) {
      return imagePath;
    }

    // Already a complete URL
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // New Multer images
    if (imagePath.startsWith("/uploads/")) {
      return `${SERVER_URL}${imagePath}`;
    }

    return imagePath;
  };

  // ========================================
  // LOAD BLOGS
  // ========================================

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Server returned status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Public blog posts:", data);

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid blog data received from server."
          );
        }

        setBlogs(data);
      } catch (error) {
        console.error("Error loading blogs:", error);

        setErrorMessage(
          "Unable to load blog posts. Please try again later."
        );

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="blog-page">

      {/* ========================================
          HEADER
      ======================================== */}

      <section className="blog-page-header">

        <span>OUR BLOG</span>

        <h1>
          Learn More About
          <strong> Kenyan Sign Language</strong>
        </h1>

        <p>
          Explore articles, guides, tips, and useful
          information about Kenyan Sign Language
          and inclusive communication.
        </p>

      </section>


      {/* ========================================
          BLOG CONTENT
      ======================================== */}

      <section className="blog-page-content">

        {/* LOADING */}

        {loading && (
          <div className="no-blogs">

            <h2>
              Loading Blog Posts...
            </h2>

            <p>
              Please wait while we load the latest articles.
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && errorMessage && (
          <div className="no-blogs">

            <h2>
              Something Went Wrong
            </h2>

            <p>
              {errorMessage}
            </p>

          </div>
        )}


        {/* NO BLOGS */}

        {!loading &&
          !errorMessage &&
          blogs.length === 0 && (

            <div className="no-blogs">

              <h2>
                No Blog Posts Yet
              </h2>

              <p>
                New articles will appear here when
                they are published.
              </p>

            </div>
          )}


        {/* BLOG POSTS */}

        {!loading &&
          !errorMessage &&
          blogs.length > 0 && (

            <div className="blog-page-grid">

              {blogs.map((blog) => (

                <article
                  className="blog-page-card"
                  key={blog.id}
                >

                  {/* IMAGE */}

                  <div className="blog-page-image">

                    {blog.cover_image ? (

                      <img
                        src={getImageUrl(
                          blog.cover_image
                        )}
                        alt={blog.title}
                      />

                    ) : (

                      <div className="blog-page-no-image">
                        No Image
                      </div>

                    )}

                  </div>


                  {/* CONTENT */}

                  <div className="blog-page-card-content">

                    {blog.published_at && (
                      <span className="blog-page-date">
                        {formatDate(
                          blog.published_at
                        )}
                      </span>
                    )}


                    <h2>
                      {blog.title}
                    </h2>


                    <p className="blog-page-author">

                      By{" "}

                      <strong>
                        {blog.author || "KSL Team"}
                      </strong>

                    </p>


                    <p>

                      {blog.content &&
                      blog.content.length > 180

                        ? `${blog.content.substring(
                            0,
                            180
                          )}...`

                        : blog.content}

                    </p>


                    <Link
                      to={`/blog/${blog.id}`}
                      className="blog-read-button"
                    >
                      Read Article →
                    </Link>

                  </div>

                </article>

              ))}

            </div>
          )}

      </section>

    </div>
  );
};

export default BlogPage;