import React from "react";
import "../styles/Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <header className="header">
        <h1>Cybersecurity Assessments</h1>
        <p>Choose the right assessment for your organization's needs.</p>
      </header>

      <main className="main-content">
        <div className="assessment-card">
          <h2>Assessment 1</h2>
          <p>Comprehensive cybersecurity audit tailored for small businesses.</p>
          <a href="/assessment-1" className="button">Learn More</a>
        </div>

        <div className="assessment-card">
          <h2>Assessment 2</h2>
          <p>Advanced risk assessment for enterprise-level organizations.</p>
          <a href="/assessment-2" className="button">Learn More</a>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Cyber Posture. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
