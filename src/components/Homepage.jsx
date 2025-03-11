import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

function Homepage() {
  const navigate = useNavigate();
  const [assessmentProgress, setAssessmentProgress] = useState(null);

  useEffect(() => {
    // Retrieve saved progress from local storage
    const savedProgress = localStorage.getItem("assessmentProgress");
    if (savedProgress) {
      setAssessmentProgress(JSON.parse(savedProgress));
    }
  }, []);

  const handleStartAssessment = (assessmentId) => {
    // Get existing progress
    const existingProgress = JSON.parse(localStorage.getItem("assessmentProgress")) || {};
    // Update progress for the specific assessment
    const updatedProgress = {
      ...existingProgress,
      [assessmentId]: { status: "in-progress" }
    };
    localStorage.setItem("assessmentProgress", JSON.stringify(updatedProgress));
  };

  const handleResumeAssessment = (assessmentId) => {
    // Logic to resume the specific assessment
    console.log(`Resuming Assessment ${assessmentId}`);
    // Redirect to the saved assessment link if needed
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    localStorage.removeItem('assessmentProgress');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-greeting">
          <span>Hello, {localStorage.getItem('username') || 'User'}</span>
        </div>
        <h2 className="sidebar-title">MENU</h2>
        <nav className="sidebar-menu">
          <Link to="/dashboard" className="sidebar-item active">Dashboard</Link>
          <Link to="/purchase-assessments" className="sidebar-item">Purchase Assessments</Link>
          <Link to="/profile" className="sidebar-item">Profile</Link>
          <Link to="/customer-review" className="sidebar-item">Customer Review</Link>
          <h2 className="sidebar-title">OTHERS</h2>
          <Link to="/settings" className="sidebar-item">Settings</Link>
          <Link to="/payment" className="sidebar-item">Payment</Link>
          <Link to="/accounts" className="sidebar-item">Accounts</Link>
          <Link to="/help" className="sidebar-item">Help</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-bar">
          <h1>CyberPosture Dashboard</h1>
        </header>

        <div className="cards-container">
          {/* NIST Assessment Card */}
          <div className="assessment-card">
            <h3>Questionnaire</h3>
            <h2>NIST</h2>
            <p>Evaluates & improves cybersecurity posture with guidelines & metrics.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "78%" }}></div>
            </div>
            <span className="progress-text">78% Controls Completed</span>
            <div className="button-container">
              {assessmentProgress?.["assessment-1"] ? (
                <Link
                  to="/assessment-1"
                  className="resume-button"
                  onClick={() => handleResumeAssessment("assessment-1")}
                >
                  Resume
                </Link>
              ) : (
                <Link
                  to="/assessment-1"
                  className="start-button"
                  onClick={() => handleStartAssessment("assessment-1")}
                >
                  Start
                </Link>
              )}
            </div>
          </div>

          {/* ISO Assessment Card */}
          <div className="assessment-card">
            <h3>Questionnaire</h3>
            <h2>ISO</h2>
            <p>Focuses on ensuring organizational information security compliance with ISO standards.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: "45%" }}></div>
            </div>
            <span className="progress-text">45% Controls Completed</span>
            <div className="button-container">
              {assessmentProgress?.["assessment-2"] ? (
                <Link
                  to="/assessment-2"
                  className="resume-button"
                  onClick={() => handleResumeAssessment("assessment-2")}
                >
                  Resume
                </Link>
              ) : (
                <Link
                  to="/assessment-2"
                  className="start-button"
                  onClick={() => handleStartAssessment("assessment-2")}
                >
                  Start
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
