import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust to your Python backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postBirthData = async (birthData) => {
  try {
    const response = await api.post('/birth-stats', birthData);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
};

// Add more API calls as needed
export default api;