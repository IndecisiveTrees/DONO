import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRecipient from "./pages/AddRecipient";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/hospital/add-recipient" element={<AddRecipient />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
