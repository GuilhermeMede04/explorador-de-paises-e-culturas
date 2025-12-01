# 📁 Estrutura de Arquivos CSS

```
src/styles/
├── main.css                    # Ponto de entrada (importa tudo)
├── base/                       # Fundação
│   ├── reset.css              # Reset de estilos do navegador
│   ├── variables.css          # Design tokens (cores, espaçamentos, etc)
│   └── typography.css         # Estilos de tipografia
├── layout/                     # Estrutura macro
│   ├── header.css             # Cabeçalho
│   ├── footer.css             # Rodapé
│   └── grid.css               # Sistema de grid e containers
├── components/                 # Componentes reutilizáveis
│   ├── hero.css               # Seção hero
│   ├── search.css             # Campo de busca
│   ├── filters.css            # Filtros
│   ├── cards.css              # Cards de países
│   └── navigation.css         # Navegação
└── utilities/                  # Classes auxiliares
    ├── helpers.css            # Utilitários gerais
    └── accessibility.css      # Acessibilidade
    |__ spinner.css
```

## Metodologia ITCSS

A organização segue **ITCSS (Inverted Triangle CSS)**, que estrutura CSS por especificidade crescente:

### 1️⃣ Base (Menor especificidade)
- Reset de estilos
- Variáveis CSS (Design Tokens)
- Tipografia base

### 2️⃣ Layout
- Estrutura macro da página
- Grid systems
- Header, Footer

### 3️⃣ Components
- Componentes reutilizáveis
- Estilos isolados e modulares

### 4️⃣ Utilities (Maior especificidade)
- Classes auxiliares
- Overrides específicos

## Princípios Aplicados

### ✅ Clean Code
- **Nomes descritivos**: `.country-card` em vez de `.card1`
- **Responsabilidade única**: Cada arquivo tem um propósito
- **DRY**: Variáveis CSS evitam repetição

### ✅ BEM-like Naming
```css
/* Bloco */
.country-card { }

/* Elemento */
.country-card__flag { }
.country-card__info { }

/* Modificador */
.nav-link--active { }
```

### ✅ Design Tokens (variables.css)
Centralização de valores de design:
```css
--color-text-primary: #05233a;
--space-md: 16px;
--radius-md: 10px;
```

**Benefícios:**
- Fácil manutenção
- Consistência visual
- Temas dinâmicos

### ✅ Mobile-First
Media queries de menor para maior:
```css
/* Mobile (padrão) */
.element { }

/* Tablet e acima */
@media (min-width: 768px) { }

/* Desktop e acima */
@media (min-width: 1024px) { }
```

### ✅ Acessibilidade
- `.visually-hidden` para conteúdo só para leitores de tela
- `prefers-reduced-motion` para respeitar preferências
- `prefers-contrast: high` para alto contraste
- Focus visible melhorado

## Vantagens desta Arquitetura

1. **Manutenibilidade**: Fácil encontrar e editar estilos
2. **Escalabilidade**: Adicione novos componentes sem afetar existentes
3. **Performance**: CSS organizado é mais fácil de otimizar
4. **Trabalho em Equipe**: Múltiplos desenvolvedores podem trabalhar simultaneamente
5. **Testabilidade**: Componentes isolados são mais fáceis de testar
6. **Reutilização**: Componentes podem ser usados em outros projetos

## Próximos Passos

Após refatorar o CSS:
1. ✅ HTML refatorado
2. ✅ CSS modularizado
3. ⏳ JavaScript (Arquitetura Limpa)
4. ⏳ Documentação de APIs

## Boas Práticas

### ❌ Evitamos
```css
/* IDs para estilo */
#header { }

/* !important desnecessário */
.text { color: red !important; }

/* Valores mágicos */
.element { margin-top: 17.5px; }

/* Seletores muito específicos */
div.container > ul > li > a.link { }
```

### ✅ Preferimos
```css
/* Classes descritivas */
.site-header { }

/* Variáveis CSS */
.element { margin-top: var(--space-md); }

/* Especificidade baixa */
.nav-link { }
```

---

**Dúvidas?** Consulte os comentários em cada arquivo CSS.