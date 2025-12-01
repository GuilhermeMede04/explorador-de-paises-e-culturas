/**
 * Controller Principal da Aplicação
 */

import { CountryService } from '../services/CountryService.js';
import { FavoritesService } from '../services/FavoritesService.js';
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
    this.favoritesService = new FavoritesService();
    this.elements = {};
    this.showingFavorites = false;
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
      this._updateFavoriteCount();
      
      console.log('[Controller] Aplicação inicializada com sucesso ✅');
    } catch (error) {
      console.error('[Controller] Erro ao inicializar:', error);
      this._renderError(error.message);
    }
  }

  /**
   * Armazena referências dos elementos DOM
   */
  _cacheElements() {
    this.elements = {
      searchInput: selectElement(DOM_SELECTORS.SEARCH_INPUT),
      continentFilter: selectElement(DOM_SELECTORS.CONTINENT_FILTER),
      countriesList: selectElement(DOM_SELECTORS.COUNTRIES_LIST),
      modalContainer: selectElement('#modal-container'),
      favCount: selectElement('#fav-count'),
      showFavoritesBtn: selectElement('#show-favorites-btn'),
      showAllBtn: selectElement('#show-all-btn'),
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
      appSpinner.show();
      const countries = await this.countryService.loadAllCountries();
      this._renderCountries(countries);
    } catch (error) {
      throw error;
    }
    finally{
      appSpinner.hide();
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

    addEventListener(this.elements.showFavoritesBtn, 'click', () => this._showFavorites());
    addEventListener(this.elements.showAllBtn, 'click', () => this._showAll());

    addEventListener(this.elements.countriesList, 'click', (e) => this._handleCardClick(e));

    addEventListener(this.elements.modalContainer, 'click', (e) => this._handleModalClick(e));
  }

  /**
   * Manipula filtros
   */
  _handleFilter() {
    if (this.showingFavorites) return; 

    const searchTerm = getInputValue(this.elements.searchInput);
    const region = getInputValue(this.elements.continentFilter);

    console.log('[Controller] Aplicando filtros:', { searchTerm, region });

    const filteredCountries = this.countryService.filterCountries(searchTerm, region);
    
    this._renderCountries(filteredCountries);
  }

  /**
   * Mostra apenas favoritos
   */
  _showFavorites() {
    this.showingFavorites = true;
    this.elements.showFavoritesBtn.style.display = 'none';
    this.elements.showAllBtn.style.display = 'inline-block';

    const favorites = this.favoritesService.getFavorites();
    const favoriteCountries = this.countryService.getFavoriteCountries(favorites);

    console.log('[Controller] Mostrando favoritos:', favoriteCountries.length);

    this._renderCountries(favoriteCountries);
  }

  /**
   * Mostra todos os países
   */
  _showAll() {
    this.showingFavorites = false;
    this.elements.showFavoritesBtn.style.display = 'inline-block';
    this.elements.showAllBtn.style.display = 'none';

    this._handleFilter();
  }

  /**
   * Manipula cliques nos cards
   */
  _handleCardClick(e) {
    const detailsBtn = e.target.closest('[data-details]');
    const favBtn = e.target.closest('[data-fav]');

    if (detailsBtn) {
      const code = detailsBtn.dataset.details;
      this._showDetails(code);
    } else if (favBtn) {
      const code = favBtn.dataset.fav;
      this._toggleFavorite(code, favBtn);
    }
  }

  /**
   * Mostra detalhes do país em modal
   */
  async _showDetails(code) {
    try {
      console.log('[Controller] Abrindo modal para:', code);

      // Mostra loading no modal
      setHTML(this.elements.modalContainer, '<div class="modal-overlay"><div class="modal">Carregando...</div></div>');

      const countryData = await this.countryService.getCountryDetails(code);
      const isFavorite = this.favoritesService.isFavorite(code);

      const modalHTML = CountryView.renderDetailsModal(countryData, isFavorite);
      setHTML(this.elements.modalContainer, modalHTML);

      // Adiciona classe ao body para prevenir scroll
      document.body.style.overflow = 'hidden';

    } catch (error) {
      console.error('[Controller] Erro ao abrir modal:', error);
      setHTML(this.elements.modalContainer, '');
    }
  }

  /**
   * Fecha modal
   */
  _closeModal() {
    setHTML(this.elements.modalContainer, '');
    document.body.style.overflow = '';
  }

  /**
   * Manipula cliques no modal
   */
  _handleModalClick(e) {
    const closeBtn = e.target.closest('#modal-close');
    const overlay = e.target.closest('.modal-overlay');
    const favToggle = e.target.closest('#fav-toggle');

    if (closeBtn || (overlay && e.target === overlay)) {
      this._closeModal();
    } else if (favToggle) {
      const code = favToggle.dataset.code;
      this._toggleFavoriteInModal(code, favToggle);
    }
  }

  /**
   * Alterna favorito
   * @private
   */
  _toggleFavorite(code, button) {
    const isFavorite = this.favoritesService.toggleFavorite(code);

    // Atualiza visual do botão
    if (isFavorite) {
      button.classList.add('favorite');
      button.textContent = '★';
      button.setAttribute('aria-label', 'Remover dos favoritos');
    } else {
      button.classList.remove('favorite');
      button.textContent = '☆';
      button.setAttribute('aria-label', 'Adicionar aos favoritos');
    }

    this._updateFavoriteCount();

    // Se está mostrando favoritos e removeu, atualiza a lista
    if (this.showingFavorites && !isFavorite) {
      this._showFavorites();
    }
  }

  /**
   * Alterna favorito no modal
   */
  _toggleFavoriteInModal(code, button) {
    const isFavorite = this.favoritesService.toggleFavorite(code);

    // Atualiza visual do botao no modal
    if (isFavorite) {
      button.classList.add('is-favorite');
      button.textContent = '★ Remover dos favoritos';
    } else {
      button.classList.remove('is-favorite');
      button.textContent = '☆ Adicionar aos favoritos';
    }

    this._updateFavoriteCount();

    // Atualiza o card na lista se estiver visivel
    const card = this.elements.countriesList?.querySelector(`[data-country="${code}"]`);
    if (card) {
      const cardFavBtn = card.querySelector('[data-fav]');
      if (cardFavBtn) {
        if (isFavorite) {
          cardFavBtn.classList.add('favorite');
          cardFavBtn.textContent = '★';
          cardFavBtn.setAttribute('aria-label', 'Remover dos favoritos');
        } else {
          cardFavBtn.classList.remove('favorite');
          cardFavBtn.textContent = '☆';
          cardFavBtn.setAttribute('aria-label', 'Adicionar aos favoritos');
        }
      }
    }
  }


  /**
   * Atualiza contador de favoritos
   */
  _updateFavoriteCount() {
    if (this.elements.favCount) {
      const count = this.favoritesService.getCount();
      this.elements.favCount.textContent = count;
    }
  }

  /**
   * Renderiza lista de países
   */
  _renderCountries(countries) {
    const favorites = this.favoritesService.getFavorites();
    const html = CountryView.renderList(countries, favorites);
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
}