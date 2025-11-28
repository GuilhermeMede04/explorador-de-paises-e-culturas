# 📁 Estrutura de Arquivos JavaScript

## Organização Completa

```
explorador-de-paises/
│
├── index.html
│
└── src/
    └── js/
        ├── main.js                              # 👈 Ponto de entrada
        │
        ├── config/
        │   └── constants.js                     # Constantes e configurações
        │
        ├── models/
        │   └── Country.js                       # Entidade País
        │
        ├── repositories/
        │   └── CountryRepository.js             # Acesso à API
        │
        ├── services/
        │   └── CountryService.js                # Lógica de negócio
        │
        ├── controllers/
        │   └── AppController.js                 # Orquestração
        │
        ├── views/
        │   └── CountryView.js                   # Renderização
        │
        └── utils/
            ├── domUtils.js                      # Utilitários DOM
            └── debounce.js                      # Performance
```

## 🔄 Fluxo de Dados

```
User Input (HTML)
    ↓
AppController (orquestra)
    ↓
CountryService (lógica)
    ↓
CountryRepository (API)
    ↓
Country Model (entidade)
    ↓
CountryView (renderiza)
    ↓
DOM (atualizado)
```

## 📝 Resumo dos Arquivos

| Arquivo | Responsabilidade | Linhas |
|---------|------------------|--------|
| `main.js` | Inicialização | ~30 |
| `constants.js` | Configurações | ~25 |
| `Country.js` | Modelo de dados | ~50 |
| `CountryRepository.js` | Acesso API | ~35 |
| `CountryService.js` | Lógica de negócio | ~45 |
| `CountryView.js` | Templates HTML | ~80 |
| `domUtils.js` | Helpers DOM | ~35 |
| `debounce.js` | Performance | ~15 |
| `AppController.js` | Orquestração | ~120 |

**Total:** ~435 linhas (vs 150 linhas originais)

## ✅ Vantagens

- **Separação de responsabilidades**
- **Fácil de testar**
- **Fácil de manter**
- **Fácil de estender**
- **Reutilizável**
