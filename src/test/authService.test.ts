import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from '../services/authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should login successfully with valid credentials', async () => {
    const result = await authService.login({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
    
    expect(result.token).toBeDefined();
    expect(result.token).toContain('fake-jwt-token');
  });

  it('should reject invalid credentials', async () => {
    await expect(
      authService.login({
        email: 'wrong@example.com',
        password: 'wrongpass',
      })
    ).rejects.toThrow();
  });

  it('should save authentication data', () => {
    const token = 'test-token-123';
    const email = 'test@example.com';

    authService.saveAuth(token, email);

    expect(localStorage.getItem('token')).toBe(token);
    expect(localStorage.getItem('user')).toBe(email);
  });

  it('should check if user is authenticated', () => {
    expect(authService.isAuthenticated()).toBe(false);

    localStorage.setItem('token', 'test-token');
    expect(authService.isAuthenticated()).toBe(true);
  });

  it('should get token from localStorage', () => {
    expect(authService.getToken()).toBeNull();

    const token = 'test-token-456';
    localStorage.setItem('token', token);
    expect(authService.getToken()).toBe(token);
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', 'test@example.com');

    authService.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
