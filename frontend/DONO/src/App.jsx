import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRecipient from "./pages/AddRecipient";
import ActiveRecipents from "./pages/ActiveRecipents";
import AddDonor from "./pages/AddDonor";
import ActiveOrgans from "./pages/ActiveOrgans";
import HospitalHomePage from "./pages/HospitalHome";
import LandingPage from "./pages/LandingPage";
import HospitalLogin from "./pages/HospitalLogin";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<HospitalLogin />} />
            <Route path="/hospital" element={<HospitalHomePage />} />
            <Route path="/hospital/add-recipient" element={<AddRecipient />} />
            <Route
              path="/hospital/active-recipients"
              element={<ActiveRecipents />}
            />
            <Route path="/hospital/add-donor" element={<AddDonor />}></Route>
            <Route path="/hospital/active-organs" element={<ActiveOrgans />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
