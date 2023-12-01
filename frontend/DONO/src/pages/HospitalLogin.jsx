import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HospitalLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication logic (you may replace this with your authentication logic)
    if (username === "hospital" && password === "password") {
      // Redirect to the hospital dashboard or desired page
      navigate("/hospital/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page page">
      <div className="form-container form-group">
        <form onSubmit={handleSubmit}>
          <h2 className="form-heading">Hospital Login</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalLogin;
