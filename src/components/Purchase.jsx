import React, { useState } from "react";
import "../styles/PurchaseAssessments.css";
import { Link, useNavigate } from "react-router-dom";

const ASSESSMENT_CATEGORIES = [
  {
    heading: "Industry Standards",
    desc:
      "Cyber Posture provides assessments based on recognized industry standards to ensure your organization aligns with global best practices.",
    assessments: [
      { id: "nist", name: "NIST", desc: "National Institute of Standards and Technology cybersecurity framework for risk-based management.", price: 199 },
      { id: "pci", name: "PCI DSS", desc: "Payment Card Industry Data Security Standard to secure credit card transactions.", price: 149 },
      { id: "iso", name: "ISO 27001", desc: "International standard for information security management systems (ISMS).", price: 179 },
    ],
  },
  {
    heading: "Regulatory Standards",
    desc:
      "Regulatory compliance is essential for maintaining legal and operational integrity. Our assessments help you meet necessary requirements and avoid penalties.",
    assessments: [
      { id: "sox", name: "SOX", desc: "Sarbanes-Oxley Act compliance for financial reporting.", price: 129 },
      { id: "hipaa", name: "HIPAA", desc: "Health Insurance Portability and Accountability Act for healthcare data protection.", price: 159 },
      { id: "gdpr", name: "GDPR", desc: "General Data Protection Regulation for data privacy in the EU.", price: 189 },
    ],
  },
  {
    heading: "Cyber and Third-Party Assessments",
    desc:
      "In today's interconnected world, third-party security is as critical as internal measures. We assess risks and vulnerabilities within your organization and vendor ecosystem.",
    assessments: [
      { id: "cyber-risk", name: "Cyber Risk Assessments", desc: "Identifying and prioritizing cybersecurity risks within your systems.", price: 139 },
      { id: "vendor", name: "Vendor and Third-Party Assessments", desc: "Evaluating the cybersecurity posture of external partners.", price: 119 },
      { id: "pentest", name: "Penetration Testing", desc: "Simulated attacks to uncover vulnerabilities in your systems.", price: 209 },
      { id: "cloud", name: "Cloud Security Assessments", desc: "Ensuring your cloud environments meet security benchmarks.", price: 169 },
    ],
  },
];

const flattenAssessments = () => {
  return ASSESSMENT_CATEGORIES.flatMap(cat => cat.assessments);
};

const PurchaseAssessments = () => {
  const navigate = useNavigate();
  const [purchased, setPurchased] = useState(() => {
    return JSON.parse(localStorage.getItem("purchasedAssessments") || "[]");
  });
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const allAssessments = flattenAssessments();

  const handleAddToCart = (assessment) => {
    if (purchased.includes(assessment.id) || cart.some(a => a.id === assessment.id)) return;
    setCart([...cart, assessment]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(a => a.id !== id));
  };

  const handleBuyAll = () => {
    const newPurchased = [...purchased, ...cart.map(a => a.id)];
    setPurchased(newPurchased);
    localStorage.setItem("purchasedAssessments", JSON.stringify(newPurchased));
    setCart([]);
    setShowCart(false);
    setConfirmation("Purchase successful!");
    setTimeout(() => setConfirmation(""), 2000);
  };

  const getAssessmentById = (id) => allAssessments.find(a => a.id === id);

  const total = cart.reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-greeting">
          <span>Hello, {localStorage.getItem('username') || 'User'}</span>
        </div>
        <h2 className="sidebar-title">MENU</h2>
        <nav className="sidebar-menu">
          <Link to="/dashboard" className="sidebar-item">Dashboard</Link>
          <Link to="/purchase-assessments" className="sidebar-item active">Purchase Assessments</Link>
          <Link to="/profile" className="sidebar-item">Profile</Link>
          <Link to="/customer-review" className="sidebar-item">Customer Review</Link>
          <h2 className="sidebar-title">OTHERS</h2>
          <Link to="/settings" className="sidebar-item">Settings</Link>
          <Link to="/payment" className="sidebar-item">Payment</Link>
          <Link to="/accounts" className="sidebar-item">Accounts</Link>
          <Link to="/help" className="sidebar-item">Help</Link>
          <button onClick={() => {
            localStorage.clear();
            navigate('/login');
          }} className="logout-button">Logout</button>
        </nav>
      </aside>

      <div className="main-content">
        <div className="purchase-content">
          <h1>Purchase Assessments</h1>
          <button className="cart-btn" onClick={() => setShowCart(true)}>
            🛒 Cart ({cart.length})
          </button>
          {confirmation && <div className="purchase-confirmation">{confirmation}</div>}
          <section className="categories">
            {ASSESSMENT_CATEGORIES.map((cat) => (
              <div className="category" key={cat.heading}>
                <h3>{cat.heading}</h3>
                <p>{cat.desc}</p>
                <div className="assessment-cards-row">
                  {cat.assessments.map((a) => (
                    <div
                      className={`assessment-purchase-card${purchased.includes(a.id) ? " purchased" : ""}`}
                      key={a.id}
                    >
                      <h4>{a.name}</h4>
                      <p>{a.desc}</p>
                      <div className="assessment-price">${a.price}</div>
                      {purchased.includes(a.id) ? (
                        <button className="purchase-btn purchased-btn" disabled>Purchased</button>
                      ) : cart.some(item => item.id === a.id) ? (
                        <button className="purchase-btn" disabled>In Cart</button>
                      ) : (
                        <button className="purchase-btn" onClick={() => handleAddToCart(a)}>Purchase</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
        {showCart && (
          <div className="cart-modal">
            <div className="cart-content">
              <h2>Your Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="cart-list">
                  {cart.map(a => (
                    <li key={a.id} className="cart-item">
                      <span>{a.name}</span>
                      <span>${a.price}</span>
                      <button className="remove-cart-btn" onClick={() => handleRemoveFromCart(a.id)}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="cart-total">Total: <strong>${total}</strong></div>
              <div className="cart-actions">
                <button className="buy-all-btn" onClick={handleBuyAll} disabled={cart.length === 0}>Buy All</button>
                <button className="close-cart-btn" onClick={() => setShowCart(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseAssessments;