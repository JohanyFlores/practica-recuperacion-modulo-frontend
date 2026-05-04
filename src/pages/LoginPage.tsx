import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import NaveRickGif from '/Nave_Rick.gif';
import './LoginPage.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      authService.saveAuth(response.token, email);
      navigate('/characters');
    } catch (err) {
      setError('Credenciales incorrectas. Intenta con: eve.holt@reqres.in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Nave de Rick moviéndose */}
      <div className="floating-ship">
        <img src={NaveRickGif} alt="Rick's ship" />
      </div>

      <div className="login-container">
        <div className="login-header">
          <h1>Rick and Morty</h1>
          <p>Inicia sesión para explorar el multiverso</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eve.holt@reqres.in"
              required
              className={error ? 'input-error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="cityslicka"
              required
              className={error ? 'input-error' : ''}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <span style={{ display: 'inline-block', width: '20px', height: '20px' }}>
                  <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #00ff88', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </span>
                Iniciando sesión...
              </span>
            ) : 'Iniciar Sesión'}
          </button>

          <div className="login-hint">
            <p>
              <strong>Pista:</strong> Usa <code>eve.holt@reqres.in</code> / <code>cityslicka</code>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
