import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Help.css";

function Help() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-greeting">
          <span>Hello, {localStorage.getItem('username') || 'User'}</span>
        </div>
        <h2 className="sidebar-title">MENU</h2>
        <nav className="sidebar-menu">
          <Link to="/dashboard" className="sidebar-item">Dashboard</Link>
          <Link to="/purchase-assessments" className="sidebar-item">Purchase Assessments</Link>
          <Link to="/profile" className="sidebar-item">Profile</Link>
          <Link to="/customer-review" className="sidebar-item">Customer Review</Link>
          <h2 className="sidebar-title">OTHERS</h2>
          <Link to="/settings" className="sidebar-item">Settings</Link>
          <Link to="/payment" className="sidebar-item">Payment</Link>
          <Link to="/accounts" className="sidebar-item">Accounts</Link>
          <Link to="/help" className="sidebar-item active">Help</Link>
          <button onClick={() => {
            localStorage.clear();
            navigate('/login');
          }} className="logout-button">Logout</button>
        </nav>
      </aside>

      <div className="main-content">
        <div className="help-container">
          <h1>Help Center</h1>

          <div className="help-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>How do I start an assessment?</h3>
                <p>Navigate to the Dashboard and click the "Start" button on any assessment card. You can save your progress and return later.</p>
              </div>
              <div className="faq-item">
                <h3>Can I export my assessment results?</h3>
                <p>Yes, after completing an assessment, you can export the results in PDF or CSV format from the assessment summary page.</p>
              </div>
              {/* Add more FAQs */}
            </div>
          </div>

          <div className="help-section">
            <h2>Contact Support</h2>
            <div className="contact-support">
              <div className="support-card">
                <h3>Email Support</h3>
                <p>support@cyberposture.com</p>
                <p>Response within 24 hours</p>
              </div>
              <div className="support-card">
                <h3>Phone Support</h3>
                <p>1-800-CYBER-HELP</p>
                <p>Available 9 AM - 5 PM EST</p>
              </div>
              <div className="support-card">
                <h3>Live Chat</h3>
                <button className="chat-button">Start Chat</button>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help; 