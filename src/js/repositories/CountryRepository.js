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
}