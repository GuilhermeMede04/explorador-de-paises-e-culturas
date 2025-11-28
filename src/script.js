const API_URL = 'https://restcountries.com/v3.1';
let allCountries = [];

// Elementos do DOM
let searchInput;
let continentFilter;
let countriesList;

// Carregar países ao iniciar
document.addEventListener('DOMContentLoaded', async () => {
  // Inicializar elementos do DOM
  searchInput = document.getElementById('searchInput');
  continentFilter = document.getElementById('continentFilter');
  countriesList = document.getElementById('countriesList');
  
  // Verificar se os elementos foram encontrados
  if (!searchInput || !continentFilter || !countriesList) {
    console.error('Elementos do DOM não encontrados');
    return;
  }
  
  // Carrega os países ANTES de adicionar os listeners
  await loadCountries();
  setupEventListeners();
});

// Configurar ouvintes de eventos
function setupEventListeners() {
  searchInput.addEventListener('input', filterCountries);
  continentFilter.addEventListener('change', filterCountries);
}

// Carregar todos os países da API
async function loadCountries() {
  try {
    countriesList.innerHTML = '<div class="loading">Carregando países...</div>';
    
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) throw new Error('Erro ao buscar países');
    
    allCountries = await response.json();
    console.log('Países carregados:', allCountries.length);
    console.log('Primeiro país:', allCountries[0]);
    displayCountries(allCountries);
  } catch (error) {
    console.error('Erro:', error);
    countriesList.innerHTML = '<div class="empty-state">Erro ao carregar países. Tente novamente.</div>';
  }
}

// Filtrar e exibir países
function filterCountries() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedContinent = continentFilter.value;

  console.log('Buscando:', searchTerm, 'Total de países:', allCountries.length);

  let filtered = allCountries.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm);
    
    // Se nenhum continente foi selecionado, mostra todos
    let matchesContinent = true;
    if (selectedContinent) {
      // Verifica se o continente selecionado está no array de continentes do país
      matchesContinent = country.continents && country.continents.includes(selectedContinent);
    }
    
    return matchesSearch && matchesContinent;
  });

  console.log('Filtrados:', filtered.length);

  if (filtered.length === 0) {
    countriesList.innerHTML = '<div class="empty-state">Nenhum país encontrado.</div>';
    return;
  }

  displayCountries(filtered);
}

// Exibir países em cards
function displayCountries(countries) {
  countriesList.innerHTML = countries.map(country => createCountryCard(country)).join('');
}

// Criar card de país
function createCountryCard(country) {
  const name = country.name.common;
  const flag = country.flags?.svg || country.flags?.png || '';
  const capital = country.capital ? country.capital[0] : 'N/A';
  const region = country.region || 'N/A';
  const population = formatPopulation(country.population);

  return `
    <div class="country-card">
      <img src="${flag}" alt="Bandeira de ${name}" class="country-flag">
      <div class="country-info">
        <div class="country-name">${name}</div>
        <div class="country-detail">
          <strong>Capital:</strong>
          <span>${capital}</span>
        </div>
        <div class="country-detail">
          <strong>Região:</strong>
          <span>${region}</span>
        </div>
        <div class="country-detail">
          <strong>População:</strong>
          <span>${population}</span>
        </div>
      </div>
    </div>
  `;
}

// Formatar população com separadores
function formatPopulation(population) {
  return new Intl.NumberFormat('pt-BR').format(population);
}