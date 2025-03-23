import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check for token in localStorage

  // Redirect to dashboard if the user is already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard"); // Redirect if a token is found
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + process.env.REACT_APP_API_LOGIN,
        {
          username,
          password,
        }
      );
      console.log(response);
      localStorage.setItem("token", response.data.token); // Save JWT to localStorage
      localStorage.setItem("username", username); // Save username to localStorage

      navigate("/dashboard"); // Use navigate to redirect to the dashboard page
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            </form>
            <p className="mt-3">
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-3">
        <div className="container text-center">
          <p>&copy; 2025 VedTry. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
