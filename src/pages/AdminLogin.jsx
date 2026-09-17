import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    // Temporary demo login
    if (
      email === "admin@ksl.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("kslAdminLoggedIn", "true");

      navigate("/admin/blog");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-heading">
          <span>ADMIN AREA</span>

          <h1>
            Welcome
            <strong> Back</strong>
          </h1>

          <p>
            Sign in to manage your Kenyan Sign Language blog.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="admin-form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;