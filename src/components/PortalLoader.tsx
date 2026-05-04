import './PortalLoader.css';

interface PortalLoaderProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export const PortalLoader = ({ size = 'medium', message }: PortalLoaderProps) => {
  const sizeClass = `portal-loader-${size}`;
  
  return (
    <div className="portal-loader-container">
      <div className={`portal-loader ${sizeClass}`}>
        <div className="portal-ring portal-ring-1"></div>
        <div className="portal-ring portal-ring-2"></div>
        <div className="portal-ring portal-ring-3"></div>
        <div className="portal-center"></div>
        <div className="portal-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--angle': `${(i * 30)}deg`,
                '--delay': `${i * 0.1}s`,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>
      </div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};
