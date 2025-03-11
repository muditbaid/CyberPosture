import React, { useState } from "react";
import { apiService } from "../services/api";
import "../styles/Assessment.css";

function Assessment1() {
  const [response, setResponse] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!response.trim()) {
      setError("Please provide a response before submitting.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const result = await apiService.submitControlResponse(response.trim());

      // Show confirmation message
      setShowConfirmation(true);
      setResponse(""); // Clear the response
      
      // Hide confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setError("Failed to submit response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assessment-page">
      <header className="assessment-header">
        <h3>HIPAA | Regulatory</h3>
        <h1>Control - 23</h1>
        <h2>Security Management Process</h2>
      </header>

      <main className="assessment-main">
        <section className="description-section">
          <h3>Description</h3>
          <p>
            Conduct risk analysis and risk management processes to identify security risks to PHI.
          </p>
        </section>

        <section className="risk-section">
          <h3>Risk</h3>
          <p>
            Failure to conduct regular risk analyses and address identified risks can lead to vulnerabilities in PHI security, potentially resulting in breaches and non-compliance.
          </p>
        </section>

        <section className="input-section">
          <textarea
            className="response-input"
            placeholder="Provide your feedback or upload relevant documents"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            disabled={loading}
          />
          {error && <p className="error-message">{error}</p>}
        </section>

        <button 
          className="complete-button" 
          onClick={handleSubmit}
          disabled={loading || !response.trim()}
        >
          {loading ? "Submitting..." : "Complete"}
        </button>

        {showConfirmation && (
          <div className="confirmation-message">
            Response submitted successfully!
          </div>
        )}
      </main>
    </div>
  );
}

export default Assessment1;
