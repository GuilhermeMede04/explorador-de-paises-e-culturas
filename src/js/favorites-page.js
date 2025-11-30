/**
 * Favorites Page - Ponto de entrada da página de favoritos
 */

import { FavoritesController } from './controllers/FavoritesController.js';

/**
 * Inicializa a página de favoritos
 */
async function bootstrap() {
  try {
    console.log('⭐ Iniciando Página de Favoritos...');
    
    const favoritesPage = new FavoritesController();
    await favoritesPage.init();
    
    console.log('✅ Página de Favoritos pronta!');
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.__FAVORITES_PAGE__ = favoritesPage;
      console.log('💡 Controller disponível em: window.__FAVORITES_PAGE__');
    }
  } catch (error) {
    console.error('❌ Erro fatal ao inicializar página de favoritos:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}