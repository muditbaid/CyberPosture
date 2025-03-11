import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Payment.css";

function Payment() {
  const navigate = useNavigate();
  const [paymentMethods] = useState([
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '12/24' },
    { id: 2, type: 'PayPal', email: 'user@example.com' }
  ]);

  const [transactions] = useState([
    { id: 1, date: '2024-03-15', amount: 299.99, description: 'NIST Assessment Package' },
    { id: 2, date: '2024-02-28', amount: 199.99, description: 'ISO Assessment' }
  ]);

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
          <Link to="/payment" className="sidebar-item active">Payment</Link>
          <Link to="/accounts" className="sidebar-item">Accounts</Link>
          <Link to="/help" className="sidebar-item">Help</Link>
          <button onClick={() => {
            localStorage.clear();
            navigate('/login');
          }} className="logout-button">Logout</button>
        </nav>
      </aside>

      <div className="main-content">
        <div className="payment-container">
          <h1>Payment Methods & History</h1>

          <div className="payment-section">
            <h2>Payment Methods</h2>
            <div className="payment-methods">
              {paymentMethods.map(method => (
                <div key={method.id} className="payment-method-card">
                  <div className="payment-method-icon">
                    {method.type === 'Credit Card' ? '💳' : '🔄'}
                  </div>
                  <div className="payment-method-details">
                    <h3>{method.type}</h3>
                    <p>{method.last4 ? `****${method.last4}` : method.email}</p>
                  </div>
                  <button className="edit-button">Edit</button>
                </div>
              ))}
              <button className="add-payment-button">+ Add Payment Method</button>
            </div>
          </div>

          <div className="payment-section">
            <h2>Transaction History</h2>
            <div className="transactions">
              {transactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-date">{transaction.date}</div>
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-amount">${transaction.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment; 