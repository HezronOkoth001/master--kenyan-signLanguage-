import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BlogArticle.css";

const BlogArticle = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const savedBlogs = localStorage.getItem("kslBlogs");

    if (!savedBlogs) {
      return;
    }

    try {
      const blogs = JSON.parse(savedBlogs);

      const selectedBlog = blogs.find(
        (item) => String(item.id) === String(id)
      );

      setBlog(selectedBlog || null);
    } catch (error) {
      console.error("Error loading article:", error);
    }
  }, [id]);

  /* ARTICLE NOT FOUND */

  if (!blog) {
    return (
      <div className="article-not-found">

        <h1>Article Not Found</h1>

        <p>
          The article you are looking for does not exist.
        </p>

        <Link to="/blog">
          ← Back to Blog
        </Link>

      </div>
    );
  }

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

          <span>
            {blog.date}
          </span>

          <span>
            {blog.time}
          </span>

        </div>

      </header>


      {/* COVER IMAGE */}

      {blog.coverImage && (
        <div className="article-cover">

          <img
            src={blog.coverImage}
            alt={blog.title}
          />

        </div>
      )}


      {/* ARTICLE CONTENT */}

      <div className="article-content">

        {blog.content
          .split("\n")
          .filter((paragraph) => paragraph.trim() !== "")
          .map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}

      </div>


      {/* ADDITIONAL IMAGES */}

      {blog.contentImages &&
        blog.contentImages.length > 0 && (

          <div className="article-images">

            {blog.contentImages.map(
              (image, index) => (

                <img
                  key={index}
                  src={image}
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