import api from './axios.config';

export const documentsAPI = {
  upload: (consultationId, formData) =>
    api.post(`/consultations/${consultationId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getByConsultation: (consultationId) =>
    api.get(`/consultations/${consultationId}/documents`),
  delete: (id) => api.delete(`/documents/${id}`),
  download: (id) => api.get(`/documents/${id}/download`, { responseType: 'blob' }),
};
