import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../services/api";
import "../styles/Assessment.css";

function Assessment1() {
  const [response, setResponse] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [controlData, setControlData] = useState(null);
  const [error, setError] = useState("");
  const { controlId } = useParams();

  useEffect(() => {
    const fetchControlData = async () => {
      try {
        const token = localStorage.getItem('token');
        const assessmentData = await apiService.getControls("assessment-1", token);
        setControlData(assessmentData);
      } catch (error) {
        console.error("Failed to fetch control data:", error);
        setError("Failed to load control data. Please try again.");
      }
    };

    fetchControlData();
  }, []);

  const handleSubmit = async () => {
    if (!response.trim()) {
      setError("Please provide a response before submitting.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem('token');
      const result = await apiService.submitControlResponse(
        "assessment-1", 
        controlId || "23", // Use passed controlId or default
        { response: response.trim() },
        token
      );

      if (result.success) {
        // Show confirmation message
        setShowConfirmation(true);
        setResponse(""); // Clear the response
        
        // Update local storage progress
        const currentProgress = JSON.parse(localStorage.getItem("assessmentProgress")) || {};
        const updatedProgress = {
          ...currentProgress,
          "assessment-1": {
            ...currentProgress["assessment-1"],
            lastSubmitted: new Date().toISOString(),
            controlsCompleted: [...(currentProgress["assessment-1"]?.controlsCompleted || []), controlId]
          }
        };
        localStorage.setItem("assessmentProgress", JSON.stringify(updatedProgress));
        
        // Hide confirmation after 3 seconds
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
      } else {
        setError(result.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("Failed to submit response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assessment-page">
      {/* Sidebar is assumed to be handled globally */}
      <header className="assessment-header">
        <h3>HIPAA | Regulatory</h3>
        <h1>Control - {controlId || "23"}</h1>
        <h2>Security Management Process</h2>
      </header>

      <main className="assessment-main">
        <section className="description-section">
          <h3>Description</h3>
          <p>
            {controlData?.description || "Conduct risk analysis and risk management processes to identify security risks to PHI."}
          </p>
        </section>

        <section className="risk-section">
          <h3>Risk</h3>
          <p>
            {controlData?.risk || "Failure to conduct regular risk analyses and address identified risks can lead to vulnerabilities in PHI security, potentially resulting in breaches and non-compliance."}
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
