import { RickFace, MortyFace } from './icons';
import './BackgroundPattern.css';

export const BackgroundPattern = () => {
  // Calculamos cuántos iconos necesitamos basados en el tamaño de la pantalla
  const iconSize = 80; // tamaño de cada icono
  const iconsPerRow = Math.ceil(window.innerWidth / iconSize) + 2;
  const rows = Math.ceil(window.innerHeight / iconSize) + 2;

  return (
    <div className="background-pattern">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="pattern-row">
          {Array.from({ length: iconsPerRow }).map((_, colIndex) => {
            // Alternamos Rick y Morty
            const isRick = (rowIndex + colIndex) % 2 === 0;
            return isRick ? (
              <RickFace key={colIndex} size={iconSize} className="pattern-icon" />
            ) : (
              <MortyFace key={colIndex} size={iconSize} className="pattern-icon" />
            );
          })}
        </div>
      ))}
    </div>
  );
};
