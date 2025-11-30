/**
 * Favorites Controller - Controlador da Página de Favoritos
 */

import { CountryService } from '../services/CountryService.js';
import { FavoritesService } from '../services/FavoritesService.js';
import { CountryView } from '../views/CountryView.js';
import { FavoritesView } from '../views/FavoritesView.js';
import { 
  selectElement, 
  setHTML, 
  addEventListener 
} from '../utils/domUtils.js';

export class FavoritesController {
  constructor() {
    this.countryService = new CountryService();
    this.favoritesService = new FavoritesService();
    this.elements = {};
    this.allCountries = [];
  }

  /**
   * Inicializa a página de favoritos
   */
  async init() {
    try {
      console.log('[FavoritesController] Inicializando...');
      
      this._cacheElements();
      this._validateElements();
      await this._loadCountries();
      this._setupEventListeners();
      this._renderFavorites();
      this._updateFavoriteCount();
      
      console.log('[FavoritesController] Inicializado com sucesso ✅');
    } catch (error) {
      console.error('[FavoritesController] Erro ao inicializar:', error);
      this._renderError(error.message);
    }
  }

  /**
   * Armazena referências dos elementos DOM
   */
  _cacheElements() {
    this.elements = {
      favoritesList: selectElement('#favorites-list'),
      modalContainer: selectElement('#modal-container'),
      favCount: selectElement('#fav-count'),
      clearAllBtn: selectElement('#clear-all-btn'),
      exportBtn: selectElement('#export-btn'),
    };
  }

  /**
   * Valida se elementos existem
   */
  _validateElements() {
    if (!this.elements.favoritesList) {
      throw new Error('Elemento #favorites-list não encontrado');
    }
  }

  /**
   * Carrega países da API
   */
  async _loadCountries() {
    try {
      this._renderLoading();
      this.allCountries = await this.countryService.loadAllCountries();
      console.log('[FavoritesController] Países carregados:', this.allCountries.length);
    } catch (error) {
      throw new Error('Erro ao carregar países');
    }
  }

  /**
   * Configura event listeners
   */
  _setupEventListeners() {
    addEventListener(this.elements.favoritesList, 'click', (e) => this._handleCardClick(e));

    if (this.elements.modalContainer) {
      addEventListener(this.elements.modalContainer, 'click', (e) => this._handleModalClick(e));
    }

    if (this.elements.clearAllBtn) {
      addEventListener(this.elements.clearAllBtn, 'click', () => this._handleClearAll());
    }

    if (this.elements.exportBtn) {
      addEventListener(this.elements.exportBtn, 'click', () => this._handleExport());
    }
  }

  /**
   * Renderiza favoritos
   */
  _renderFavorites() {
    const favoriteCodes = this.favoritesService.getFavorites();
    
    if (favoriteCodes.size === 0) {
      this._renderEmpty();
      this._toggleActionButtons(false);
      return;
    }

    const favoriteCountries = this.allCountries.filter(country => 
      favoriteCodes.has(country.getCode())
    );

    console.log('[FavoritesController] Renderizando', favoriteCountries.length, 'favoritos');

    const html = CountryView.renderList(favoriteCountries, favoriteCodes);
    setHTML(this.elements.favoritesList, html);
    this._toggleActionButtons(true);
  }

  /**
   * Renderiza estado vazio
   */
  _renderEmpty() {
    const html = FavoritesView.renderEmpty();
    setHTML(this.elements.favoritesList, html);
  }

  /**
   * Renderiza loading
   */
  _renderLoading() {
    const html = CountryView.renderLoading();
    setHTML(this.elements.favoritesList, html);
  }

  /**
   * Renderiza erro
   */
  _renderError(errorMessage) {
    const html = CountryView.renderError(errorMessage);
    setHTML(this.elements.favoritesList, html);
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
      this._removeFavorite(code);
    }
  }

  /**
   * Remove favorito
   */
  _removeFavorite(code) {
    const confirmed = confirm('Deseja remover este país dos favoritos?');
    
    if (confirmed) {
      this.favoritesService.removeFavorite(code);
      this._renderFavorites();
      this._updateFavoriteCount();
      
      console.log('[FavoritesController] Favorito removido:', code);
    }
  }

  /**
   * Mostra detalhes do país em modal
   */
  async _showDetails(code) {
    try {
      console.log('[FavoritesController] Abrindo modal para:', code);

      if (!this.elements.modalContainer) return;

      setHTML(this.elements.modalContainer, '<div class="modal-overlay"><div class="modal">Carregando...</div></div>');

      const countryData = await this.countryService.getCountryDetails(code);
      const isFavorite = this.favoritesService.isFavorite(code);

      const modalHTML = CountryView.renderDetailsModal(countryData, isFavorite);
      setHTML(this.elements.modalContainer, modalHTML);

      document.body.style.overflow = 'hidden';

    } catch (error) {
      console.error('[FavoritesController] Erro ao abrir modal:', error);
      if (this.elements.modalContainer) {
        setHTML(this.elements.modalContainer, '');
      }
    }
  }

  /**
   * Fecha modal
   */
  _closeModal() {
    if (this.elements.modalContainer) {
      setHTML(this.elements.modalContainer, '');
    }
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
   * Alterna favorito no modal
   */
  _toggleFavoriteInModal(code, button) {
    const isFavorite = this.favoritesService.toggleFavorite(code);

    if (isFavorite) {
      button.classList.add('is-favorite');
      button.textContent = '★ Remover dos favoritos';
    } else {
      button.classList.remove('is-favorite');
      button.textContent = '☆ Adicionar aos favoritos';
      
      setTimeout(() => {
        this._closeModal();
        this._renderFavorites();
      }, 300);
    }

    this._updateFavoriteCount();
  }

  /**
   * Limpa todos os favoritos
   */
  _handleClearAll() {
    const confirmed = confirm(
      'Deseja remover TODOS os favoritos?\nEsta ação não pode ser desfeita.'
    );

    if (confirmed) {
      this.favoritesService.clearAll();
      this._renderFavorites();
      this._updateFavoriteCount();
      
      console.log('[FavoritesController] Todos os favoritos removidos');
    }
  }

  /**
   * Exporta favoritos como JSON
   */
  _handleExport() {
    const favoriteCodes = this.favoritesService.getFavorites();
    
    if (favoriteCodes.size === 0) {
      alert('Você não tem favoritos para exportar.');
      return;
    }

    const favoriteCountries = this.allCountries
      .filter(country => favoriteCodes.has(country.getCode()))
      .map(country => ({
        code: country.getCode(),
        name: country.name,
        capital: country.capital,
        region: country.region,
        population: country.population,
      }));

    const dataStr = JSON.stringify(favoriteCountries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `favoritos-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log('[FavoritesController] Favoritos exportados:', favoriteCountries.length);
  }

  /**
   * Atualiza contador de favoritos
   * @private
   */
  _updateFavoriteCount() {
    if (this.elements.favCount) {
      const count = this.favoritesService.getCount();
      this.elements.favCount.textContent = count;
    }
  }

  /**
   * Mostra/esconde botões de ação
   */
  _toggleActionButtons(show) {
    if (this.elements.clearAllBtn) {
      this.elements.clearAllBtn.style.display = show ? 'inline-block' : 'none';
    }
    if (this.elements.exportBtn) {
      this.elements.exportBtn.style.display = show ? 'inline-block' : 'none';
    }
  }
}