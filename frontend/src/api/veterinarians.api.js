import api from './axios.config';
import { extractCollection, extractEntity } from './transformers';

const veterinarianFromApi = (vet) => ({
  id: vet?.id,
  fullName: vet?.fullName || '',
  email: vet?.email || '',
  role: vet?.role || '',
  createdAt: vet?.created_at || '',
});

export const veterinariansAPI = {
  getAll: () =>
    api.get('/admin/veterinarians').then((response) => ({
      ...response,
      data: extractCollection(response.data).map(veterinarianFromApi),
    })),
  create: (data) =>
    api.post('/admin/veterinarians', data).then((response) => ({
      ...response,
      data: veterinarianFromApi(extractEntity(response.data, 'veterinarian')),
    })),
  update: (id, data) =>
    api.put(`/admin/veterinarians/${id}`, data).then((response) => ({
      ...response,
      data: veterinarianFromApi(extractEntity(response.data, 'veterinarian')),
    })),
  delete: (id) => api.delete(`/admin/veterinarians/${id}`),
};
