import React, { useState } from "react";
import { apiService } from "../services/api";
import "../styles/PurchaseAssessments.css";

const PurchaseAssessments = () => {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    requirements: []
  });
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ success: false, error: "" });

    try {
      const response = await apiService.submitConsultation(formData);
      if (response.success) {
        setSubmitStatus({ success: true, error: "" });
        setFormData({
          company: "",
          contact: "",
          phone: "",
          email: "",
          requirements: []
        });
      } else {
        setSubmitStatus({ success: false, error: "Failed to submit request" });
      }
    } catch (error) {
      setSubmitStatus({ success: false, error: "An error occurred" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="purchase-assessments">
      <h1>Purchase Assessments</h1>

      <section className="categories">
        <h2>Categories of Assessments</h2>

        <div className="category">
          <h3>Industry Standards</h3>
          <p>Cyber Posture provides assessments based on recognized industry standards to ensure your organization aligns with global best practices.</p>
          <ul>
            <li><strong>NIST:</strong> National Institute of Standards and Technology cybersecurity framework for risk-based management.</li>
            <li><strong>PCI DSS:</strong> Payment Card Industry Data Security Standard to secure credit card transactions.</li>
            <li><strong>ISO 27001:</strong> International standard for information security management systems (ISMS).</li>
          </ul>
        </div>

        <div className="category">
          <h3>Regulatory Standards</h3>
          <p>Regulatory compliance is essential for maintaining legal and operational integrity. Our assessments help you meet necessary requirements and avoid penalties.</p>
          <ul>
            <li><strong>SOX:</strong> Sarbanes-Oxley Act compliance for financial reporting.</li>
            <li><strong>HIPAA:</strong> Health Insurance Portability and Accountability Act for healthcare data protection.</li>
            <li><strong>GDPR:</strong> General Data Protection Regulation for data privacy in the EU.</li>
          </ul>
        </div>

        <div className="category">
          <h3>Cyber and Third-Party Assessments</h3>
          <p>In today's interconnected world, third-party security is as critical as internal measures. We assess risks and vulnerabilities within your organization and vendor ecosystem.</p>
          <ul>
            <li><strong>Cyber Risk Assessments:</strong> Identifying and prioritizing cybersecurity risks within your systems.</li>
            <li><strong>Vendor and Third-Party Assessments:</strong> Evaluating the cybersecurity posture of external partners.</li>
            <li><strong>Penetration Testing:</strong> Simulated attacks to uncover vulnerabilities in your systems.</li>
            <li><strong>Cloud Security Assessments:</strong> Ensuring your cloud environments meet security benchmarks.</li>
          </ul>
        </div>
      </section>

      <section className="consultation">
        <h2>Schedule a Consultation</h2>
        <p>Ready to secure your business? Fill out the form below to schedule a meeting with our experts.</p>
        <form className="consultation-form" onSubmit={handleSubmit}>
          <div>
            <label>Company Name</label>
            <input 
              type="text" 
              name="company" 
              value={formData.company}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div>
            <label>Contact Person</label>
            <input 
              type="text" 
              name="contact" 
              value={formData.contact}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div>
            <label>Telephone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div>
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="full-width">
            <label>Requirements</label>
            <select 
              name="requirements" 
              multiple 
              value={formData.requirements}
              onChange={handleInputChange}
              required
            >
              <option value="regulatory-compliance">Regulatory Compliance</option>
              <option value="cyber-readiness">Cyber Readiness</option>
              <option value="vendor-assessments">Vendor Assessments</option>
            </select>
          </div>

          <button type="submit">Schedule Consultation</button>
          {submitStatus.success && (
            <p className="success-message">Consultation request submitted successfully!</p>
          )}
          {submitStatus.error && (
            <p className="error-message">{submitStatus.error}</p>
          )}
        </form>
      </section>
    </div>
  );
};

export default PurchaseAssessments;