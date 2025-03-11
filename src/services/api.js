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

  submitControlResponse: async (responseText) => {
    try {
      const response = await fetch(`${API_BASE_URL}/SubmitResponse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: responseText
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Submission error:', error);
      throw new Error('Failed to submit response');
    }
  },
}; 