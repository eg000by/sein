import api from './auth';

export const saveUserValues = (values) => {
    return api.post('/user/values/', { values });
};

export const getUserValues = async () => {
    const response = await api.get('/user/values/');
    return response.data;
};