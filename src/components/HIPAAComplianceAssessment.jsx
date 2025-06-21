import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const HIPAAComplianceAssessment = () => {
  const [activeTab, setActiveTab] = useState('privacy');
  const [expandedRows, setExpandedRows] = useState(new Set());
  
  const [hipaaComplianceData, setHipaaComplianceData] = useState([
    { id: "PR.1.1", category: "privacy", rule: "Privacy Rule", control: "Notice of Privacy Practices (NPP)", description: "Provide individuals with a clear and concise written explanation of their rights regarding PHI and how the covered entity may use and disclose PHI.", question: "Is a Notice of Privacy Practices (NPP) developed, implemented, and provided to individuals?", details: "Documented NPP; Evidence of distribution (e.g., signed acknowledgements, website posting, initial patient visit forms).", steps: "Review NPP content for required elements. Verify procedures for NPP distribution and documentation of receipt. Ensure NPP is accessible on website and physical locations.", risk: "Non-compliance with individual rights, potential fines for lack of transparency.", status: "Not Compliant" },
    { id: "PR.1.2", category: "privacy", rule: "Privacy Rule", control: "Right to Access PHI", description: "Individuals have the right to inspect and obtain a copy of their protected health information (PHI) within designated record sets.", question: "Are individuals provided with timely access to their PHI upon request?", details: "Policies and procedures for access requests; Documentation of responses to requests; Timeframes for fulfillment.", steps: "Review access request logs and fulfillment times. Test the process by submitting mock access requests. Verify fee structures for copies comply with regulations.", risk: "Violation of patient rights, potential OCR investigation and penalties.", status: "Not Compliant" },
    { id: "PR.1.3", category: "privacy", rule: "Privacy Rule", control: "Minimum Necessary Use/Disclosure", description: "A covered entity must make reasonable efforts to limit the use and disclosure of PHI to the minimum necessary to accomplish the intended purpose.", question: "Are policies and procedures in place to ensure that only the minimum necessary PHI is used or disclosed?", details: "Training records on minimum necessary rule; Access control policies; Data sharing agreements; PHI use/disclosure logs.", steps: "Audit access logs to PHI systems. Review data sharing agreements for minimum necessary clauses. Interview staff on their understanding and application of the rule.", risk: "Unnecessary exposure of PHI, increasing risk of breach and non-compliance.", status: "Not Compliant" },
    { id: "PR.1.4", category: "privacy", rule: "Privacy Rule", control: "Business Associate Agreements (BAA)", description: "Covered entities must obtain satisfactory assurances, in the form of a written contract or other agreement, that a business associate will appropriately safeguard PHI.", question: "Are Business Associate Agreements (BAAs) in place with all relevant business associates?", details: "List of business associates; Executed BAAs; Policy on BAA requirements.", steps: "Identify all vendors/partners that handle PHI. Verify current BAAs are in place for each. Review BAA content for all required HIPAA elements.", risk: "Unauthorized disclosure of PHI by third parties, liability for business associate breaches.", status: "Not Compliant" },
    { id: "SR.2.1", category: "security", rule: "Security Rule", control: "Security Management Process", description: "Implement policies and procedures to prevent, detect, contain, and correct security violations.", question: "Is a comprehensive security management process established and maintained?", details: "Risk analysis documentation; Risk management plan; Sanction policy; Information system activity review procedures.", steps: "Review the latest risk analysis. Verify a risk management plan addresses identified risks. Examine procedures for auditing system activity logs.", risk: "Failure to proactively identify and mitigate security vulnerabilities, leading to breaches.", status: "Not Compliant" },
    { id: "SR.2.2", category: "security", rule: "Security Rule", control: "Access Control", description: "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information (ePHI) to allow access only to those persons or software programs that have been granted access rights.", question: "Are robust access controls implemented for all systems containing ePHI?", details: "User access policies; Role-based access matrices; Audit logs of access attempts; Multi-factor authentication implementation.", steps: "Audit user access permissions against job roles. Verify MFA is enforced for remote access and critical systems. Review failed login attempt logs.", risk: "Unauthorized access to ePHI, leading to data breaches or system compromise.", status: "Not Compliant" },
    { id: "SR.2.3", category: "security", rule: "Security Rule", control: "Encryption and Decryption", description: "Implement a mechanism to encrypt and decrypt ePHI.", question: "Is ePHI at rest and in transit appropriately encrypted?", details: "Encryption policies; Documentation of encryption solutions (e.g., TLS for transit, FDE for rest); Key management procedures.", steps: "Verify encryption is enabled on all devices and servers storing ePHI. Test secure communication channels. Review key management practices.", risk: "Exposure of ePHI during transmission or if systems are compromised.", status: "Not Compliant" },
    { id: "SR.2.4", category: "security", rule: "Security Rule", control: "Workstation Security", description: "Implement physical safeguards for workstations that access ePHI.", question: "Are physical safeguards for workstations and devices accessing ePHI properly implemented?", details: "Physical access control policies; Workstation screen-saver/auto-lock settings; Device encryption status.", steps: "Inspect physical access to workstations in sensitive areas. Verify screen-lock policies are enforced. Confirm all portable devices holding ePHI are encrypted.", risk: "Unauthorized access to ePHI from unattended or lost/stolen devices.", status: "Not Compliant" },
    { id: "BN.3.1", category: "breach", rule: "Breach Notification Rule", control: "Breach Detection and Response", description: "Identify and respond to suspected or known breaches of unsecured protected health information.", question: "Are procedures in place for timely detection and response to potential PHI breaches?", details: "Breach response plan; Incident response team; Forensic analysis capabilities; Training on breach identification.", steps: "Review the breach response plan for clarity and completeness. Conduct a tabletop exercise simulating a breach to test the plan's effectiveness.", risk: "Delayed or ineffective breach response, leading to increased harm and non-compliance penalties.", status: "Not Compliant" },
    { id: "BN.3.2", category: "breach", rule: "Breach Notification Rule", control: "Notification to Individuals", description: "Notify affected individuals of a breach of unsecured protected health information without unreasonable delay and in no case later than 60 calendar days after discovery.", question: "Are procedures established for notifying individuals of a breach within the required timeframe?", details: "Notification templates; Communication protocols; Documentation of individual notifications.", steps: "Review notification templates for required content. Verify process for identifying affected individuals and contact information.", risk: "Failure to notify individuals, leading to lack of transparency and potential fines.", status: "Not Compliant" },
    { id: "BN.3.3", category: "breach", rule: "Breach Notification Rule", control: "Notification to HHS and Media", description: "Notify the Secretary of HHS of breaches of unsecured protected health information. For large breaches, notify the media.", question: "Are procedures in place for notifying HHS and, if necessary, the media about breaches?", details: "HHS notification forms; Media communication plan; Documentation of notifications.", steps: "Review procedures for determining when HHS and media notification are required. Verify documentation of past notifications.", risk: "Failure to report breaches to authorities, resulting in significant legal and reputational damage.", status: "Not Compliant" },
    { id: "ER.4.1", category: "enforcement", rule: "Enforcement Rule", control: "Compliance Program", description: "Maintain a robust compliance program that addresses HIPAA requirements.", question: "Is there an active and effective HIPAA compliance program in place?", details: "Designated Compliance Officer; Compliance policies and procedures; Regular audits; Staff training records; Sanction policy for violations.", steps: "Review the compliance program charter. Interview the Compliance Officer. Examine records of internal audits, training sessions, and disciplinary actions.", risk: "Systemic non-compliance due to lack of oversight and accountability.", status: "Not Compliant" },
    { id: "ER.4.2", category: "enforcement", rule: "Enforcement Rule", control: "Documentation and Record Keeping", description: "Maintain documentation as required by the HIPAA Rules, in written or electronic form.", question: "Are all required HIPAA-related documentation and records properly maintained and accessible?", details: "HIPAA documentation retention policy; Records of policies, procedures, training, and risk assessments; Audit trails.", steps: "Verify policies for document retention. Check for the availability and integrity of key HIPAA documentation (e.g., policies, training logs, risk analyses).", risk: "Inability to demonstrate compliance during an audit or investigation, leading to penalties.", status: "Not Compliant" },
    { id: "ER.4.3", category: "enforcement", rule: "Enforcement Rule", control: "Cooperation with Investigations", description: "Cooperate with OCR investigations and provide information as required.", question: "Are policies and procedures in place to ensure cooperation with OCR investigations?", details: "Incident response plan addressing regulatory inquiries; Legal counsel involvement; Designated points of contact for regulatory bodies.", steps: "Review relevant sections of the incident response plan. Conduct a mock regulatory inquiry exercise to test response protocols.", risk: "Obstruction of justice or non-cooperation, leading to aggravated penalties.", status: "Not Compliant" }
  ]);

  const statusOptions = ["Not Compliant", "In Progress", "Compliant"];
  
  const introTexts = {
    privacy: "The HIPAA Privacy Rule sets national standards for the protection of individually identifiable health information by covered entities and their business associates. This section assesses your compliance with fundamental aspects of patient privacy and data use.",
    security: "The HIPAA Security Rule establishes national standards to protect individuals' electronic protected health information (ePHI) that is created, received, used, or maintained by a covered entity. This involves implementing administrative, physical, and technical safeguards.",
    breach: "The HIPAA Breach Notification Rule requires covered entities and their business associates to provide notification following a breach of unsecured protected health information. This section assesses your organization's readiness and procedures for breach response.",
    enforcement: "The HIPAA Enforcement Rule outlines the legal procedures and penalties for violations of the HIPAA Rules. While not directly a set of 'safeguards,' adherence to its principles (like maintaining a compliance program and documentation) is crucial for mitigating liability. This section assesses your preparedness for regulatory scrutiny."
  };

  const tabs = [
    { id: 'privacy', label: 'Privacy Rule' },
    { id: 'security', label: 'Security Rule' },
    { id: 'breach', label: 'Breach Notification Rule' },
    { id: 'enforcement', label: 'Enforcement Rule' }
  ];

  // Calculate statistics
  const totalControls = hipaaComplianceData.length;
  const compliantCount = hipaaComplianceData.filter(d => d.status === 'Compliant').length;
  const inProgressCount = hipaaComplianceData.filter(d => d.status === 'In Progress').length;
  const notCompliantCount = hipaaComplianceData.filter(d => d.status === 'Not Compliant').length;

  // Chart data
  const chartData = {
    labels: ['Compliant', 'In Progress', 'Not Compliant'],
    datasets: [{
      data: [compliantCount, inProgressCount, notCompliantCount],
      backgroundColor: [
        '#10b981', // emerald-500
        '#f59e0b', // amber-500
        '#f43f5e'  // rose-500
      ],
      borderColor: '#fdfcfb',
      borderWidth: 4,
      hoverOffset: 8
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          boxWidth: 12,
          usePointStyle: true,
        }
      },
      tooltip: {
        enabled: true,
      }
    }
  };

  const updateStatus = (id, newStatus) => {
    setHipaaComplianceData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800';
      case 'Not Compliant':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ComplianceTable = ({ category }) => {
    const categoryData = hipaaComplianceData.filter(item => item.category === category);

    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <p 
          className="text-gray-600 mb-6" 
          dangerouslySetInnerHTML={{ __html: introTexts[category] }}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Control
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categoryData.map(item => (
                <React.Fragment key={item.id}>
                  <tr 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleRowExpansion(item.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">
                      {item.control}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select 
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                        value={item.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(item.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {statusOptions.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {expandedRows.has(item.id) && (
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="px-6 py-4">
                        <div className="space-y-4">
                          <div>
                            <strong className="font-semibold text-gray-700">Description:</strong>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <div>
                            <strong className="font-semibold text-gray-700">Question:</strong>
                            <p className="text-gray-600 mt-1">{item.question}</p>
                          </div>
                          <div>
                            <strong className="font-semibold text-gray-700">Details to Check:</strong>
                            <p className="text-gray-600 mt-1">{item.details}</p>
                          </div>
                          <div>
                            <strong className="font-semibold text-gray-700">Testing Steps:</strong>
                            <p className="text-gray-600 mt-1">{item.steps}</p>
                          </div>
                          <div>
                            <strong className="font-semibold text-gray-700">Risk:</strong>
                            <p className="text-gray-600 mt-1">{item.risk}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            HIPAA Compliance Assessment
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Interactive Tool for Healthcare Organizations
          </p>
        </header>

        <main>
          {/* Dashboard Section */}
          <section className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Compliance Overview
            </h2>
            <p className="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
              This dashboard provides a real-time summary of your organization's HIPAA compliance status. 
              Update the status of each control in the sections below, and the chart and statistics will 
              automatically reflect your current compliance posture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 flex flex-col justify-center items-center">
                <div className="w-80 h-80 relative">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <h3 className="text-gray-500 font-medium">Total Controls</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{totalControls}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl text-center">
                  <h3 className="text-gray-500 font-medium">Compliant</h3>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">{compliantCount}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <h3 className="text-gray-500 font-medium">In Progress</h3>
                  <p className="text-3xl font-bold text-amber-600 mt-1">{inProgressCount}</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-xl text-center">
                  <h3 className="text-gray-500 font-medium">Not Compliant</h3>
                  <p className="text-3xl font-bold text-rose-600 mt-1">{notCompliantCount}</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Navigation Tabs */}
          <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-medium py-2 px-5 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-indigo-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content Panes */}
          <div>
            <ComplianceTable category={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HIPAAComplianceAssessment;