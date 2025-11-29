/**
 * Repositório de Países - Acesso à API
 */

import { API_CONFIG } from '../config/constants.js';
import { Country } from '../models/Country.js';

export class CountryRepository {

  async fetchAll() {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ALL}?fields=${API_CONFIG.FIELDS}`;
      
      console.log('[Repository] Buscando países:', url);
      
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`[Repository] Erro HTTP: ${response.status} - ${response.statusText}`);
        throw new Error(`Erro na resposta da API: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('[Repository] Países recebidos:', data.length);
      
      return data.map(countryData => new Country(countryData));
      
    } catch (error) {
      console.error('[Repository] Erro ao buscar países:', error);
      throw error;
    }
  }
  async fetchByCode(code) {
  try {
    const url = `${API_CONFIG.BASE_URL}/alpha/${code}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Falha ao buscar detalhes do país.');
    const data = await response.json();
    return data[0];
  } catch (err) {
    console.error('[Repository] Erro ao buscar país por código:', err);
    throw err;
  }
}
}