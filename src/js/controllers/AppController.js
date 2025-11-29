/**
 * Controller Principal da Aplicação
 */

import { CountryService } from '../services/CountryService.js';
import { CountryView } from '../views/CountryView.js';
import { DOM_SELECTORS, DEBOUNCE_DELAY } from '../config/constants.js';
import { 
  selectElement, 
  setHTML, 
  getInputValue, 
  addEventListener 
} from '../utils/domUtils.js';
import { debounce } from '../utils/debounce.js';

export class AppController {
  constructor() {
    this.countryService = new CountryService();
    this.elements = {};
  }

  /**
   * Inicializa a aplicação
   */
  async init() {
    try {
      console.log('[Controller] Inicializando aplicação...');
      
      this._cacheElements();
      this._validateElements();
      await this._loadCountries();
      this._setupEventListeners();
      this._setupCountryCardListeners();

      console.log('[Controller] Aplicação inicializada com sucesso ✅');
    } catch (error) {
      console.error('[Controller] Erro ao inicializar:', error);
      this._renderError(error.message);
    }
  }


  _cacheElements() {
    this.elements = {
      searchInput: selectElement(DOM_SELECTORS.SEARCH_INPUT),
      continentFilter: selectElement(DOM_SELECTORS.CONTINENT_FILTER),
      countriesList: selectElement(DOM_SELECTORS.COUNTRIES_LIST),
    };
  }

  /**
   * Valida se elementos existem
   */
  _validateElements() {
    const { searchInput, continentFilter, countriesList } = this.elements;

    if (!searchInput || !continentFilter || !countriesList) {
      console.error('[Controller] Elementos do DOM não encontrados');
      throw new Error('Elementos do DOM não encontrados');
    }
  }

  /**
   * Carrega países da API
   */
  async _loadCountries() {
  try {
    this._renderLoading();
    const countries = await this.countryService.loadAllCountries();
    this._renderCountries(countries);
  } catch (err) {
    this._renderError('Falha ao carregar países. Verifique sua conexão.');
  }
}


  /**
   * Configura event listeners
   */
  _setupEventListeners() {
    const debouncedFilter = debounce(
      () => this._handleFilter(),
      DEBOUNCE_DELAY
    );

    addEventListener(this.elements.searchInput, 'input', debouncedFilter);
    addEventListener(this.elements.continentFilter, 'change', () => this._handleFilter());
  }

  /**
   * Manipula filtros
   */
  _handleFilter() {
    const searchTerm = getInputValue(this.elements.searchInput);
    const region = getInputValue(this.elements.continentFilter);

    console.log('[Controller] Aplicando filtros:', { searchTerm, region });

    const filteredCountries = this.countryService.filterCountries(searchTerm, region);
    
    this._renderCountries(filteredCountries);
  }

  /**
   * Renderiza lista de países
   */
  _renderCountries(countries) {
    const html = CountryView.renderList(countries);
    setHTML(this.elements.countriesList, html);
  }

  /**
   * Renderiza loading
   */
  _renderLoading() {
    const html = CountryView.renderLoading();
    setHTML(this.elements.countriesList, html);
  }

  /**
   * Renderiza erro
   */
  _renderError(errorMessage) {
    const html = CountryView.renderError(errorMessage);
    setHTML(this.elements.countriesList, html);
  }
  _setupCountryCardListeners() {
  addEventListener(document, 'click', async (e) => {

    if (e.target.matches('[data-details]')) {
      const code = e.target.dataset.details;
      await this._openDetailsModal(code);
    }

   
    if (e.target.matches('[data-fav]')) {
      const code = e.target.dataset.fav;
      this.countryService.toggleFavorite(code);
      e.target.classList.toggle('favorite');
    }

    
    if (e.target.id === 'modal-overlay' || e.target.id === 'modal-close') {
      document.querySelector('#modal-overlay').remove();
    }

   
    if (e.target.id === 'fav-toggle') {
      const overlay = document.querySelector('#modal-overlay');
      const code = overlay.dataset.code;
      const updated = this.countryService.toggleFavorite(code);

      e.target.textContent = updated
        ? '★ Remover dos favoritos'
        : '☆ Adicionar aos favoritos';
    }
  });
}
async _openDetailsModal(code) {
  try {
    const data = await this.countryService.getCountryByCode(code);
    const isFav = this.countryService.isFavorite(code);

    const html = CountryView.renderDetailsModal(data, isFav);

    document.body.insertAdjacentHTML('beforeend', html);

  } catch (error) {
    alert('Erro ao carregar detalhes do país.');
  }
}
}