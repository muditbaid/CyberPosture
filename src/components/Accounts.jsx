import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Accounts.css";

function Accounts() {
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
          <Link to="/accounts" className="sidebar-item active">Accounts</Link>
          <Link to="/help" className="sidebar-item">Help</Link>
          <button onClick={() => {
            localStorage.clear();
            navigate('/login');
          }} className="logout-button">Logout</button>
        </nav>
      </aside>

      <div className="main-content">
        <div className="accounts-container">
          <h1>Account Management</h1>

          <div className="accounts-section">
            <h2>Subscription Details</h2>
            <div className="subscription-info">
              <div className="plan-details">
                <h3>Current Plan</h3>
                <p className="plan-name">Enterprise Plan</p>
                <p className="plan-price">$299/month</p>
                <button className="upgrade-button">Upgrade Plan</button>
              </div>
              <div className="usage-details">
                <h3>Usage</h3>
                <div className="usage-item">
                  <span>Assessments Used</span>
                  <span>15/20</span>
                </div>
                <div className="usage-item">
                  <span>Users</span>
                  <span>8/10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="accounts-section">
            <h2>Team Members</h2>
            <div className="team-members">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Admin</td>
                    <td>Active</td>
                    <td>
                      <button className="action-button">Edit</button>
                      <button className="action-button delete">Remove</button>
                    </td>
                  </tr>
                  {/* Add more team members */}
                </tbody>
              </table>
              <button className="add-member-button">+ Add Team Member</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts; 