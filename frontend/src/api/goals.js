import api from './auth';

export const getGoals = async () => {
  const response = await api.get('/goals/');
  return response.data;
};

export const createGoal = async (goalData) => {
    const response = await api.post('/goals/', goalData);
    return response.data;
};

export const updateGoalStatus = async (goalId, status) => {
  const response = await api.patch(`/goals/${goalId}/complete/`, { status });
  return response.data;
};