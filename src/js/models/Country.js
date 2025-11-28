/**
 * Modelo de País
 */

export class Country {
  constructor(data) {
    this.name = data.name?.common || 'Desconhecido';
    this.capital = this._extractCapital(data.capital);
    this.region = data.region || 'N/A';
    this.population = data.population || 0;
    this.flags = {
      svg: data.flags?.svg || '',
      png: data.flags?.png || '',
    };
  }

  /**
   * Extrai a capital (primeiro elemento do array)
   */
  _extractCapital(capital) {
    if (!capital || !Array.isArray(capital) || capital.length === 0) {
      return 'N/A';
    }
    return capital[0];
  }

  /**
   * Retorna URL da bandeira (prioriza SVG)
   */
  getFlagUrl() {
    return this.flags.svg || this.flags.png || '';
  }

  /**
   * Retorna população formatada
   */
  getFormattedPopulation() {
    return new Intl.NumberFormat('pt-BR').format(this.population);
  }

  /**
   * Verifica se o país corresponde ao termo de busca
   */
  matchesSearch(searchTerm) {
    if (!searchTerm) return true;
    return this.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  /**
   * Verifica se o país está na região especificada
   */
  matchesRegion(region) {
    if (!region) return true;
    return this.region === region;
  }
}