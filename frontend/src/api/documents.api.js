import api from './axios.config';
import { documentFromApi, extractCollection, extractEntity } from './transformers';

const API_ORIGIN = 'http://localhost:8000';

export const documentsAPI = {
  upload: async (consultationId, formData) => {
    const payload = new FormData();
    payload.append('consultation_id', consultationId);
    payload.append('fichier', formData.get('file'));
    if (formData.get('notes')) payload.append('notes', formData.get('notes'));

    return api
      .post('/documents', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => ({
        ...response,
        data: documentFromApi(extractEntity(response.data, 'document'), API_ORIGIN),
      }));
  },

  getByConsultation: (consultationId) => {
    return api.get(`/documents?consultation_id=${consultationId}`).then((response) => ({
      ...response,
      data: extractCollection(response.data).map((doc) => documentFromApi(doc, API_ORIGIN)),
    }));
  },

  delete: (id) => api.delete(`/documents/${id}`),

  download: (id) => api.get(`/documents/${id}/download`, { responseType: 'blob' }),
};
