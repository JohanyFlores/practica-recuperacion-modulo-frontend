import { rickAndMortyApi } from '../api/client';
import type { Character, CharactersResponse } from '../types';

interface CharacterFilters {
  page?: number;
  status?: string;
  species?: string;
  gender?: string;
  name?: string;
}

export const characterService = {
  getCharacters: async (filters: CharacterFilters = {}): Promise<CharactersResponse> => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.species && filters.species !== 'all') params.append('species', filters.species);
    if (filters.gender && filters.gender !== 'all') params.append('gender', filters.gender);
    if (filters.name) params.append('name', filters.name);
    
    const queryString = params.toString();
    const url = queryString ? `/character?${queryString}` : '/character';
    
    const response = await rickAndMortyApi.get<CharactersResponse>(url);
    return response.data;
  },

  getCharacterById: async (id: number): Promise<Character> => {
    const response = await rickAndMortyApi.get<Character>(`/character/${id}`);
    return response.data;
  },

  // Rick and Morty API es de solo lectura, pero simulamos la edición
  updateCharacter: async (id: number, data: Partial<Character>): Promise<Character> => {
    // Simular una actualización exitosa
    // En una API real, esto haría un POST o PUT
    const character = await characterService.getCharacterById(id);
    return { ...character, ...data };
  },
};
