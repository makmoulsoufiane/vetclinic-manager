import api from './axios.config';
import { animalFromApi, animalToApi, extractCollection, extractEntity } from './transformers';

export const animalsAPI = {
  getAll: () =>
    api.get('/animals').then((response) => ({
      ...response,
      data: extractCollection(response.data).map(animalFromApi),
    })),
  getById: (id) =>
    api.get(`/animals/${id}`).then((response) => ({
      ...response,
      data: animalFromApi(response.data),
    })),
  create: (data) =>
    api.post('/animals', animalToApi(data)).then((response) => ({
      ...response,
      data: animalFromApi(extractEntity(response.data, 'animal')),
    })),
  update: (id, data) =>
    api.put(`/animals/${id}`, animalToApi(data)).then((response) => ({
      ...response,
      data: animalFromApi(extractEntity(response.data, 'animal')),
    })),
  delete: (id) => api.delete(`/animals/${id}`),
};
