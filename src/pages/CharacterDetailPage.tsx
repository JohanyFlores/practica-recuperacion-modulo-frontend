import { useState, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacters';
import { characterService } from '../services/characterService';
import './CharacterDetailPage.css';

export const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { character, loading, error, setCharacter } = useCharacter(Number(id));
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedStatus, setEditedStatus] = useState<'Alive' | 'Dead' | 'unknown'>('Alive');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEdit = () => {
    if (character) {
      setEditedName(character.name);
      setEditedStatus(character.status);
      setIsEditing(true);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!character) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      // Simulamos la actualización
      const updated = await characterService.updateCharacter(character.id, {
        name: editedName,
        status: editedStatus,
      });
      setCharacter(updated);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error al guardar:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando personaje...</p>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="error-container">
        <h2>❌ Error</h2>
        <p>{error || 'Personaje no encontrado'}</p>
        <button onClick={() => navigate('/characters')} className="back-btn">
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="character-detail-page">
      <button onClick={() => navigate('/characters')} className="back-btn">
        ← Volver al listado
      </button>

      {saveSuccess && (
        <div className="success-message">
          ✅ Los cambios se han guardado correctamente (simulado)
        </div>
      )}

      <div className="character-detail-container">
        <div className="character-image-section">
          <img src={character.image} alt={character.name} className="character-image" />
          <div className={`detail-status-badge status-${character.status.toLowerCase()}`}>
            {character.status}
          </div>
        </div>

        <div className="character-info-section">
          {!isEditing ? (
            <>
              <h1>{character.name}</h1>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">🧬 Especie:</span>
                  <span className="info-value">{character.species}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">⚧ Género:</span>
                  <span className="info-value">{character.gender}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">🌍 Origen:</span>
                  <span className="info-value">{character.origin.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📍 Ubicación:</span>
                  <span className="info-value">{character.location.name}</span>
                </div>
                {character.type && (
                  <div className="info-item">
                    <span className="info-label">🏷️ Tipo:</span>
                    <span className="info-value">{character.type}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">📺 Episodios:</span>
                  <span className="info-value">{character.episode.length}</span>
                </div>
              </div>
              <button onClick={handleEdit} className="edit-btn">
                ✏️ Editar Personaje
              </button>
            </>
          ) : (
            <form onSubmit={handleSave} className="edit-form">
              <h2>Editar Personaje</h2>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Estado</label>
                <select
                  id="status"
                  value={editedStatus}
                  onChange={(e) => setEditedStatus(e.target.value as any)}
                >
                  <option value="Alive">Alive</option>
                  <option value="Dead">Dead</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={saving} className="save-btn">
                  {saving ? 'Guardando...' : '💾 Guardar'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
              </div>
              <p className="edit-note">
                <strong>Nota:</strong> La API de Rick and Morty es de solo lectura. Los
                cambios son simulados localmente.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
