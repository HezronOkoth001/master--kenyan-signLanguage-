import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const API_URL = "http://localhost:5000/api/auth/login";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Incorrect email or password."
        );
      }

      // Save successful login
      localStorage.setItem(
        "kslAdminLoggedIn",
        "true"
      );

      localStorage.setItem(
        "kslAdminToken",
         data.token
      );

      localStorage.setItem(
        "kslAdminToken",
         data.token
      );

      localStorage.setItem(
        "kslAdmin",
        JSON.stringify(data.admin)
      );

      // Go to admin dashboard
      navigate("/admin/blog");

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        error.message ||
          "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
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

          {/* EMAIL */}

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

          {/* PASSWORD */}

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

          {/* ERROR */}

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;