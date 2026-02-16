import api from './axios.config';
import { extractEntity } from './transformers';

export const authAPI = {
  login: (credentials) =>
    api.post('/auth/login', credentials).then((response) => {
      const user = extractEntity(response.data, 'user');
      return {
        ...response,
        data: {
          token: response.data?.token,
          user: {
            id: user?.id,
            name: user?.fullName || '',
            fullName: user?.fullName || '',
            email: user?.email || '',
            role: user?.role || '',
          },
        },
      };
    }),
  logout: () => api.post('/auth/logout'),
  me: () =>
    api.get('/user').then((response) => ({
      ...response,
      data: {
        id: response.data?.id,
        name: response.data?.fullName || '',
        fullName: response.data?.fullName || '',
        email: response.data?.email || '',
        role: response.data?.role || '',
      },
    })),
};
