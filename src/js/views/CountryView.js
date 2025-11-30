/**
 * View de País - Renderização de UI
 */

import { MESSAGES } from '../config/constants.js';

export class CountryView {
  /**
   * Renderiza um card de país
   */
  static renderCard(country, isFavorite = false) {
    const name = country.name;
    const flag = country.getFlagUrl();
    const capital = country.capital;
    const region = country.region;
    const population = country.getFormattedPopulation();
    const code = country.cca3 || country.cca2 || name;

    return `
      <article class="country-card" data-country="${this._escapeHtml(code)}">
        <img 
          src="${flag}" 
          alt="Bandeira de ${this._escapeHtml(name)}"
          class="country-flag"
          loading="lazy"
        >

        <div class="country-info">
          <h3 class="country-name">${this._escapeHtml(name)}</h3>

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

          <div class="country-actions">
            <button 
              class="details-btn" 
              data-details="${this._escapeHtml(code)}"
              aria-label="Ver detalhes de ${this._escapeHtml(name)}"
            >
              📋 Detalhes
            </button>

            <button 
              class="fav-btn ${isFavorite ? 'favorite' : ''}" 
              data-fav="${this._escapeHtml(code)}"
              aria-label="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
            >
              ${isFavorite ? '★' : '☆'}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Renderiza lista de países
   */
  static renderList(countries, favoriteCodes = new Set()) {
    if (!countries || countries.length === 0) {
      return this.renderEmpty();
    }

    return countries
      .map(country => {
        const code = country.cca3 || country.cca2 || country.name;
        const isFavorite = favoriteCodes.has(code);
        return this.renderCard(country, isFavorite);
      })
      .join('');
  }

  /**
   * Renderiza estado de loading
   */
  static renderLoading() {
    return `
      <div class="loading-state" role="status" aria-live="polite">
        <p>${MESSAGES.LOADING}</p>
      </div>
    `;
  }

  /**
   * Renderiza estado vazio
   */
  static renderEmpty() {
    return `
      <div class="empty-state" role="status" aria-live="polite">
        <p>${MESSAGES.NO_RESULTS}</p>
      </div>
    `;
  }

  /**
   * Renderiza erro
   */
  static renderError(errorMessage) {
    return `
      <div class="empty-state" role="alert" aria-live="assertive">
        <p>${MESSAGES.ERROR_LOAD}</p>
        <p style="font-size: 0.9em; color: #666;">
          Erro: ${this._escapeHtml(errorMessage)}
        </p>
        <button 
          onclick="location.reload()"
          class="retry-btn"
          style="margin-top: 10px; padding: 8px 16px; cursor: pointer;"
        >
          ${MESSAGES.RETRY_BUTTON}
        </button>
      </div>
    `;
  }

  /**
   * Renderiza modal com detalhes do país
   */
  static renderDetailsModal(countryData, isFavorite = false) {
    const name = countryData.name?.official || countryData.name?.common || 'País';
    const flag = countryData.flags?.svg || countryData.flags?.png || '';
    const population = countryData.population 
      ? countryData.population.toLocaleString('pt-BR') 
      : 'N/A';
    const area = countryData.area 
      ? `${countryData.area.toLocaleString('pt-BR')} km²` 
      : 'N/A';
    const capital = countryData.capital?.[0] || 'N/A';
    const region = countryData.region || 'N/A';
    const subregion = countryData.subregion || 'N/A';
    const borders = countryData.borders?.join(', ') || 'Nenhuma fronteira';
    
    const languages = countryData.languages 
      ? Object.values(countryData.languages).join(', ') 
      : 'N/A';

    const currencies = countryData.currencies
      ? Object.values(countryData.currencies)
          .map(c => `${c.name} (${c.symbol})`)
          .join(', ')
      : 'N/A';

    const tld = countryData.tld?.join(', ') || 'N/A';
    const timezones = countryData.timezones?.slice(0, 3).join(', ') || 'N/A';

    const latlng = countryData.latlng || [0, 0];
    const mapUrl = `https://www.google.com/maps?q=${latlng[0]},${latlng[1]}&z=5&output=embed`;

    const code = countryData.cca3 || countryData.cca2 || name;

    return `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <button 
            class="modal-close" 
            id="modal-close"
            aria-label="Fechar modal"
          >
            ✖
          </button>

          <div class="modal-header">
            <img src="${flag}" alt="Bandeira de ${this._escapeHtml(name)}" class="modal-flag">
            <h2 id="modal-title" class="modal-title">${this._escapeHtml(name)}</h2>
          </div>

          <div class="modal-content">
            <div class="modal-info-grid">
              <div class="info-item">
                <strong>Capital:</strong>
                <span>${this._escapeHtml(capital)}</span>
              </div>

              <div class="info-item">
                <strong>Região:</strong>
                <span>${this._escapeHtml(region)}</span>
              </div>

              <div class="info-item">
                <strong>Sub-região:</strong>
                <span>${this._escapeHtml(subregion)}</span>
              </div>

              <div class="info-item">
                <strong>População:</strong>
                <span>${population}</span>
              </div>

              <div class="info-item">
                <strong>Área:</strong>
                <span>${area}</span>
              </div>

              <div class="info-item">
                <strong>Idiomas:</strong>
                <span>${this._escapeHtml(languages)}</span>
              </div>

              <div class="info-item">
                <strong>Moedas:</strong>
                <span>${this._escapeHtml(currencies)}</span>
              </div>

              <div class="info-item">
                <strong>Domínio:</strong>
                <span>${this._escapeHtml(tld)}</span>
              </div>

              <div class="info-item">
                <strong>Fusos Horários:</strong>
                <span>${this._escapeHtml(timezones)}</span>
              </div>

              <div class="info-item">
                <strong>Fronteiras:</strong>
                <span>${this._escapeHtml(borders)}</span>
              </div>
            </div>

            <div class="modal-map">
              <h3>Localização</h3>
              <iframe 
                src="${mapUrl}" 
                width="100%" 
                height="300" 
                loading="lazy"
                title="Mapa de ${this._escapeHtml(name)}"
                frameborder="0"
              ></iframe>
            </div>
          </div>

          <div class="modal-actions">
            <button 
              class="fav-toggle-btn ${isFavorite ? 'is-favorite' : ''}" 
              id="fav-toggle"
              data-code="${this._escapeHtml(code)}"
              aria-label="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
            >
              ${isFavorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Escapa HTML para prevenir XSS
   */
  static _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }
}