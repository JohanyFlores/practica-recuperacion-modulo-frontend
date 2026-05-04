import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from '../components/CharacterCard.tsx';
import { SkeletonCard } from '../components/SkeletonCard';
import './CharacterListPage.css';

export const CharacterListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const statusFilter = searchParams.get('status') || undefined;
  const speciesFilter = searchParams.get('species') || undefined;
  const genderFilter = searchParams.get('gender') || undefined;
  const [searchTerm, setSearchTerm] = useState('');

  // Usar los filtros directamente en la API
  const { data, loading, error } = useCharacters({
    page,
    status: statusFilter,
    species: speciesFilter,
    gender: genderFilter
  });

  // Filtrar por nombre localmente (búsqueda instantánea sin llamar API en cada tecla)
  const filteredCharacters = useMemo(() => {
    if (!data?.results) return [];
    
    if (!searchTerm) return data.results;
    
    return data.results.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data?.results, searchTerm]);

  if (loading) {
    return (
      <div className="character-list-page">
        <div className="page-header">
          <h2>Directorio Interdimensional</h2>
          <p>Cargando personajes del multiverso...</p>
        </div>
        <div className="characters-grid">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="character-list-page">
      <div className="page-header">
        <h2>Directorio Interdimensional</h2>
        <p>Explora todos los personajes del multiverso</p>
        {filteredCharacters.length > 0 && (
          <p style={{ color: '#22c55e', marginTop: '0.5rem', fontWeight: 600 }}>
            {filteredCharacters.length} personaje{filteredCharacters.length !== 1 ? 's' : ''} encontrado{filteredCharacters.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Barra de búsqueda simple */}
      <div style={{
        marginBottom: '2rem',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto 2rem'
      }}>
        <input
          type="text"
          placeholder="🔍 Buscar personaje..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            fontSize: '1rem',
            background: 'rgba(30, 27, 75, 0.5)',
            border: '2px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            color: 'white',
            outline: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#22c55e';
            e.target.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(34, 197, 94, 0.3)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Indicador de filtros activos */}
      {(statusFilter || speciesFilter || genderFilter) && (
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          alignItems: 'center'
        }}>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>Filtros activos:</span>
          {statusFilter && (
            <span style={{
              padding: '0.5rem 1rem',
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22c55e',
              borderRadius: '20px',
              color: 'white',
              fontSize: '0.9rem'
            }}>
              Estado: {statusFilter}
            </span>
          )}
          {speciesFilter && (
            <span style={{
              padding: '0.5rem 1rem',
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22c55e',
              borderRadius: '20px',
              color: 'white',
              fontSize: '0.9rem'
            }}>
              Especie: {speciesFilter}
            </span>
          )}
          {genderFilter && (
            <span style={{
              padding: '0.5rem 1rem',
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22c55e',
              borderRadius: '20px',
              color: 'white',
              fontSize: '0.9rem'
            }}>
              Género: {genderFilter}
            </span>
          )}
          <button
            onClick={() => {
              navigate('/characters?page=1');
            }}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #ef4444',
              borderRadius: '20px',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ✕ Limpiar filtros
          </button>
        </div>
      )}

      <div className="characters-grid">
        {filteredCharacters.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            color: '#22c55e'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No se encontraron personajes</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Intenta ajustar los filtros o buscar otro término
            </p>
          </div>
        ) : (
          filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => navigate(`/characters/${character.id}`)}
            />
          ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', Math.max(1, page - 1).toString());
            setSearchParams(newParams);
          }}
          disabled={!data?.info.prev}
          className="pagination-btn"
        >
          ← Anterior
        </button>
        <span className="pagination-info">
          Página {page} de {data?.info.pages}
        </span>
        <button
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', (page + 1).toString());
            setSearchParams(newParams);
          }}
          disabled={!data?.info.next}
          className="pagination-btn"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};
