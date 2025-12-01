# 🌍 Explorador de Países e Culturas

> Aplicação web interativa para explorar informações sobre países do mundo todo usando a REST Countries API.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

---

## 📝 Sobre o Projeto

Trabalho de implementação da 3ª Avaliação de **Programação Web** desenvolvido para explorar informações culturais, geográficas e políticas de países através da REST Countries API.

**Instituição:** Universidade Estadual do Piauí - UESPI  
**Curso:** Tecnologia em Sistemas de Computação  
**Professor:** Eyder Rios  
**Período:** 2024.2

---

## 👥 Integrantes

- **Guilherme Medeiros** - [@GuilhermeMede04](https://github.com/GuilhermeMede04)
- **Filipe Costa** - [@filipesec](https://github.com/filipesec)
- **Rian Kaio** - [@R-Kaio](https://github.com/R-Kaio)
- **Lucas Vieira** - [@lucasvlreb](https://github.com/lucasvlreb)

---

## 🚀 Funcionalidades

- ✅ Busca de países por nome
- ✅ Filtro por continente
- ✅ Listagem com informações básicas (bandeira, capital, população, região)
- ✅ Modal com detalhes completos + mapa integrado
- ✅ Sistema de favoritos com localStorage
- ✅ Exportação de favoritos em JSON
- ✅ Tratamento robusto de erros
- ✅ Spinner de carregamento
- ✅ Design responsivo (mobile-first)
- ✅ Página "Sobre Nós"

---

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização modular (ITCSS)
- **JavaScript ES6+** - Lógica e interatividade
- **REST Countries API v3.1** - Fonte de dados

### Arquitetura

- Clean Architecture (separação em camadas)
- SOLID Principles
- Design Patterns (Repository, Service Layer, MVC)
- ES6 Modules

---

## 🌐 API Utilizada

**REST Countries API v3.1**

- URL: https://restcountries.com/
- Autenticação: Nenhuma
- Dados: 250+ países com informações detalhadas

---

## **⚠️ Importante:** Não abra os arquivos HTML diretamente. Use sempre um servidor local.

## 📁 Estrutura do Projeto

```
explorador-de-paises/
├── index.html                  # Página principal
├── favorites.html              # Página de favoritos
├── about.html                  # Página sobre
└── src/
    ├── assets/images/          # Imagens
    ├── js/                     # JavaScript modular
    │   ├── config/             # Configurações
    │   ├── models/             # Entidades
    │   ├── repositories/       # Acesso API
    │   ├── services/           # Lógica de negócio
    │   ├── controllers/        # Orquestração
    │   ├── views/              # Templates
    │   └── utils/              # Utilitários
    └── styles/                 # CSS modular
        ├── base/               # Reset, variáveis
        ├── layout/             # Header, footer, grid
        ├── components/         # Componentes
        ├── pages/              # Páginas específicas
        └── utilities/          # Helpers
```

---

## ✅ Requisitos Atendidos

✅ Campo de busca por nome  
✅ Filtro por continente  
✅ Listagem de países  
✅ Modal de detalhes com mapa  
✅ Sistema de favoritos (localStorage)  
✅ Tratamento de erros  
✅ Spinner de carregamento  
✅ Página "Sobre"  
✅ Rodapé em todas as páginas
✅ HTML5 semântico  
✅ Design responsivo (mobile-first)  
✅ Código modular e reutilizável  
✅ Boas práticas de UX/UI  
✅ Tratamento robusto de exceções  
✅ Versionamento progressivo com Git

---

Projeto acadêmico desenvolvido para fins educacionais - UESPI 2024.2

---

<div align="center">

**Desenvolvido por alunos de Sistemas de Computação - UESPI**

</div>
