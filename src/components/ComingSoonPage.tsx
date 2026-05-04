import './ComingSoon.css';

interface ComingSoonPageProps {
  title: string;
  icon: string;
  description: string;
}

export const ComingSoonPage = ({ title, icon, description }: ComingSoonPageProps) => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-content">
        <div className="coming-soon-icon">{icon}</div>
        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-description">{description}</p>
        <div className="portal-animation">
          <div className="portal-ring"></div>
          <div className="portal-ring"></div>
          <div className="portal-ring"></div>
        </div>
        <p className="coming-soon-subtitle">🛸 Próximamente en el Multiverso</p>
      </div>
    </div>
  );
};
