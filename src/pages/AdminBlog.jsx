import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlog.css";

const AdminBlog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const [coverImage, setCoverImage] = useState("");
  const [contentImages, setContentImages] = useState([]);

  const [editingId, setEditingId] = useState(null);

  // Protect the admin page
  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("kslAdminLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }

    loadBlogs();
  }, [navigate]);

  // Load blogs from localStorage
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

  // Save blogs to localStorage
  const saveBlogs = (updatedBlogs) => {
    localStorage.setItem(
      "kslBlogs",
      JSON.stringify(updatedBlogs)
    );

    setBlogs(updatedBlogs);
  };

  // Convert uploaded image to Base64
  const convertImageToBase64 = (file, callback) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Handle cover image
  const handleCoverImage = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    convertImageToBase64(file, (imageData) => {
      setCoverImage(imageData);
    });
  };

  // Handle multiple content images
  const handleContentImages = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) {
      return;
    }

    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        convertImageToBase64(file, (imageData) => {
          resolve(imageData);
        });
      });
    });

    Promise.all(imagePromises).then((images) => {
      setContentImages((previousImages) => [
        ...previousImages,
        ...images,
      ]);
    });
  };

  // Remove one content image
  const removeContentImage = (indexToRemove) => {
    setContentImages((previousImages) =>
      previousImages.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setCoverImage("");
    setContentImages([]);
    setEditingId(null);

    const coverInput =
      document.getElementById("cover-image");

    const contentInput =
      document.getElementById("content-images");

    if (coverInput) {
      coverInput.value = "";
    }

    if (contentInput) {
      contentInput.value = "";
    }
  };

  // Create or update blog
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (!content.trim()) {
      alert("Please enter the blog content.");
      return;
    }

    if (!coverImage) {
      alert("Please select a cover image.");
      return;
    }

    const now = new Date();

    const publishedAt = now.toISOString();

    const formattedDate = now.toLocaleDateString(
      "en-KE",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const formattedTime = now.toLocaleTimeString(
      "en-KE",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    // EDIT EXISTING BLOG
    if (editingId !== null) {
      const updatedBlogs = blogs.map((blog) => {
        if (blog.id !== editingId) {
          return blog;
        }

        return {
          ...blog,
          title: title.trim(),
          author: author.trim() || "KSL Team",
          content: content.trim(),
          coverImage,
          contentImages,
        };
      });

      saveBlogs(updatedBlogs);

      alert("Blog post updated successfully.");

      resetForm();

      return;
    }

    // CREATE NEW BLOG
    const newBlog = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim() || "KSL Team",
      content: content.trim(),
      coverImage,
      contentImages,
      publishedAt,
      date: formattedDate,
      time: formattedTime,
    };

    const updatedBlogs = [
      newBlog,
      ...blogs,
    ];

    saveBlogs(updatedBlogs);

    alert("Blog post published successfully.");

    resetForm();
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingId(blog.id);

    setTitle(blog.title || "");
    setAuthor(blog.author || "");
    setContent(blog.content || "");
    setCoverImage(blog.coverImage || "");
    setContentImages(blog.contentImages || []);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete blog
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) {
      return;
    }

    const updatedBlogs = blogs.filter(
      (blog) => blog.id !== id
    );

    saveBlogs(updatedBlogs);

    // If we were editing this post, reset the form
    if (editingId === id) {
      resetForm();
    }

    alert("Blog post deleted successfully.");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("kslAdminLoggedIn");

    navigate("/admin/login");
  };

  return (
    <div className="admin-blog-page">

      {/* HEADER */}
      <header className="admin-blog-header">
        <div>
          <span className="admin-label">
            KSL ADMIN
          </span>

          <h1>
            Blog
            <strong> Dashboard</strong>
          </h1>

          <p>
            Create and manage Kenyan Sign Language
            articles.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="admin-view-button"
          >
            View Blog
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="admin-logout-button"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="admin-blog-container">

        {/* CREATE / EDIT FORM */}
        <section className="admin-blog-form-section">

          <div className="admin-section-heading">
            <span>
              {editingId !== null
                ? "EDIT ARTICLE"
                : "NEW ARTICLE"}
            </span>

            <h2>
              {editingId !== null
                ? "Edit Blog Post"
                : "Create a Blog Post"}
            </h2>

            <p>
              {editingId !== null
                ? "Update the article information below."
                : "Add a new article to your KSL blog."}
            </p>
          </div>

          <form
            className="admin-blog-form"
            onSubmit={handleSubmit}
          >

            {/* TITLE */}
            <div className="admin-form-group">
              <label htmlFor="blog-title">
                Blog Title
              </label>

              <input
                id="blog-title"
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
              />
            </div>

            {/* AUTHOR */}
            <div className="admin-form-group">
              <label htmlFor="blog-author">
                Author
              </label>

              <input
                id="blog-author"
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(event) =>
                  setAuthor(event.target.value)
                }
              />
            </div>

            {/* COVER IMAGE */}
            <div className="admin-form-group">
              <label htmlFor="cover-image">
                Cover Image
              </label>

              <input
                id="cover-image"
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
              />

              <small>
                This image will appear at the top of
                the blog post.
              </small>
            </div>

            {/* COVER IMAGE PREVIEW */}
            {coverImage && (
              <div className="admin-cover-preview">
                <p>Cover Image Preview</p>

                <img
                  src={coverImage}
                  alt="Cover preview"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="admin-form-group">
              <label htmlFor="blog-content">
                Blog Content
              </label>

              <textarea
                id="blog-content"
                rows="12"
                placeholder="Write your blog article here..."
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
              />

              <small>
                Separate paragraphs by pressing Enter.
              </small>
            </div>

            {/* ARTICLE IMAGES */}
            <div className="admin-form-group">
              <label htmlFor="content-images">
                Article Images
              </label>

              <input
                id="content-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleContentImages}
              />

              <small>
                You can select multiple images.
              </small>
            </div>

            {/* ARTICLE IMAGE PREVIEWS */}
            {contentImages.length > 0 && (
              <div className="admin-content-images">

                <p>
                  Article Images
                </p>

                <div className="admin-image-grid">

                  {contentImages.map(
                    (image, index) => (
                      <div
                        className="admin-image-preview"
                        key={index}
                      >
                        <img
                          src={image}
                          alt={`Article ${index + 1}`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeContentImage(index)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    )
                  )}

                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="admin-form-buttons">

              <button
                type="submit"
                className="admin-publish-button"
              >
                {editingId !== null
                  ? "Update Blog Post"
                  : "Publish Blog Post"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>
        </section>

        {/* PUBLISHED BLOGS */}
        <section className="admin-published-section">

          <div className="admin-section-heading">
            <span>
              PUBLISHED ARTICLES
            </span>

            <h2>
              Your Blog Posts
            </h2>

            <p>
              Manage articles that are currently
              stored on this website.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="admin-no-blogs">
              <h3>
                No Blog Posts Yet
              </h3>

              <p>
                Create your first article using
                the form above.
              </p>
            </div>
          ) : (
            <div className="admin-blog-list">

              {blogs.map((blog) => (
                <article
                  className="admin-blog-card"
                  key={blog.id}
                >

                  {/* IMAGE */}
                  <div className="admin-blog-card-image">

                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                      />
                    ) : (
                      <div className="admin-no-image">
                        No Image
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="admin-blog-card-content">

                    <div className="admin-blog-card-meta">

                      <span>
                        {blog.date}
                      </span>

                      <span>
                        {blog.time}
                      </span>

                    </div>

                    <h3>
                      {blog.title}
                    </h3>

                    <p className="admin-blog-author">
                      By{" "}
                      <strong>
                        {blog.author || "KSL Team"}
                      </strong>
                    </p>

                    <p className="admin-blog-preview">
                      {blog.content &&
                      blog.content.length > 180
                        ? `${blog.content.substring(
                            0,
                            180
                          )}...`
                        : blog.content}
                    </p>

                    {/* ACTIONS */}
                    <div className="admin-card-actions">

                      <button
                        type="button"
                        className="admin-edit-button"
                        onClick={() =>
                          handleEdit(blog)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="admin-delete-button"
                        onClick={() =>
                          handleDelete(blog.id)
                        }
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        className="admin-read-button"
                        onClick={() =>
                          navigate(
                            `/blog/${blog.id}`
                          )
                        }
                      >
                        Read
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </main>

    </div>
  );
};

export default AdminBlog;