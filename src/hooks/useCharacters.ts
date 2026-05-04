import { useState, useEffect } from 'react';
import { characterService } from '../services/characterService';
import type { Character, CharactersResponse } from '../types';

interface UseCharactersFilters {
  page?: number;
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
}

export const useCharacters = (filters: UseCharactersFilters = {}) => {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await characterService.getCharacters(filters);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar personajes');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filters.page, filters.status, filters.species, filters.gender, filters.name]);

  return { data, loading, error };
};

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await characterService.getCharacterById(id);
        setCharacter(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar personaje');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return { character, loading, error, setCharacter };
};
