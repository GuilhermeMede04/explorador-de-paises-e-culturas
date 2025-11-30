/**
 * Repositório de Países - Acesso à API
 */

import { API_CONFIG } from '../config/constants.js';
import { Country } from '../models/Country.js';

export class CountryRepository {
  /**
   * Busca todos os países da API (campos otimizados)
   */
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
      
      // Converte dados brutos em objetos Country
      return data.map(countryData => new Country(countryData));
      
    } catch (error) {
      console.error('[Repository] Erro ao buscar países:', error);
      throw error;
    }
  }

  /**
   * Busca detalhes completos de um país por código
   */
  async fetchByCode(code) {
    try {
      // Tenta buscar por código alpha (cca2/cca3)
      let url = `${API_CONFIG.BASE_URL}/alpha/${encodeURIComponent(code)}`;
      
      console.log('[Repository] Buscando detalhes:', url);
      
      let response = await fetch(url);

      // Se falhar, tenta buscar por nome
      if (!response.ok) {
        url = `${API_CONFIG.BASE_URL}/name/${encodeURIComponent(code)}?fullText=true`;
        console.log('[Repository] Tentando por nome:', url);
        response = await fetch(url);
      }

      if (!response.ok) {
        throw new Error(`País não encontrado: ${code}`);
      }

      const data = await response.json();
      
      // A API retorna array para busca por nome, objeto único para código
      const countryData = Array.isArray(data) ? data[0] : data;
      
      console.log('[Repository] Detalhes recebidos:', countryData.name?.common);
      
      return countryData;
      
    } catch (error) {
      console.error('[Repository] Erro ao buscar detalhes:', error);
      throw error;
    }
  }
}