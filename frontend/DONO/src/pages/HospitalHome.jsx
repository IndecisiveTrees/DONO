import React from "react";
import { Link } from "react-router-dom";

const HospitalHomePage = () => {
  return (
    <div className="page text-center">
      <div className="hospital-home-page">
        <h2 className="text-center">Welcome Hospital!</h2>
        <div className="card-container row">
          {/* Notifications Card */}
          <Link to="/hospital/notifications" className="card m-1">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <p className="card-text">View and manage notifications</p>
            </div>
          </Link>

          {/* Active Recipients Card */}
          <Link to="/hospital/active-recipients" className="card m-1">
            <div className="card-body">
              <h5 className="card-title">Active Recipients</h5>
              <p className="card-text">View and manage active recipients</p>
            </div>
          </Link>

          {/* Active Organs Card */}
          <Link to="/hospital/active-organs" className="card m-1">
            <div className="card-body">
              <h5 className="card-title">Active Organs</h5>
              <p className="card-text">View and manage active organs</p>
            </div>
          </Link>

          {/* Add Recipient Card */}
          <Link to="/hospital/add-recipient" className="card m-1">
            <div className="card-body">
              <h5 className="card-title">Add Recipient</h5>
              <p className="card-text">Add a new recipient to the waitlist</p>
            </div>
          </Link>

          {/* Add Donor Card */}
          <Link to="/hospital/add-donor" className="card m-1">
            <div className="card-body">
              <h5 className="card-title">Add Donor</h5>
              <p className="card-text">Add a new donor to the registry</p>
            </div>
          </Link>

          {/* Past Recipients Card */}
          <Link to="/hospital/past-recipients" className="card m-1">
            <div className="card-body">
              <h5 className="card-title">Past Recipients</h5>
              <p className="card-text">
                View past recipients and their details
              </p>
            </div>
          </Link>

          {/* Past Organs Card */}
          <Link to="/hospital/past-organs" className="card m-1">
            <div className="card-body">
              <h5 className="card-title">Past Organs</h5>
              <p className="card-text">View past organs and their details</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalHomePage;
