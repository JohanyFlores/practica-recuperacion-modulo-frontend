import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './CustomCursor.css';

interface Position {
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [position, setPosition] = useState<Position>({ x: -100, y: -100 });
  const [trail, setTrail] = useState<Position[]>([]);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPosition(newPos);
      
      // Añadir al trail
      setTrail(prev => [...prev.slice(-8), newPos]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return createPortal(
    <>
      {/* Trail de partículas */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `translate(-50%, -50%) scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}
      
      {/* Cursor principal - portal */}
      <div
        className={`custom-cursor ${isClicking ? 'clicking' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-ring cursor-ring-outer"></div>
        <div className="cursor-ring cursor-ring-middle"></div>
        <div className="cursor-core"></div>
      </div>
    </>,
    document.body
  );
};
