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

  getAllCountries() {
    return this.countries;
  }
  async getCountryByCode(code) {
  try {
    const data = await this.repository.fetchByCode(code);
    return data; // dados brutos da API; view tratará
  } catch (err) {
    throw new Error('Não foi possível carregar detalhes do país.');
  }
}
toggleFavorite(code) {
  const favs = this.getFavorites();

  if (favs.includes(code)) {
    const updated = favs.filter(c => c !== code);
    localStorage.setItem('favoriteCountries', JSON.stringify(updated));
    return false; // removido
  } else {
    favs.push(code);
    localStorage.setItem('favoriteCountries', JSON.stringify(favs));
    return true; // adicionado
  }
}

getFavorites() {
  return JSON.parse(localStorage.getItem('favoriteCountries') || '[]');
}

isFavorite(code) {
  return this.getFavorites().includes(code);
}
}