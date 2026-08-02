import { API_BASE_URL, API_TIMEOUT_MS } from '@/pokemon/utils/pokemon.constants';
import axios, { AxiosError } from 'axios';

export const pokemonClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

pokemonClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    let errorMessage = 'Ha ocurrido un error inesperado al conectar con el servidor.';

    if (error.code === 'ECONNABORTED') {
      errorMessage = 'El tiempo de espera de la solicitud ha caducado. Reintenta por favor.';
    } else if (error.response) {
      if (error.response.status === 404) {
        errorMessage = 'Pokémon no encontrado en el sistema.';
      } else if (error.response.status >= 500) {
        errorMessage = 'Error del servidor PokeAPI. Intenta de nuevo más tarde.';
      }
    } else if (error.request) {
      errorMessage = 'Error de red. Revisa tu conexión a internet.';
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default pokemonClient;
