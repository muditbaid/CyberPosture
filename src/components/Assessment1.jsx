import React from "react";
import "../styles/Assessment.css";

function Assessment1() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleFileUpload = (e) => {
    // Handle file upload logic here
  };

  return (
    <div className="assessment-page">
      <header className="header">
        <h1>Assessment 1</h1>
        <p>Comprehensive cybersecurity audit tailored for small businesses.</p>
      </header>

      <main className="main-content">
        <h2>Security Assessment Form</h2>
        
        <form className="assessment-form" onSubmit={handleSubmit}>
          {/* First Assessment Control */}
          <div className="control-group">
            <div className="control-id">001</div>
            <div className="input-area">
              <div className="question">
                Do you have a documented security policy in place?
              </div>
              <input 
                type="text" 
                className="text-input"
                placeholder="Please provide details about your security policy"
              />
            </div>
          </div>

          {/* Second Assessment Control */}
          <div className="control-group">
            <div className="control-id">002</div>
            <div className="input-area">
              <div className="question">
                Upload your current network architecture diagram
              </div>
              <input
                type="file"
                className="file-upload"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.png,.jpg"
              />
            </div>
          </div>

          {/* Third Assessment Control */}
          <div className="control-group">
            <div className="control-id">003</div>
            <div className="input-area">
              <div className="question">
                Describe your current backup and recovery procedures
              </div>
              <textarea 
                className="text-input"
                rows="4"
                placeholder="Detail your backup frequency, storage locations, and recovery testing procedures"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Assessment
          </button>
        </form>

        <button className="purchase-button">Purchase for $299</button>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Cyber Posture. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Assessment1;