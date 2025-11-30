/**
 * Serviço de Países - Lógica de Negócio
 */

import { CountryRepository } from '../repositories/CountryRepository.js';

export class CountryService {
  constructor() {
    this.repository = new CountryRepository();
    this.countries = [];
  }

  /**
   * Carrega todos os países
   */
  async loadAllCountries() {
    try {
      this.countries = await this.repository.fetchAll();
      console.log(`[Service] ${this.countries.length} países carregados com sucesso`);
      return this.countries;
    } catch (error) {
      console.error('[Service] Erro ao carregar países:', error);
      throw error;
    }
  }

  /**
   * Filtra países por termo de busca e região
   */
  filterCountries(searchTerm = '', region = '') {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    const filtered = this.countries.filter(country => {
      const matchesSearch = country.matchesSearch(normalizedSearch);
      const matchesRegion = country.matchesRegion(region);
      return matchesSearch && matchesRegion;
    });

    console.log(`[Service] Filtro aplicado: ${filtered.length} países encontrados`);
    
    return filtered;
  }

  /**
   * Retorna países favoritos
   */
  getFavoriteCountries(favoriteCodes) {
    return this.countries.filter(country => {
      const code = country.getCode();
      return favoriteCodes.has(code);
    });
  }

  /**
   * Busca detalhes completos de um país
   */
  async getCountryDetails(code) {
    try {
      console.log('[Service] Buscando detalhes do país:', code);
      return await this.repository.fetchByCode(code);
    } catch (error) {
      console.error('[Service] Erro ao buscar detalhes:', error);
      throw error;
    }
  }

  /**
   * Busca país por código nos dados já carregados
   */
  findCountryByCode(code) {
    return this.countries.find(country => country.getCode() === code) || null;
  }

  /**
   * Retorna todos os países carregados
   */
  getAllCountries() {
    return this.countries;
  }
}