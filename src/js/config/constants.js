/**
 * Configurações e Constantes da Aplicação
 */

export const API_CONFIG = {
  BASE_URL: 'https://restcountries.com/v3.1',
  ENDPOINTS: {
    ALL: '/all',
  },
  FIELDS: 'name,flags,capital,region,population,cca2,cca3,tld',
  TIMEOUT: 15000,
};

export const DOM_SELECTORS = {
  SEARCH_INPUT: '#country-search',
  CONTINENT_FILTER: '#continent-filter',
  COUNTRIES_LIST: '#countries-list',
};

export const MESSAGES = {
  LOADING: 'Carregando países...',
  ERROR_LOAD: '⚠️ Não foi possível carregar os dados.',
  NO_RESULTS: 'Nenhum país encontrado.',
  EMPTY_CAPITAL: 'N/A',
  EMPTY_REGION: 'N/A',
  RETRY_BUTTON: 'Tentar Novamente',
};

export const DEBOUNCE_DELAY = 300;