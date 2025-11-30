/**
 * Modelo de País
 */

export class Country {
  constructor(data) {

    /** Identificador ISO usado para favoritos e detalhes */
    this.code = data.cca3 || data.cca2 || data.ccn3 || 'XXX';

    /** Nome completo + comum */
    this.name = data.name?.common || 'Desconhecido';
    this.officialName = data.name?.official || this.name;

    /** Bandeiras */
    this.flags = {
      svg: data.flags?.svg || '',
      png: data.flags?.png || '',
    };

    /** Capital */
    this.capital = Array.isArray(data.capital) && data.capital.length > 0
      ? data.capital[0]
      : 'N/A';

    /** Região */
    this.region = data.region || 'N/A';

    /** População */
    this.population = data.population || 0;

    /** Área */
    this.area = data.area || 0;

    /** Coordenadas */
    this.latlng = data.latlng || [0, 0];

    /** Fronteiras */
    this.borders = data.borders || [];

    /** Idiomas */
    this.languages = data.languages || {};

    /** Moedas */
    this.currencies = data.currencies || {};

    /** Domínios */
    this.tld = data.tld || [];
  }

  /** Retorna URL da bandeira */
  getFlagUrl() {
    return this.flags.svg || this.flags.png || '';
  }

  /** População formatada */
  getFormattedPopulation() {
    return new Intl.NumberFormat('pt-BR').format(this.population);
  }

  /** Verifica busca */
  matchesSearch(searchTerm) {
    if (!searchTerm) return true;
    return this.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  /** Verifica região */
  matchesRegion(region) {
    if (!region) return true;
    return this.region === region;
  }
}
