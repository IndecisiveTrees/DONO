import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRecipient from "./pages/AddRecipient";
import ActiveRecipents from "./pages/ActiveRecipents";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/hospital/add-recipient" element={<AddRecipient />} />
            <Route
              path="/hospital/active-recipients"
              element={<ActiveRecipents />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
