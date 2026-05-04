import type { LoginRequest, LoginResponse } from '../types';

// Credenciales válidas para el login simulado
const VALID_USERS = [
  { email: 'eve.holt@reqres.in', password: 'cityslicka' },
  { email: 'eve.holt@reqres.in', password: 'pistol' },
  { email: 'test@test.com', password: 'test123' },
];

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validar credenciales
    const isValid = VALID_USERS.some(
      user => user.email === credentials.email && user.password === credentials.password
    );
    
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    
    // Retornar token simulado
    return { token: `fake-jwt-token-${Date.now()}` };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  saveAuth: (token: string, email: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', email);
  },
};
