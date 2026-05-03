import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchSteps = async (role) => {
  const res = await axios.get(`${API_URL}/steps`, { params: { role } });
  return res.data;
};

export const fetchTimeline = async () => {
  const res = await axios.get(`${API_URL}/timeline`);
  return res.data;
};

export const sendChatMessage = async (message, context, userType, complexity, language) => {
  const res = await axios.post(`${API_URL}/chat`, {
    message, context, userType, complexity, language
  });
  return res.data;
};

export const getGuide = async (role, goal) => {
  const res = await axios.post(`${API_URL}/guide`, { role, goal });
  return res.data;
};
