import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const ASSESSMENT_INFO = {
  nist: {
    name: "NIST",
    desc: "Evaluates & improves cybersecurity posture with guidelines & metrics.",
  },
  pci: {
    name: "PCI DSS",
    desc: "Payment Card Industry Data Security Standard to secure credit card transactions.",
  },
  iso: {
    name: "ISO 27001",
    desc: "Focuses on ensuring organizational information security compliance with ISO standards.",
  },
  sox: {
    name: "SOX",
    desc: "Sarbanes-Oxley Act compliance for financial reporting.",
  },
  hipaa: {
    name: "HIPAA",
    desc: "Health Insurance Portability and Accountability Act for healthcare data protection.",
  },
  gdpr: {
    name: "GDPR",
    desc: "General Data Protection Regulation for data privacy in the EU.",
  },
  "cyber-risk": {
    name: "Cyber Risk Assessments",
    desc: "Identifying and prioritizing cybersecurity risks within your systems.",
  },
  vendor: {
    name: "Vendor and Third-Party Assessments",
    desc: "Evaluating the cybersecurity posture of external partners.",
  },
  pentest: {
    name: "Penetration Testing",
    desc: "Simulated attacks to uncover vulnerabilities in your systems.",
  },
  cloud: {
    name: "Cloud Security Assessments",
    desc: "Ensuring your cloud environments meet security benchmarks.",
  },
};

function Homepage() {
  const navigate = useNavigate();
  const [assessmentProgress, setAssessmentProgress] = useState({});
  const [purchased, setPurchased] = useState([]);
  const [randomProgress, setRandomProgress] = useState({});

  useEffect(() => {
    // Retrieve saved progress and purchased assessments from local storage
    const savedProgress = localStorage.getItem("assessmentProgress");
    if (savedProgress) {
      setAssessmentProgress(JSON.parse(savedProgress));
    }
    const purchasedAssessments = localStorage.getItem("purchasedAssessments");
    if (purchasedAssessments) {
      setPurchased(JSON.parse(purchasedAssessments));
    }
  }, []);

  // Generate random progress for in-progress assessments
  useEffect(() => {
    const newRandom = {};
    purchased.forEach((id) => {
      if (assessmentProgress[id]?.status === "in-progress") {
        newRandom[id] = Math.floor(Math.random() * 81) + 10; // 10-90%
      }
    });
    setRandomProgress(newRandom);
  }, [assessmentProgress, purchased]);

  const handleStartAssessment = (assessmentId) => {
    const existingProgress = JSON.parse(localStorage.getItem("assessmentProgress")) || {};
    const updatedProgress = {
      ...existingProgress,
      [assessmentId]: { status: "in-progress" },
    };
    localStorage.setItem("assessmentProgress", JSON.stringify(updatedProgress));
    setAssessmentProgress(updatedProgress);
    
    // Navigate to specific assessment pages based on assessment ID
    if (assessmentId === 'hipaa') {
      navigate('/hipaa-assessment');
    } else {
      // For other assessments, you can add more specific routes here
      console.log(`Starting assessment: ${assessmentId}`);
    }
  };

  const handleResumeAssessment = (assessmentId) => {
    // Navigate to specific assessment pages based on assessment ID
    if (assessmentId === 'hipaa') {
      navigate('/hipaa-assessment');
    } else {
      // For other assessments, you can add more specific routes here
      console.log(`Resuming assessment: ${assessmentId}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    localStorage.removeItem('assessmentProgress');
    navigate('/login');
  };

  // Always show purchased assessments as cards
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-greeting">
          <span>Hello, {localStorage.getItem('username') || 'User'}</span>
        </div>
        <h2 className="sidebar-title">MENU</h2>
        <nav className="sidebar-menu">
          <Link to="/dashboard" className="sidebar-item active">Dashboard</Link>
          <Link to="/purchase-assessments" className="sidebar-item">Purchase Assessments</Link>
          <Link to="/hipaa-assessment" className="sidebar-item">HIPAA Assessment</Link>
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
      <div className="main-content">
        <header className="top-bar">
          <h1>CyberPosture Dashboard</h1>
        </header>
        <div className="cards-container">
          {purchased.length === 0 && (
            <div style={{ color: '#888', fontSize: '1.2rem', margin: '2rem auto' }}>
              No assessments purchased yet. Go to Purchase Assessments to get started.
            </div>
          )}
          {purchased.map((id) => {
            const info = ASSESSMENT_INFO[id] || { name: id, desc: "Assessment description." };
            let progress = 0;
            if (assessmentProgress[id]?.status === "in-progress") {
              progress = randomProgress[id] || 0;
            }
            return (
              <div className="assessment-card" key={id}>
                <h2>{info.name}</h2>
                <p>{info.desc}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="progress-text">{progress}% Controls Completed</span>
                <div className="button-container">
                  {assessmentProgress[id]?.status === "in-progress" ? (
                    <button
                      className="resume-button"
                      onClick={() => handleResumeAssessment(id)}
                    >
                      Resume
                    </button>
                  ) : (
                    <button
                      className="start-button"
                      onClick={() => handleStartAssessment(id)}
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
