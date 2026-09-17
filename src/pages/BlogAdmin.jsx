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

  /* =========================
     CHECK LOGIN + LOAD BLOGS
  ========================= */

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("kslAdminLoggedIn");

    if (loggedIn !== "true") {
      navigate("/admin/login");
      return;
    }

    const savedBlogs =
      JSON.parse(localStorage.getItem("kslBlogs")) || [];

    setBlogs(savedBlogs);
  }, [navigate]);


  /* =========================
     COVER IMAGE
  ========================= */

  const handleCoverImage = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImage(reader.result);
    };

    reader.readAsDataURL(file);
  };


  /* =========================
     ARTICLE IMAGES
  ========================= */

  const handleContentImages = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setContentImages((previousImages) => [
          ...previousImages,
          reader.result,
        ]);
      };

      reader.readAsDataURL(file);
    });
  };


  /* =========================
     PUBLISH / UPDATE BLOG
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (!content.trim()) {
      alert("Please write your blog content.");
      return;
    }

    if (!coverImage) {
      alert("Please select a cover image.");
      return;
    }


    /* =========================
       UPDATE EXISTING BLOG
    ========================= */

    if (editingId) {

      const updatedBlogs = blogs.map((blog) => {

        if (blog.id === editingId) {
          return {
            ...blog,

            title: title.trim(),
            author: author.trim(),
            content: content.trim(),
            coverImage: coverImage,
            contentImages: contentImages,
          };
        }

        return blog;
      });


      localStorage.setItem(
        "kslBlogs",
        JSON.stringify(updatedBlogs)
      );

      setBlogs(updatedBlogs);

      alert("Blog updated successfully!");

      resetForm();

      return;
    }


    /* =========================
       CREATE NEW BLOG
    ========================= */

    const now = new Date();

    const newBlog = {
      id: Date.now(),

      title: title.trim(),

      author: author.trim(),

      content: content.trim(),

      coverImage: coverImage,

      contentImages: contentImages,

      publishedAt: now.toISOString(),

      date: now.toLocaleDateString("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),

      time: now.toLocaleTimeString("en-KE", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };


    const updatedBlogs = [
      newBlog,
      ...blogs,
    ];


    localStorage.setItem(
      "kslBlogs",
      JSON.stringify(updatedBlogs)
    );

    setBlogs(updatedBlogs);

    alert("Blog published successfully!");

    resetForm();
  };


  /* =========================
     RESET FORM
  ========================= */

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


  /* =========================
     EDIT BLOG
  ========================= */

  const handleEdit = (blog) => {

    setEditingId(blog.id);

    setTitle(blog.title);

    setAuthor(blog.author || "");

    setContent(blog.content);

    setCoverImage(blog.coverImage);

    setContentImages(
      blog.contentImages || []
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =========================
     DELETE BLOG
  ========================= */

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedBlogs = blogs.filter(
      (blog) => blog.id !== id
    );

    localStorage.setItem(
      "kslBlogs",
      JSON.stringify(updatedBlogs)
    );

    setBlogs(updatedBlogs);

    alert("Blog deleted successfully.");
  };


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "kslAdminLoggedIn"
    );

    navigate("/admin/login");
  };


  return (
    <div className="admin-blog-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="admin-blog-header">

        <div>

          <span>ADMIN DASHBOARD</span>

          <h1>
            Blog
            <strong> Management</strong>
          </h1>

          <p>
            Create and manage your Kenyan Sign Language
            articles.
          </p>

        </div>


        <button
          className="admin-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="admin-blog-container">


        {/* =========================
            CREATE / EDIT BLOG
        ========================= */}

        <section className="admin-create-section">

          <div className="admin-section-heading">

            <span>
              {editingId
                ? "EDIT ARTICLE"
                : "CREATE ARTICLE"}
            </span>

            <h2>

              {editingId
                ? "Edit Your"
                : "Create a New"}

              <strong>
                {" "}Blog Post
              </strong>

            </h2>

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
                placeholder="Enter your blog title"
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


              {coverImage && (

                <div className="admin-cover-preview">

                  <img
                    src={coverImage}
                    alt="Cover preview"
                  />

                </div>

              )}

            </div>


            {/* CONTENT */}

            <div className="admin-form-group">

              <label htmlFor="blog-content">
                Blog Content
              </label>

              <textarea
                id="blog-content"
                rows="12"
                placeholder="Write your article here..."
                value={content}
                onChange={(event) =>
                  setContent(event.target.value)
                }
              />

            </div>


            {/* ARTICLE IMAGES */}

            <div className="admin-form-group">

              <label htmlFor="content-images">
                Add Images To Article
              </label>

              <input
                id="content-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleContentImages}
              />


              {contentImages.length > 0 && (

                <div className="admin-images-preview">

                  {contentImages.map(
                    (image, index) => (

                      <img
                        key={index}
                        src={image}
                        alt={`Article ${index + 1}`}
                      />

                    )
                  )}

                </div>

              )}

            </div>


            {/* BUTTONS */}

            <div className="admin-form-buttons">

              <button
                type="submit"
                className="admin-publish-button"
              >
                {editingId
                  ? "Save Changes"
                  : "Publish Blog"}
              </button>


              {editingId && (

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


        {/* =========================
            PUBLISHED BLOGS
        ========================= */}

        <section className="admin-existing-section">

          <div className="admin-section-heading">

            <span>
              YOUR ARTICLES
            </span>

            <h2>
              Published
              <strong> Blogs</strong>
            </h2>

          </div>


          {blogs.length === 0 ? (

            <div className="no-blogs">

              <p>
                You have not published any blogs yet.
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

                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                    />

                  </div>


                  {/* CONTENT */}

                  <div className="admin-blog-card-content">

                    <span>
                      {blog.date}
                    </span>

                    <span>
                      {blog.time}
                    </span>


                    <h3>
                      {blog.title}
                    </h3>


                    <p>
                      By {blog.author || "Author"}
                    </p>


                    <div className="admin-card-buttons">

                      <button
                        className="edit-blog-button"
                        onClick={() =>
                          handleEdit(blog)
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="delete-blog-button"
                        onClick={() =>
                          handleDelete(blog.id)
                        }
                      >
                        Delete
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