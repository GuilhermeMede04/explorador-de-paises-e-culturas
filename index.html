/**
 * View de País - Renderização de UI
 */
import { MESSAGES } from '../config/constants.js';
import { CountryService } from '../services/CountryService.js';

const service = new CountryService();

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

    // Verifica se é favorito (para deixar o botão amarelo)
    const isFav = service.isFavorite(country.code);

    return `
      <div class="country-card" data-country="${country.code}">
        <img 
          src="${flag}" 
          alt="Bandeira de ${this._escapeHtml(name)}"
          class="country-flag"
          loading="lazy"
        >

        <div class="country-info">
          <div class="country-name">${this._escapeHtml(name)}</div>

          <div class="country-detail"><strong>Capital:</strong> ${this._escapeHtml(capital)}</div>
          <div class="country-detail"><strong>Região:</strong> ${this._escapeHtml(region)}</div>
          <div class="country-detail"><strong>População:</strong> ${population}</div>

          <div class="country-actions">
            <button class="details-btn" data-details="${country.code}">
              Detalhes
            </button>

            <button 
              class="fav-btn ${isFav ? 'favorite' : ''}" 
              data-fav="${country.code}">
              ⭐
            </button>
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

    return countries.map(country => this.renderCard(country)).join('');
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
   * Renderiza estado vazio
   */
  static renderEmpty() {
    return `
      <div class="empty-state">
        ${MESSAGES.NO_RESULTS}
      </div>
    `;
  }

  /**
   * Renderiza erro
   */
  static renderError(errorMessage) {
    return `
      <div class="empty-state">
        <p>${MESSAGES.ERROR_LOAD}</p>
        <p style="font-size: 0.9em; color: #666;">
          Erro: ${this._escapeHtml(errorMessage)}
        </p>
        <button onclick="location.reload()"
          style="margin-top: 10px; padding: 8px 16px; cursor: pointer;">
          ${MESSAGES.RETRY_BUTTON}
        </button>
      </div>
    `;
  }



  static _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }


  static renderDetailsModal(country, isFavorite) {
    const name = country.name?.official || country.name?.common;
    const flag = country.flags?.svg || country.flags?.png;
    const population = country.population?.toLocaleString('pt-BR') || 'N/A';
    const area = country.area ? `${country.area.toLocaleString('pt-BR')} km²` : 'N/A';
    const capital = country.capital?.[0] || 'N/A';
    const borders = country.borders?.join(', ') || 'Nenhuma';
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

    const currencies = country.currencies
      ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
      : 'N/A';

    const tld = country.tld?.join(', ') || 'N/A';

    const latlng = country.latlng || [0, 0];
    const mapUrl = `https://www.google.com/maps?q=${latlng[0]},${latlng[1]}&z=5&output=embed`;

    return `
      <div class="modal-overlay" id="modal-overlay" data-code="${country.code}">
        <div class="modal">
          <button class="modal-close" id="modal-close">✖</button>

          <h2>${name}</h2>
          <img src="${flag}" class="modal-flag">

          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Área:</strong> ${area}</p>
          <p><strong>População:</strong> ${population}</p>
          <p><strong>Idiomas:</strong> ${languages}</p>
          <p><strong>Moedas:</strong> ${currencies}</p>
          <p><strong>Domínios:</strong> ${tld}</p>
          <p><strong>Fronteiras:</strong> ${borders}</p>

          <h3>Mapa</h3>
          <iframe src="${mapUrl}" width="100%" height="300" loading="lazy"></iframe>

          <button class="fav-toggle-btn" id="fav-toggle">
            ${isFavorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </button>
        </div>
      </div>
    `;
  }
}