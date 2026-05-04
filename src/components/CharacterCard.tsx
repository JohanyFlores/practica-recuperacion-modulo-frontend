import type { Character } from '../types';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  return (
    <div className="character-card" onClick={onClick}>
      <div className="character-card-image">
        <img src={character.image} alt={character.name} />
        <div className={`status-indicator status-${character.status.toLowerCase()}`}>
          <span className="status-dot"></span>
          {character.status}
        </div>
      </div>
      <div className="character-card-content">
        <h3 className="character-name">{character.name}</h3>
        <div className="character-details">
          <p>
            <span className="detail-icon">🧬</span>
            {character.species}
          </p>
          <p>
            <span className="detail-icon">📍</span>
            {character.location.name}
          </p>
        </div>
      </div>
    </div>
  );
};
