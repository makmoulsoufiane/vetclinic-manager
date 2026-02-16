import api from './axios.config';
import { extractCollection, extractEntity, ownerFromApi, ownerToApi } from './transformers';

export const ownersAPI = {
  getAll: () =>
    api.get('/owners').then((response) => ({
      ...response,
      data: extractCollection(response.data).map(ownerFromApi),
    })),
  getById: (id) =>
    api.get(`/owners/${id}`).then((response) => ({
      ...response,
      data: ownerFromApi(response.data),
    })),
  create: (data) =>
    api.post('/owners', ownerToApi(data)).then((response) => ({
      ...response,
      data: ownerFromApi(extractEntity(response.data, 'owner')),
    })),
  update: (id, data) =>
    api.put(`/owners/${id}`, ownerToApi(data)).then((response) => ({
      ...response,
      data: ownerFromApi(extractEntity(response.data, 'owner')),
    })),
  delete: (id) => api.delete(`/owners/${id}`),
  search: (query) =>
    api.get(`/owners?search=${encodeURIComponent(query)}`).then((response) => ({
      ...response,
      data: extractCollection(response.data).map(ownerFromApi),
    })),
};
