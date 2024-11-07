import React from "react";

import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import CVBuilder from "./pages/CVBuilderPage/CVPage";
import CVTest from "./pages/CVBuilderPage/CV";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-cv" element={<CVBuilder />} />
        <Route path="/create-mm" element={<CVTest />} />
      </Routes>
    </>
  );
}

export default App;
