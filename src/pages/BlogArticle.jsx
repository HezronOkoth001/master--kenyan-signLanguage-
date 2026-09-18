import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BlogArticle.css";

const API_URL = "http://localhost:5000/api/blogs";
const SERVER_URL = "http://localhost:5000";

const BlogArticle = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    // Old Base64 images
    if (imagePath.startsWith("data:")) {
      return imagePath;
    }

    // Full URL
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Multer uploaded images
    if (imagePath.startsWith("/uploads/")) {
      return `${SERVER_URL}${imagePath}`;
    }

    return imagePath;
  };

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        setBlog(null);

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Article not found.");
          }

          throw new Error(
            `Server returned status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Blog article:", data);

        setBlog(data);

      } catch (error) {
        console.error(
          "Error loading article:",
          error
        );

        setErrorMessage(
          error.message ||
            "Unable to load this article."
        );

      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  /* LOADING */

  if (loading) {
    return (
      <div className="article-not-found">
        <h1>Loading Article...</h1>

        <p>
          Please wait while we load the article.
        </p>
      </div>
    );
  }

  /* ARTICLE NOT FOUND */

  if (!blog) {
    return (
      <div className="article-not-found">

        <h1>Article Not Found</h1>

        <p>
          {errorMessage ||
            "The article you are looking for does not exist."}
        </p>

        <Link to="/blog">
          ← Back to Blog
        </Link>

      </div>
    );
  }

  /* DATE */

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

  /* TIME */

  const formatTime = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString("en-KE", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <article className="blog-article">

      {/* HEADER */}

      <header className="article-header">

        <Link
          to="/blog"
          className="back-to-blog"
        >
          ← Back to Blog
        </Link>

        <span className="article-label">
          KSL BLOG
        </span>

        <h1>
          {blog.title}
        </h1>

        <div className="article-meta">

          {blog.published_at && (
            <>
              <span>
                {formatDate(blog.published_at)}
              </span>

              <span>
                {formatTime(blog.published_at)}
              </span>
            </>
          )}

          <span>
            By {blog.author || "KSL Team"}
          </span>

        </div>

      </header>

      {/* COVER IMAGE */}

      {blog.cover_image && (
        <div className="article-cover">

          <img
            src={getImageUrl(blog.cover_image)}
            alt={blog.title}
          />

        </div>
      )}

      {/* ARTICLE CONTENT */}

      <div className="article-content">

        {blog.content
          ? blog.content
              .split("\n")
              .filter(
                (paragraph) =>
                  paragraph.trim() !== ""
              )
              .map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))
          : (
            <p>
              No article content available.
            </p>
          )}

      </div>

      {/* ADDITIONAL ARTICLE IMAGES */}

      {blog.article_images &&
        blog.article_images.length > 0 && (

          <div className="article-images">

            {blog.article_images.map(
              (image, index) => (

                <img
                  key={image.id || index}
                  src={getImageUrl(image.image_path)}
                  alt={`${blog.title} ${index + 1}`}
                />

              )
            )}

          </div>

        )}

      {/* BOTTOM */}

      <div className="article-bottom">

        <Link
          to="/blog"
          className="back-button"
        >
          ← Back to All Articles
        </Link>

      </div>

    </article>
  );
};

export default BlogArticle;