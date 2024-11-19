import React from "react";

import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import { CV } from "./pages/CVBuilderPage/components/CV";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-cv" element={<CV />} />
      </Routes>
    </>
  );
}

export default App;
