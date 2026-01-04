import api from './axios.config';

export const authAPI = {
  login: async (credentials) => {
    // Simulate login with fake API
    const response = await api.get('/users');
    const user = response.data.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      return {
        data: {
          token: user.token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      };
    }
    throw new Error('Invalid credentials');
  },
  logout: () => Promise.resolve(),
  me: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return Promise.resolve({ data: user });
  },
};
