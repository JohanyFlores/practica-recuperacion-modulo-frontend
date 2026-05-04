import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PortalTransition.css';

export const PortalTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  if (!isTransitioning) return null;

  return (
    <div className="portal-transition">
      <div className="portal-container">
        <div className="portal-ring portal-ring-1"></div>
        <div className="portal-ring portal-ring-2"></div>
        <div className="portal-ring portal-ring-3"></div>
        <div className="portal-center"></div>
        <div className="portal-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--angle': `${(i * 18)}deg`,
              '--delay': `${i * 0.05}s`
            } as React.CSSProperties}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
