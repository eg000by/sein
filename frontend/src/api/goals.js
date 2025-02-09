import api from './auth';

export const getGoals = async () => {
  const response = await api.get('/goals/');
  return response.data;
};