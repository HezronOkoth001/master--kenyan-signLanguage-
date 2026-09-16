import { useState } from "react";
import "./BlogAdmin.css";

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [contentImages, setContentImages] = useState([]);

  const handleCoverImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !content || !coverImage) {
      alert("Please add a title, content, and cover image.");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      author,
      content,
      coverImage,
      contentImages,
      date: new Date().toLocaleDateString(),
    };

    const existingBlogs =
      JSON.parse(localStorage.getItem("kslBlogs")) || [];

    localStorage.setItem(
      "kslBlogs",
      JSON.stringify([...existingBlogs, newBlog])
    );

    alert("Blog published successfully!");

    setTitle("");
    setAuthor("");
    setContent("");
    setCoverImage(null);
    setContentImages([]);

    document.getElementById("cover-image").value = "";
    document.getElementById("content-images").value = "";
  };

  return (
    <section className="blog-admin">
      <div className="blog-admin-container">

        <div className="admin-heading">
          <span>BLOG ADMIN</span>

          <h1>
            Create a New
            <strong> Blog Post</strong>
          </h1>

          <p>
            Create articles, add pictures, and publish your
            Kenyan Sign Language content.
          </p>
        </div>

        <form
          className="blog-editor"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="title">
              Blog Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">
              Author
            </label>

            <input
              id="author"
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(event) =>
                setAuthor(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>
              Cover Image
            </label>

            <input
              id="cover-image"
              type="file"
              accept="image/*"
              onChange={handleCoverImage}
            />

            {coverImage && (
              <div className="image-preview">
                <img
                  src={coverImage}
                  alt="Cover preview"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content">
              Blog Content
            </label>

            <textarea
              id="content"
              rows="12"
              placeholder="Write your blog article here..."
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>
              Add Pictures To Your Blog
            </label>

            <input
              id="content-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleContentImages}
            />

            {contentImages.length > 0 && (
              <div className="content-images-preview">

                {contentImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Blog image ${index + 1}`}
                  />
                ))}

              </div>
            )}
          </div>

          <button
            type="submit"
            className="publish-button"
          >
            Publish Blog
          </button>

        </form>
      </div>
    </section>
  );
};

export default BlogAdmin;