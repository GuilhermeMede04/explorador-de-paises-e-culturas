/**
 * Serviço de Países - Lógica de Negócio
 */

import { CountryRepository } from '../repositories/CountryRepository.js';

export class CountryService {
  constructor() {
  this.repository = new CountryRepository();
  this.countries = [];
  this.favorites = this.getFavorites(); // ← ESSENCIAL
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

  getAllCountries() {
    return this.countries;
  }

  /**
   * Buscar detalhes completos por código (modal)
   */
  async getCountryByCode(code) {
    try {
      const data = await this.repository.fetchByCode(code);
      return data; // dados completos da API
    } catch (err) {
      throw new Error('Não foi possível carregar detalhes do país.');
    }
  }

  /**
   * Alternar favorito (add/remove)
   */
 toggleFavorite(code) {
  if (this.favorites.includes(code)) {
    this.favorites = this.favorites.filter(c => c !== code);
  } else {
    this.favorites.push(code);
  }

  localStorage.setItem('favoriteCountries', JSON.stringify(this.favorites));
  return this.favorites.includes(code);
}

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    } catch {
      return [];
    }
  }

  /**
   * Verifica se o país é favorito
   */
  isFavorite(code) {
    return this.favorites.includes(code);
  }

  /**
   * Retorna objetos Country dos favoritos
   */
  getFavoriteCountries() {
    return this.countries.filter(c => this.isFavorite(c.code));
  }
}
