import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlog.css";

const API_URL = "http://localhost:5000/api/blogs";
const SERVER_URL = "http://localhost:5000";

function AdminBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [contentImages, setContentImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const logoutAndRedirect = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("kslAdminLoggedIn");
      localStorage.removeItem("kslAdmin");
      navigate("/admin/login");
    }
  };

  const getAuthOptions = () => ({ credentials: "include" });

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:image")) {
      return image;
    }
    return `${SERVER_URL}${image}`;
  };

  const loadBlogs = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to load articles");
      setBlogs(await response.json());
    } catch (error) {
      console.error("Load blogs error:", error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("kslAdminLoggedIn");
    if (loggedIn !== "true") {
      navigate("/admin/login");
      return;
    }
    loadBlogs();
  }, [navigate]);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Cover image must be 5MB or smaller.");
      return;
    }

    setErrorMessage("");
    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const handleContentImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
      file.size <= 5 * 1024 * 1024
    );

    if (validImages.length !== files.length) {
      setErrorMessage("Only JPG, PNG and WEBP images up to 5MB each are allowed.");
      return;
    }

    if (contentImages.length + validImages.length > 10) {
      setErrorMessage("You can upload a maximum of 10 article images.");
      return;
    }

    setErrorMessage("");
    setContentImages((previousImages) => [...previousImages, ...validImages]);
  };

  const removeContentImage = (index) => {
    setContentImages((previousImages) =>
      previousImages.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setCoverImageFile(null);
    setCoverImagePreview("");
    setContentImages([]);
    setEditingId(null);
    setErrorMessage("");

    const coverInput = document.getElementById("coverImage");
    if (coverInput) coverInput.value = "";

    const articleInput = document.getElementById("articleImages");
    if (articleInput) articleInput.value = "";
  };

  const submitBlog = async (method, url) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    if (coverImageFile) formData.append("cover_image", coverImageFile);
    contentImages.forEach((file) => formData.append("article_images", file));

    const response = await fetch(url, {
      method,
      credentials: "include",
      body: formData,
    });

    if (response.status === 401) {
      await logoutAndRedirect();
      return;
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to save article");

    await loadBlogs();
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!title.trim()) return setErrorMessage("Please enter an article title.");
    if (!author.trim()) return setErrorMessage("Please enter the author name.");
    if (!content.trim()) return setErrorMessage("Please enter the article content.");

    try {
      setLoading(true);
      if (editingId !== null && editingId !== undefined) {
        await submitBlog("PUT", `${API_URL}/${editingId}`);
      } else {
        await submitBlog("POST", API_URL);
      }
    } catch (error) {
      console.error("Save blog error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    if (!blog || blog.id === null || blog.id === undefined) return;
    setEditingId(blog.id);
    setTitle(blog.title || "");
    setAuthor(blog.author || "");
    setContent(blog.content || "");
    setCoverImageFile(null);
    setCoverImagePreview(blog.cover_image ? getImageUrl(blog.cover_image) : "");
    setContentImages([]);
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (id === null || id === undefined) return;
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.status === 401) {
        await logoutAndRedirect();
        return;
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete article");

      setBlogs((previousBlogs) => previousBlogs.filter((blog) => blog.id !== id));
      if (editingId === id) resetForm();
    } catch (error) {
      console.error("Delete blog error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }) : "";

  const formatTime = (date) =>
    date ? new Date(date).toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="brand-icon">KSL</div>
          <div><h2>KSL Admin</h2><span>Content Center</span></div>
        </div>

        <nav className="admin-navigation">
          <button className="admin-nav-item active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span>▦</span>Dashboard</button>
          <button className="admin-nav-item" onClick={() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" })}><span>▤</span>Articles</button>
          <button className="admin-nav-item" onClick={() => document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" })}><span>＋</span>Add Article</button>
          <button className="admin-nav-item" onClick={() => navigate("/blog")}><span>↗</span>View Website</button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">A</div>
            <div><strong>Administrator</strong><span>Content Manager</span></div>
          </div>
          <button className="sidebar-logout" onClick={logoutAndRedirect}>⇥ Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div><p className="breadcrumb">Dashboard / Content</p><h1>Content Management</h1></div>
          <div className="topbar-right">
            <button className="website-button" onClick={() => navigate("/blog")}>View Website ↗</button>
            <div className="top-admin"><div className="top-avatar">A</div><div><strong>Admin</strong><span>Online</span></div></div>
          </div>
        </header>

        {errorMessage && <div className="admin-error"><strong>Error:</strong><span>{errorMessage}</span></div>}

        <section className="welcome-section">
          <div><span className="welcome-label">KSL CONTENT CENTER</span><h2>Welcome back, Admin</h2><p>Manage articles, images and educational content for the Kenyan Sign Language platform.</p></div>
          <button className="primary-action" onClick={() => document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" })}>+ Create Article</button>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><div className="stat-icon purple">▤</div><div><span>Total Articles</span><strong>{blogs.length}</strong><small>Published articles</small></div></div>
          <div className="stat-card"><div className="stat-icon green">✓</div><div><span>Publishing Status</span><strong>Live</strong><small>Your blog is active</small></div></div>
          <div className="stat-card"><div className="stat-icon orange">◷</div><div><span>Latest Article</span><strong>{blogs.length ? formatDate(blogs[0].published_at) : "None"}</strong><small>{blogs.length ? formatTime(blogs[0].published_at) : "No articles yet"}</small></div></div>
        </section>

        <section id="editor" className="editor-section">
          <div className="section-heading"><div><span className="section-label">CONTENT EDITOR</span><h2>{editingId !== null ? "Edit Article" : "Create New Article"}</h2><p>{editingId !== null ? "Update your existing article." : "Create and publish a new KSL article."}</p></div>{editingId !== null && <button className="cancel-button" onClick={resetForm}>Cancel Editing</button>}</div>

          <form className="article-form" onSubmit={handleSubmit}>
            <div className="form-column">
              <div className="input-group"><label htmlFor="title">Article Title</label><input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a clear article title" maxLength="180" /></div>
              <div className="input-group"><label htmlFor="author">Author</label><input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter author name" maxLength="100" /></div>
              <div className="input-group"><div className="label-row"><label htmlFor="content">Article Content</label><span>Write your article below</span></div><textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Start writing your article..." rows="15" maxLength="50000" /></div>
            </div>

            <div className="media-column">
              <div className="upload-card">
                <div className="upload-heading"><div><h3>Cover Image</h3><p>Main image for the article</p></div><span className="required">Required</span></div>
                <label htmlFor="coverImage" className="upload-area">{coverImagePreview ? <div className="cover-preview"><img src={coverImagePreview} alt="Cover preview" /><div className="image-overlay">Change Image</div></div> : <><div className="upload-icon">↑</div><strong>Upload cover image</strong><span>PNG, JPG or WEBP</span></>}</label>
                <input id="coverImage" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleCoverImageChange} hidden />
              </div>

              <div className="upload-card">
                <div className="upload-heading"><div><h3>Article Images</h3><p>Add images inside your article</p></div><span className="optional">Optional</span></div>
                <label htmlFor="articleImages" className="small-upload-area"><div className="upload-icon small">+</div><strong>Add article images</strong><span>You can select multiple images</span></label>
                <input id="articleImages" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleContentImagesChange} hidden />
                {contentImages.length > 0 && <div className="image-preview-grid">{contentImages.map((file, index) => <div className="preview-item" key={`${file.name}-${index}`}><img src={URL.createObjectURL(file)} alt={`Article ${index + 1}`} /><button type="button" onClick={() => removeContentImage(index)}>×</button></div>)}</div>}
              </div>

              <div className="form-actions">
                <button type="submit" className="publish-button" disabled={loading}>{loading ? "Processing..." : editingId !== null ? "Update Article" : "Publish Article"}</button>
                {editingId !== null && <button type="button" className="secondary-button" onClick={resetForm} disabled={loading}>Cancel</button>}
              </div>
            </div>
          </form>
        </section>

        <section id="articles" className="articles-section">
          <div className="section-heading"><div><span className="section-label">CONTENT LIBRARY</span><h2>Published Articles</h2><p>Manage all articles currently available on your website.</p></div><div className="article-count">{blogs.length} Articles</div></div>

          {blogs.length === 0 ? <div className="empty-state"><div>+</div><h3>No articles yet</h3><p>Create your first KSL article to get started.</p></div> : <div className="article-table">
            <div className="table-header"><span>ARTICLE</span><span>AUTHOR</span><span>PUBLISHED</span><span>STATUS</span><span>ACTIONS</span></div>
            {blogs.map((blog) => <div className="article-row" key={blog.id}>
              <div className="article-info"><div className="article-thumbnail">{blog.cover_image ? <img src={getImageUrl(blog.cover_image)} alt={blog.title} /> : <span>KSL</span>}</div><div><h3>{blog.title}</h3><p>Article #{blog.id}</p></div></div>
              <div className="author-column">{blog.author}</div>
              <div className="date-column"><strong>{formatDate(blog.published_at)}</strong><span>{formatTime(blog.published_at)}</span></div>
              <div><span className="status-badge">● Published</span></div>
              <div className="row-actions"><button className="edit-action" onClick={() => handleEdit(blog)}>Edit</button><button className="read-action" onClick={() => navigate(`/blog/${blog.id}`)}>View</button><button className="delete-action" onClick={() => handleDelete(blog.id)}>Delete</button></div>
            </div>)}
          </div>}
        </section>
      </main>
    </div>
  );
}

export default AdminBlog;
