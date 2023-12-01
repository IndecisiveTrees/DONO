import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page page">
      <div className="container">
        <header className="text-center">
          <h1 className="display-4">Welcome to Dono</h1>
          <p className="lead">
            Dono is a platform connecting organ donors with recipients. Join us
            in the mission to save lives through organ donation.
          </p>
        </header>

        <section className="features">
          <div className="row align-items-stretch">
            <div className="col-md-4 d-flex">
              <div className="card feature-card">
                <div className="card-body flex-fill">
                  <h2 className="card-title">Organize Donations</h2>
                  <p className="card-text">
                    Easily organize and manage organ donations to streamline the
                    transplant process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card feature-card">
                <div className="card-body flex-fill">
                  <h2 className="card-title">Connect Recipients</h2>
                  <p className="card-text">
                    Connect with potential organ recipients and facilitate
                    life-saving donations.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card feature-card">
                <div className="card-body flex-fill">
                  <h2 className="card-title">
                    Track Donor and Recipient Health
                  </h2>
                  <p className="card-text">
                    Keep track of donor and recipient health information to
                    ensure successful transplants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="call-to-action text-center mt-5">
          <h2>Ready to make a difference?</h2>
          <p className="lead">
            Join Dono today and be part of the life-saving journey.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
