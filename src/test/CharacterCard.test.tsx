import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '../components/CharacterCard';
import type { Character } from '../types';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

describe('CharacterCard', () => {
  it('should render character name', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should render character status', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });

  it('should render character species', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('should render character location', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  it('should render character image', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    
    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('should call onClick when card is clicked', () => {
    const handleClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={handleClick} />);
    
    const card = screen.getByText('Rick Sanchez').closest('.character-card');
    if (card) fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
