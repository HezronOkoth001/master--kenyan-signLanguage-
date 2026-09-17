import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = () => {
      const savedBlogs = localStorage.getItem("kslBlogs");

      if (!savedBlogs) {
        setBlogs([]);
        return;
      }

      try {
        const parsedBlogs = JSON.parse(savedBlogs);

        const sortedBlogs = parsedBlogs.sort(
          (a, b) => b.id - a.id
        );

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="blog-page">

      {/* HEADER */}

      <section className="blog-page-header">

        <span>OUR BLOG</span>

        <h1>
          Learn More About
          <strong> Kenyan Sign Language</strong>
        </h1>

        <p>
          Explore articles, guides, tips, and useful information
          about Kenyan Sign Language and inclusive communication.
        </p>

      </section>


      {/* BLOGS */}

      <section className="blog-page-content">

        {blogs.length === 0 ? (

          <div className="no-blogs">

            <h2>No Blog Posts Yet</h2>

            <p>
              New articles will appear here when they are published.
            </p>

          </div>

        ) : (

          <div className="blog-page-grid">

            {blogs.map((blog) => (

              <article
                className="blog-page-card"
                key={blog.id}
              >

                {/* IMAGE */}

                <div className="blog-page-image">

                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                  />

                </div>


                {/* CONTENT */}

                <div className="blog-page-card-content">

                  <h2>
                    {blog.title}
                  </h2>

                  <p>
                    {blog.content.length > 180
                      ? `${blog.content.substring(0, 180)}...`
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