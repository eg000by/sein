import api from './auth';

export const saveUserValues = (values) => {
    return api.post('/user/values/', { values });
};