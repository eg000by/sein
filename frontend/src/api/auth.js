import axios from "axios";

export const API_URL = "http://localhost:8000/api";

export const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/register/`, {
    username,
    password,
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, {
    username,
    password,
  });
  return response.data;
};

// src/api/auth.js
export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: localStorage.getItem('refresh')
    });
    localStorage.setItem('access', response.data.access);
    return response.data.access;
  } catch (error) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/login';
    return null;
  }
};

// Создаем axios instance
const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};