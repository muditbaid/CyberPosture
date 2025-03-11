import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CustomerReview.css";

function CustomerReview() {
  const navigate = useNavigate();
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    review: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  // Mock reviews data (replace with API call in production)
  const [reviews] = useState([
    {
      id: 1,
      username: "John D.",
      rating: 5,
      title: "Excellent Assessment Tool",
      review: "The cybersecurity assessment was thorough and provided valuable insights for our organization.",
      date: "2024-03-15"
    },
    {
      id: 2,
      username: "Sarah M.",
      rating: 4,
      title: "Very Helpful Platform",
      review: "Great tool for understanding our security posture. The interface is intuitive and user-friendly.",
      date: "2024-03-14"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the review
    setMessage({ text: 'Review submitted successfully!', type: 'success' });
    setReviewForm({
      rating: 5,
      title: '',
      review: ''
    });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

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
          <Link to="/help" className="sidebar-item">Help</Link>
          <button onClick={() => {
            localStorage.clear();
            navigate('/login');
          }} className="logout-button">Logout</button>
        </nav>
      </aside>

      <div className="main-content">
        <div className="review-container">
          <h1>Customer Reviews</h1>
          
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="review-section">
            <h2>Submit Your Review</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Rating</label>
                <select
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleInputChange}
                  required
                >
                  <option value="5">★★★★★ (5)</option>
                  <option value="4">★★★★☆ (4)</option>
                  <option value="3">★★★☆☆ (3)</option>
                  <option value="2">★★☆☆☆ (2)</option>
                  <option value="1">★☆☆☆☆ (1)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleInputChange}
                  placeholder="Give your review a title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Review</label>
                <textarea
                  name="review"
                  value={reviewForm.review}
                  onChange={handleInputChange}
                  placeholder="Share your experience with our platform"
                  required
                />
              </div>

              <button type="submit" className="submit-review-button">
                Submit Review
              </button>
            </form>
          </div>

          <div className="reviews-list">
            <h2>Recent Reviews</h2>
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                  </span>
                  <span className="review-date">{review.date}</span>
                </div>
                <h3>{review.title}</h3>
                <p className="review-author">By {review.username}</p>
                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerReview; 