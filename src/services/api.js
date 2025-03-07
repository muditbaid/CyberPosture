const API_BASE_URL = 'https://cyberpostureapi-d6gvdtbjhwf4btdr.canadacentral-01.azurewebsites.net';

export const apiService = {
  // Authentication
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  // Assessments
  getAssessments: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/assessments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch assessments');
    }
  },

  // Submit consultation request
  submitConsultation: async (consultationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/consultation/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to submit consultation request');
    }
  },

  // Get assessment progress
  getAssessmentProgress: async (assessmentId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/assessments/${assessmentId}/progress`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch assessment progress');
    }
  },

  getControls: async (assessmentId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/GetControls/${assessmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch controls');
    }
  },

  submitControlResponse: async (assessmentId, controlId, responseData, token) => {
    try {
      // First, check if we have all required data
      if (!assessmentId || !controlId || !responseData.response) {
        throw new Error('Missing required data');
      }

      const response = await fetch(`${API_BASE_URL}/SubmitResponse`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assessmentId: assessmentId,
          controlId: controlId,
          response: responseData.response,
          timestamp: new Date().toISOString(), // Add submission timestamp
          status: 'completed'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Submission response:', data); // For debugging
      return data;
    } catch (error) {
      console.error('Submission error:', error);
      throw new Error('Failed to submit control response: ' + error.message);
    }
  },
}; 