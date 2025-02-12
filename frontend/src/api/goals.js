import api from './auth';

export const getGoals = async () => {
  const response = await api.get('/goals/');
  return response.data;
};

export const createGoal = async (goalData) => {
    const response = await api.post('/goals/', goalData);
    return response.data;
};