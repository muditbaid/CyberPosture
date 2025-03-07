import React from "react";
import "../styles/Assessment2.css";

function Assessment2() {
  return (
    <div className="assessment2-page">
      {/* Sidebar and top bar are assumed to be globally rendered */}
      <header className="assessment2-header">
        <h2>CyberPosture Dashboard</h2>
        <h1>NIST Questionnaire</h1>
        <p>
          Evaluates & improves cybersecurity posture with guidelines & metrics.
        </p>
      </header>

      <main className="assessment2-content">
        <section className="instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>Answer each question to the best of your ability.</li>
            <li>You may save your progress but must press SAVE.</li>
            <li>
              To complete the assessment press COMPLETE ASSESSMENT for it to be
              reviewed by an assessor.
            </li>
          </ol>
        </section>

        <section className="categories">
          <button className="category-button">Integrity Monitoring</button>
          <button className="category-button">Security Configuration</button>
          <button className="category-button">Network Protocols</button>
        </section>
      </main>
    </div>
  );
}

export default Assessment2;
