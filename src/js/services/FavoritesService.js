/**
 * Serviço de Favoritos - Gerencia países favoritos
 */

const STORAGE_KEY = 'favorite_countries';

export class FavoritesService {
  constructor() {
    this.favorites = this._loadFromStorage();
  }

  /**
   * Adiciona país aos favoritos
   */
  addFavorite(countryCode) {
    if (!this.favorites.has(countryCode)) {
      this.favorites.add(countryCode);
      this._saveToStorage();
      console.log('[Favorites] Adicionado:', countryCode);
      return true;
    }
    return false;
  }

  /**
   * Remove país dos favoritos
   */
  removeFavorite(countryCode) {
    if (this.favorites.has(countryCode)) {
      this.favorites.delete(countryCode);
      this._saveToStorage();
      console.log('[Favorites] Removido:', countryCode);
      return true;
    }
    return false;
  }

  /**
   * Alterna status de favorito
   */
  toggleFavorite(countryCode) {
    if (this.favorites.has(countryCode)) {
      this.removeFavorite(countryCode);
      return false;
    } else {
      this.addFavorite(countryCode);
      return true;
    }
  }

  /**
   * Verifica se país é favorito
   */
  isFavorite(countryCode) {
    return this.favorites.has(countryCode);
  }

  /**
   * Retorna todos os códigos favoritos
   */
  getFavorites() {
    return new Set(this.favorites);
  }

  /**
   * Retorna contagem de favoritos
   */
  getCount() {
    return this.favorites.size;
  }

  /**
   * Limpa todos os favoritos
   */
  clearAll() {
    this.favorites.clear();
    this._saveToStorage();
    console.log('[Favorites] Todos removidos');
  }

  /**
   * Carrega favoritos do localStorage
   */
  _loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const array = JSON.parse(stored);
        console.log('[Favorites] Carregados:', array.length);
        return new Set(array);
      }
    } catch (error) {
      console.error('[Favorites] Erro ao carregar:', error);
    }
    return new Set();
  }

  /**
   * Salva favoritos no localStorage
   */
  _saveToStorage() {
    try {
      const array = Array.from(this.favorites);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
      console.log('[Favorites] Salvos:', array.length);
    } catch (error) {
      console.error('[Favorites] Erro ao salvar:', error);
    }
  }
}