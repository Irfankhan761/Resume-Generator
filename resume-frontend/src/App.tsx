import React from "react";

import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import { CV } from "./pages/CVBuilderPage/components/CV";
import LoginPage from "./pages/AuthPage/Login/Login";
import SignupPage from "./pages/AuthPage/Sigup/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-cv" element={<CV />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
