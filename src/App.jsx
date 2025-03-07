import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Homepage from "./components/Homepage";
import Assessment1 from "./components/Assessment1";
import Assessment2 from "./components/Assessment2";
import PurchaseAssessments from "./components/Purchase";
import LoginPage from "./components/login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Homepage */}
        <Route path="/dashboard" element={<Homepage />} />
        
        {/* Assessment Pages */}
        <Route path="/assessment-1" element={<Assessment1 />} />
        <Route path="/assessment-2" element={<Assessment2 />} />
        
        {/* Purchase Assessments */}
        <Route path="/purchase-assessments" element={<PurchaseAssessments />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback Route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

