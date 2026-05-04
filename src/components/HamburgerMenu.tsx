import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './HamburgerMenu.css';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const handleStatusFilter = (status: string) => {
    setIsOpen(false);
    navigate(`/characters?status=${status}&page=1`);
  };

  const handleSpeciesFilter = (species: string) => {
    setIsOpen(false);
    navigate(`/characters?species=${species}&page=1`);
  };

  const handleGenderFilter = (gender: string) => {
    setIsOpen(false);
    navigate(`/characters?gender=${gender}&page=1`);
  };

  return (
    <>
      {/* Botón Hamburguesa - se queda en el header */}
      <button 
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
        style={{ 
          position: 'relative',
          zIndex: 10002
        }}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Portal - Overlay y Menú se renderizan directo en body */}
      {createPortal(
        <>
          {/* Overlay */}
          {isOpen && (
            <div 
              className="menu-overlay" 
              onClick={toggleMenu}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
                zIndex: 9998
              }}
            ></div>
          )}

          {/* Menú Lateral */}
          <nav 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '320px',
              height: '100vh',
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
              boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              borderRight: '3px solid #22c55e'
            }}
          >
        <div className="menu-header">
          <h2>🛸 Multiverso Hub</h2>
        </div>

        <div className="menu-content">
          {/* Navegación Principal */}
          <div className="menu-section">
            <button className="menu-item" onClick={() => handleNavigation('/characters')}>
              <span className="menu-icon">🏠</span>
              <span>Todos los Personajes</span>
            </button>
          </div>

          {/* Filtros por Estado */}
          <div className="menu-section">
            <div className="menu-section-title">Por Estado</div>
            <button className="menu-item filter-item" onClick={() => handleStatusFilter('alive')}>
              <span className="menu-icon">✅</span>
              <span>Vivos</span>
            </button>
            <button className="menu-item filter-item" onClick={() => handleStatusFilter('dead')}>
              <span className="menu-icon">💀</span>
              <span>Muertos</span>
            </button>
            <button className="menu-item filter-item" onClick={() => handleStatusFilter('unknown')}>
              <span className="menu-icon">❓</span>
              <span>Desconocido</span>
            </button>
          </div>

          {/* Filtros por Especie */}
          <div className="menu-section">
            <div className="menu-section-title">Por Especie</div>
            <button className="menu-item filter-item" onClick={() => handleSpeciesFilter('Human')}>
              <span className="menu-icon">👤</span>
              <span>Humanos</span>
            </button>
            <button className="menu-item filter-item" onClick={() => handleSpeciesFilter('Alien')}>
              <span className="menu-icon">👽</span>
              <span>Aliens</span>
            </button>
            <button className="menu-item filter-item" onClick={() => handleSpeciesFilter('Mythological Creature')}>
              <span className="menu-icon">🐉</span>
              <span>Criaturas Míticas</span>
            </button>
            <button className="menu-item filter-item" onClick={() => handleSpeciesFilter('Animal')}>
              <span className="menu-icon">🐾</span>
              <span>Animales</span>
            </button>
          </div>

          {/* Filtros por Género */}
          <div className="menu-section">
            <div className="menu-section-title">Por Género</div>
            <button className="menu-item filter-item" onClick={() => handleGenderFilter('Male')}>
              <span className="menu-icon">♂️</span>
              <span>Masculino</span>
            </button>
            <button className="menu-item filter-item" onClick={() => handleGenderFilter('Female')}>
              <span className="menu-icon">♀️</span>
              <span>Femenino</span>
            </button>
            <button className="menu-item filter-item" onClick={() => handleGenderFilter('Genderless')}>
              <span className="menu-icon">⚧️</span>
              <span>Sin Género</span>
            </button>
          </div>

          {/* Cerrar Sesión */}
          <div className="menu-section menu-section-logout">
            <button className="menu-item logout-item" onClick={handleLogout}>
              <span className="menu-icon">🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>
        </>,
        document.body
      )}
    </>
  );
};
