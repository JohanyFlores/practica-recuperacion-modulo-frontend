import axios from 'axios';

// Rick and Morty API client
export const rickAndMortyApi = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Reqres.in API client for authentication
export const authApi = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
