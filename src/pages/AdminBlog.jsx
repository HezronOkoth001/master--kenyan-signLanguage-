import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlog.css";

const API_URL = "http://localhost:5000/api/blogs";
const SERVER_URL = "http://localhost:5000";

const AdminBlog = () => {
  const navigate = useNavigate();

  // ==============================
  // STATE
  // ==============================

  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // Cover image
  const [coverImageFile, setCoverImageFile] =
    useState(null);

  const [coverImagePreview, setCoverImagePreview] =
    useState("");

  // Optional article images
  const [contentImages, setContentImages] =
    useState([]);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");


  // ==============================
  // IMAGE URL HELPER
  // ==============================

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "";
    }

    // Old Base64 images
    if (imagePath.startsWith("data:")) {
      return imagePath;
    }

    // Full URL
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Backend image
    if (imagePath.startsWith("/uploads/")) {
      return `${SERVER_URL}${imagePath}`;
    }

    return imagePath;
  };


  // ==============================
  // LOAD BLOGS
  // ==============================

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

      if (!Array.isArray(data)) {
        throw new Error(
          "The server returned invalid blog data."
        );
      }

      setBlogs(data);

    } catch (error) {
      console.error(
        "Error loading blogs:",
        error
      );

      setBlogs([]);

      setErrorMessage(
        `Could not load blogs: ${error.message}`
      );

    } finally {
      setLoading(false);
    }
  };


  // ==============================
  // PROTECT ADMIN PAGE
  // ==============================

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem(
        "kslAdminLoggedIn"
      ) === "true";

    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }

    loadBlogs();
  }, [navigate]);


  // ==============================
  // COVER IMAGE
  // ==============================

  const handleCoverImage = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setCoverImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setCoverImagePreview(previewUrl);
  };


  // ==============================
  // ARTICLE IMAGES
  // OPTIONAL + MULTIPLE
  // ==============================

  const handleContentImages = (event) => {
    const files = Array.from(
      event.target.files
    );

    if (files.length === 0) {
      return;
    }

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== files.length) {
      alert(
        "Only image files can be selected."
      );
    }

    const newImages = imageFiles.map(
      (file) => ({
        file: file,
        preview:
          URL.createObjectURL(file),
      })
    );

    setContentImages(
      (previousImages) => [
        ...previousImages,
        ...newImages,
      ]
    );

    // Allow selecting the same file again
    event.target.value = "";
  };


  // ==============================
  // REMOVE ARTICLE IMAGE
  // ==============================

  const removeContentImage = (
    indexToRemove
  ) => {
    setContentImages(
      (previousImages) => {

        const imageToRemove =
          previousImages[indexToRemove];

        if (imageToRemove?.preview) {
          URL.revokeObjectURL(
            imageToRemove.preview
          );
        }

        return previousImages.filter(
          (_, index) =>
            index !== indexToRemove
        );
      }
    );
  };


  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {

    if (coverImagePreview) {
      if (
        coverImagePreview.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          coverImagePreview
        );
      }
    }

    contentImages.forEach((image) => {
      if (image.preview) {
        URL.revokeObjectURL(
          image.preview
        );
      }
    });

    setTitle("");
    setAuthor("");
    setContent("");

    setCoverImageFile(null);
    setCoverImagePreview("");

    setContentImages([]);

    setEditingId(null);
    setErrorMessage("");

    const coverInput =
      document.getElementById(
        "cover-image"
      );

    const contentInput =
      document.getElementById(
        "content-images"
      );

    if (coverInput) {
      coverInput.value = "";
    }

    if (contentInput) {
      contentInput.value = "";
    }
  };


  // ==============================
  // CREATE BLOG
  // ==============================

  const createBlog = async () => {

    try {

      setLoading(true);
      setErrorMessage("");

      const formData = new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "author",
        author.trim()
      );

      formData.append(
        "content",
        content.trim()
      );


      // Cover image
      if (coverImageFile) {

        formData.append(
          "cover_image",
          coverImageFile
        );
      }


      // Optional article images
      contentImages.forEach(
        (image) => {

          formData.append(
            "article_images",
            image.file
          );

        }
      );


      const response = await fetch(
        API_URL,
        {
          method: "POST",
          body: formData,
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
            "Failed to create blog post."
        );
      }


      console.log(
        "Blog created:",
        data
      );


      alert(
        "Blog post published successfully."
      );


      resetForm();

      await loadBlogs();


    } catch (error) {

      console.error(
        "Create blog error:",
        error
      );

      setErrorMessage(
        error.message
      );

      alert(error.message);


    } finally {

      setLoading(false);
    }
  };


  // ==============================
  // UPDATE BLOG
  // ==============================

  const updateBlog = async () => {

    try {

      setLoading(true);
      setErrorMessage("");

      const formData =
        new FormData();


      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "author",
        author.trim()
      );

      formData.append(
        "content",
        content.trim()
      );


      // New cover image only
      if (coverImageFile) {

        formData.append(
          "cover_image",
          coverImageFile
        );
      }


      // Optional new article images
      contentImages.forEach(
        (image) => {

          // Only upload actual files
          if (image.file) {

            formData.append(
              "article_images",
              image.file
            );
          }

        }
      );


      const response =
        await fetch(
          `${API_URL}/${editingId}`,
          {
            method: "PUT",
            body: formData,
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
            "Failed to update blog post."
        );
      }


      console.log(
        "Blog updated:",
        data
      );


      alert(
        "Blog post updated successfully."
      );


      resetForm();

      await loadBlogs();


    } catch (error) {

      console.error(
        "Update blog error:",
        error
      );

      setErrorMessage(
        error.message
      );

      alert(error.message);


    } finally {

      setLoading(false);
    }
  };


  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();


    if (!title.trim()) {

      alert(
        "Please enter a blog title."
      );

      return;
    }


    if (!author.trim()) {

      alert(
        "Please enter the author name."
      );

      return;
    }


    if (!content.trim()) {

      alert(
        "Please enter the blog content."
      );

      return;
    }


    // Cover image required only
    // for new articles
    if (
      editingId === null &&
      !coverImageFile
    ) {

      alert(
        "Please select a cover image."
      );

      return;
    }


    if (editingId !== null) {

      await updateBlog();

    } else {

      await createBlog();
    }
  };


  // ==============================
  // EDIT BLOG
  // ==============================

  const handleEdit = (blog) => {

    setEditingId(blog.id);

    setTitle(
      blog.title || ""
    );

    setAuthor(
      blog.author || ""
    );

    setContent(
      blog.content || ""
    );


    setCoverImageFile(null);

    setCoverImagePreview(
      getImageUrl(
        blog.cover_image
      )
    );


    // Existing article images are
    // not loaded into the upload
    // selection yet.
    setContentImages([]);


    setErrorMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ==============================
  // DELETE BLOG
  // ==============================

  const handleDelete = async (
    id
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this blog post?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setLoading(true);
      setErrorMessage("");


      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
            "Failed to delete blog post."
        );
      }


      if (editingId === id) {
        resetForm();
      }


      alert(
        "Blog post deleted successfully."
      );


      await loadBlogs();


    } catch (error) {

      console.error(
        "Delete blog error:",
        error
      );

      setErrorMessage(
        error.message
      );

      alert(error.message);


    } finally {

      setLoading(false);
    }
  };


  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {

    localStorage.removeItem(
      "kslAdminLoggedIn"
    );

    navigate("/admin/login");
  };


  // ==============================
  // FORMAT DATE
  // ==============================

  const formatDate = (
    dateValue
  ) => {

    if (!dateValue) {
      return "";
    }

    const date =
      new Date(dateValue);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleDateString(
      "en-KE",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };


  // ==============================
  // FORMAT TIME
  // ==============================

  const formatTime = (
    dateValue
  ) => {

    if (!dateValue) {
      return "";
    }

    const date =
      new Date(dateValue);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleTimeString(
      "en-KE",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  // ==============================
  // PAGE
  // ==============================

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
            <strong>
              {" "}Dashboard
            </strong>
          </h1>

          <p>
            Create and manage Kenyan
            Sign Language articles.
          </p>

        </div>


        <div className="admin-header-actions">

          <button
            type="button"
            onClick={() =>
              navigate("/blog")
            }
            className="admin-view-button"
          >
            View Blog
          </button>


          <button
            type="button"
            onClick={
              handleLogout
            }
            className="admin-logout-button"
          >
            Logout
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="admin-blog-container">

        {/* CREATE / EDIT */}

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
            onSubmit={
              handleSubmit
            }
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
                onChange={(
                  event
                ) =>
                  setTitle(
                    event.target.value
                  )
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
                onChange={(
                  event
                ) =>
                  setAuthor(
                    event.target.value
                  )
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
                onChange={
                  handleCoverImage
                }
              />

              <small>
                Required for new articles.
              </small>

            </div>


            {/* COVER PREVIEW */}

            {coverImagePreview && (

              <div className="admin-cover-preview">

                <p>
                  Cover Image Preview
                </p>

                <img
                  src={
                    coverImagePreview
                  }
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
                onChange={(
                  event
                ) =>
                  setContent(
                    event.target.value
                  )
                }
              />

              <small>
                Separate paragraphs by
                pressing Enter.
              </small>

            </div>


            {/* OPTIONAL ARTICLE IMAGES */}

            <div className="admin-form-group">

              <label htmlFor="content-images">
                Article Images
                <span>
                  {" "}(Optional)
                </span>
              </label>

              <input
                id="content-images"
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleContentImages
                }
              />

              <small>
                Optional. You can add
                multiple images or leave
                this empty.
              </small>

            </div>


            {/* ARTICLE IMAGE PREVIEWS */}

            {contentImages.length >
              0 && (

              <div className="admin-content-images">

                <p>
                  Selected Article Images (
                  {contentImages.length}
                  )
                </p>

                <div className="admin-image-grid">

                  {contentImages.map(
                    (
                      image,
                      index
                    ) => (

                      <div
                        className="admin-image-preview"
                        key={`${image.preview}-${index}`}
                      >

                        <img
                          src={
                            image.preview
                          }
                          alt={`Article ${
                            index + 1
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeContentImage(
                              index
                            )
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


            {/* ERROR */}

            {errorMessage && (

              <div className="admin-api-error">
                {errorMessage}
              </div>

            )}


            {/* BUTTONS */}

            <div className="admin-form-buttons">

              <button
                type="submit"
                className="admin-publish-button"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : editingId !== null
                  ? "Update Blog Post"
                  : "Publish Blog Post"}
              </button>


              {editingId !== null && (

                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={
                    resetForm
                  }
                  disabled={loading}
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
              Manage articles that are
              currently stored on this
              website.
            </p>

          </div>


          {loading &&
          blogs.length === 0 ? (

            <div className="admin-no-blogs">

              <h3>
                Loading Blog Posts...
              </h3>

              <p>
                Connecting to the
                database.
              </p>

            </div>

          ) : blogs.length === 0 ? (

            <div className="admin-no-blogs">

              <h3>
                No Blog Posts Yet
              </h3>

              <p>
                {errorMessage
                  ? "There was a problem connecting to the backend."
                  : "Create your first article using the form above."}
              </p>

            </div>

          ) : (

            <div className="admin-blog-list">

              {blogs.map(
                (blog) => (

                  <article
                    className="admin-blog-card"
                    key={blog.id}
                  >

                    {/* IMAGE */}

                    <div className="admin-blog-card-image">

                      {blog.cover_image ? (

                        <img
                          src={getImageUrl(
                            blog.cover_image
                          )}
                          alt={
                            blog.title
                          }
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
                          {formatDate(
                            blog.published_at
                          )}
                        </span>

                        <span>
                          {formatTime(
                            blog.published_at
                          )}
                        </span>

                      </div>


                      <h3>
                        {blog.title}
                      </h3>


                      <p className="admin-blog-author">

                        By{" "}

                        <strong>
                          {blog.author ||
                            "KSL Team"}
                        </strong>

                      </p>


                      <p className="admin-blog-preview">

                        {blog.content &&
                        blog.content.length >
                          180
                          ? `${blog.content.substring(
                              0,
                              180
                            )}...`
                          : blog.content}

                      </p>


                      <div className="admin-card-actions">

                        <button
                          type="button"
                          className="admin-edit-button"
                          onClick={() =>
                            handleEdit(
                              blog
                            )
                          }
                          disabled={
                            loading
                          }
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          className="admin-delete-button"
                          onClick={() =>
                            handleDelete(
                              blog.id
                            )
                          }
                          disabled={
                            loading
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

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
};

export default AdminBlog;