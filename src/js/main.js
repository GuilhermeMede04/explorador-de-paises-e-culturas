/**
 * Main - Ponto de Entrada da Aplicação
 */

import { AppController } from './controllers/AppController.js';

async function bootstrap() {
  try {
    console.log('🚀 Iniciando Explorador de Países...');
    
    const app = new AppController();
    await app.init();
    
    console.log('✅ Aplicação pronta!');
    
    // Expõe controller para debug (apenas desenvolvimento)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.__APP__ = app;
      console.log('💡 App disponível em: window.__APP__');
    }
  } catch (error) {
    console.error('❌ Erro fatal ao inicializar:', error);
  }
}

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}