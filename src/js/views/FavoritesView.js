/**
 * Favorites View - Renderização específica da página de favoritos
 */

export class FavoritesView {
  /**
   * Renderiza estado vazio (sem favoritos)
   */
  static renderEmpty() {
    return `
      <div class="empty-favorites-state">
        <div class="empty-icon">⭐</div>
        <h3 class="empty-title">Nenhum país favorito ainda</h3>
        <p class="empty-description">
          Explore países na página inicial e adicione seus favoritos clicando na estrela ⭐
        </p>
        <a href="index.html" class="back-btn">
          🌍 Explorar Países
        </a>
      </div>
    `;
  }

  /**
   * Renderiza estatísticas dos favoritos
   */
  static renderStats(count) {
    return `
      <div class="favorites-stats">
        <div class="stat-item">
          <span class="stat-value">${count}</span>
          <span class="stat-label">País${count !== 1 ? 'es' : ''} Favorito${count !== 1 ? 's' : ''}</span>
        </div>
      </div>
    `;
  }
}