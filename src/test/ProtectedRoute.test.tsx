import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../guards/ProtectedRoute';
import { authService } from '../services/authService';

vi.mock('../services/authService', () => ({
  authService: {
    isAuthenticated: vi.fn(),
  },
}));

describe('ProtectedRoute', () => {
  it('should render children when user is authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);

    const { getByText } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);

    const { queryByText } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
