import api from './axios.config';

export const documentsAPI = {
  upload: async (consultationId, formData) => {
    // Simulate file upload to db.json
    const file = formData.get('file');
    const documentData = {
      consultationId: parseInt(consultationId),
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : 'image',
      url: `/uploads/${file.name}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    return api.post('/documents', documentData);
  },

  getByConsultation: (consultationId) => {
    return api.get(`/documents?consultationId=${consultationId}`);
  },

  delete: (id) => api.delete(`/documents/${id}`),

  download: (id) => {
    // Simulate download
    return api.get(`/documents/${id}`);
  },
};
