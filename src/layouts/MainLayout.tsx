import { Outlet } from 'react-router-dom';
import { HamburgerMenu } from '../components/HamburgerMenu';
import './MainLayout.css';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="header">
        {/* Partículas flotantes */}
        <div className="header-particles">
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
          <span className="header-particle"></span>
        </div>
        
        <div className="header-content">
          <HamburgerMenu />
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Práctica de Recuperación - Frontend Frameworks</p>
      </footer>
    </div>
  );
};
