import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid d-flex justify-content-between">
        <Link to="/hospital" className="navbar-brand">
          Dono Hospital
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/hospital/notifications" className="nav-link">
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hospital/active-recipients" className="nav-link">
                Active Recipients
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hospital/active-organs" className="nav-link">
                Active Organs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hospital/add-recipient" className="nav-link">
                Add Recipient
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hospital/add-donor" className="nav-link">
                Add Donor
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hospital/past-recipients" className="nav-link">
                Past Recipients
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hospital/past-organs" className="nav-link">
                Past Organs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
