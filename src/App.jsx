import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Homepage from "./components/Homepage";
import Assessment1 from "./components/Assessment1";
import Assessment2 from "./components/Assessment2";
import PurchaseAssessments from "./components/Purchase";
import LoginPage from "./components/login";
import Profile from "./components/Profile";
import CustomerReview from "./components/CustomerReview";
import Settings from "./components/Settings";
import Payment from "./components/Payment";
import Accounts from "./components/Accounts";
import Help from "./components/Help";
import HIPAAComplianceAssessment from "./components/HIPAAComplianceAssessment";

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
        <Route path="/hipaa-assessment" element={<HIPAAComplianceAssessment />} />
        
        {/* Purchase Assessments */}
        <Route path="/purchase-assessments" element={<PurchaseAssessments />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Customer Review */}
        <Route path="/customer-review" element={<CustomerReview />} />

        {/* Settings Page */}
        <Route path="/settings" element={<Settings />} />

        {/* Payment Page */}
        <Route path="/payment" element={<Payment />} />

        {/* Accounts Page */}
        <Route path="/accounts" element={<Accounts />} />

        {/* Help Page */}
        <Route path="/help" element={<Help />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

