import api from './axios.config';
import { consultationFromApi, consultationToApi, extractCollection, extractEntity } from './transformers';

export const consultationsAPI = {
  getAll: () =>
    api.get('/consultations').then((response) => ({
      ...response,
      data: extractCollection(response.data).map(consultationFromApi),
    })),
  getById: (id) =>
    api.get(`/consultations/${id}`).then((response) => ({
      ...response,
      data: consultationFromApi(response.data),
    })),
  getByAnimal: (animalId) =>
    api.get(`/animals/${animalId}/consultations`).then((response) => ({
      ...response,
      data: extractCollection(response.data).map(consultationFromApi),
    })),
  create: (data) =>
    api.post('/consultations', consultationToApi(data)).then((response) => ({
      ...response,
      data: consultationFromApi(extractEntity(response.data, 'consultation')),
    })),
  update: (id, data) =>
    api.put(`/consultations/${id}`, consultationToApi(data)).then((response) => ({
      ...response,
      data: consultationFromApi(extractEntity(response.data, 'consultation')),
    })),
  delete: (id) => api.delete(`/consultations/${id}`),
};
