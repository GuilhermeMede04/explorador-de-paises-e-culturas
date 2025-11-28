/**
 * View de País - Renderização de UI
 */

import { MESSAGES } from '../config/constants.js';

export class CountryView {
  /**
   * Renderiza um card de país
   */
  static renderCard(country) {
    const name = country.name;
    const flag = country.getFlagUrl();
    const capital = country.capital;
    const region = country.region;
    const population = country.getFormattedPopulation();

    return `
      <div class="country-card">
        <img 
          src="${flag}" 
          alt="Bandeira de ${this._escapeHtml(name)}" 
          class="country-flag" 
          loading="lazy"
        >
        <div class="country-info">
          <div class="country-name">${this._escapeHtml(name)}</div>
          <div class="country-detail">
            <strong>Capital:</strong>
            <span>${this._escapeHtml(capital)}</span>
          </div>
          <div class="country-detail">
            <strong>Região:</strong>
            <span>${this._escapeHtml(region)}</span>
          </div>
          <div class="country-detail">
            <strong>População:</strong>
            <span>${population}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza lista de países
   */
  static renderList(countries) {
    if (!countries || countries.length === 0) {
      return this.renderEmpty();
    }

    return countries
      .map(country => this.renderCard(country))
      .join('');
  }

  /**
   * Renderiza estado de loading
   */
  static renderLoading() {
    return `
      <div class="loading">
        ${MESSAGES.LOADING}
      </div>
    `;
  }

  /**
   * Renderiza estado vazio (sem resultados)
   */
  static renderEmpty() {
    return `
      <div class="empty-state">
        ${MESSAGES.NO_RESULTS}
      </div>
    `;
  }

  /**
   * Renderiza estado de erro
   */
  static renderError(errorMessage) {
    return `
      <div class="empty-state">
        <p>${MESSAGES.ERROR_LOAD}</p>
        <p style="font-size: 0.9em; color: #666;">Erro: ${this._escapeHtml(errorMessage)}</p>
        <button 
          onclick="location.reload()" 
          style="margin-top: 10px; padding: 8px 16px; cursor: pointer;"
        >
          ${MESSAGES.RETRY_BUTTON}
        </button>
      </div>
    `;
  }

  /**
   * Escapa HTML para prevenir XSS
   */
  static _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}