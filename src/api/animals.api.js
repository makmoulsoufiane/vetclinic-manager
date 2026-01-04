import api from './axios.config';

export const animalsAPI = {
  getAll: () => api.get('/animals'),
  getById: (id) => api.get(`/animals/${id}`),
  create: (data) => api.post('/animals', data),
  update: (id, data) => api.put(`/animals/${id}`, data),
  delete: (id) => api.delete(`/animals/${id}`),
};
