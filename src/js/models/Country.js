/**
 * Modelo de País
 */

export class Country {
  constructor(data) {
    this.name = data.name?.common || 'Desconhecido';
    this.officialName = data.name?.official || '';
    this.capital = this._extractCapital(data.capital);
    this.region = data.region || 'N/A';
    this.population = data.population || 0;
    this.area = data.area || 0;
    this.flags = {
      svg: data.flags?.svg || '',
      png: data.flags?.png || '',
    };
    
    // Códigos de identificação
    this.cca2 = data.cca2 || ''; 
    this.cca3 = data.cca3 || ''; 
    
    // Dados adicionais
    this.borders = data.borders || [];
    this.languages = data.languages || {};
    this.currencies = data.currencies || {};
    this.timezones = data.timezones || [];
    this.tld = data.tld || [];
    this.subregion = data.subregion || '';
    this.latlng = data.latlng || [0, 0];
    
    this._rawData = data;
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
    if (!this.population) return '0';
    return new Intl.NumberFormat('pt-BR').format(this.population);
  }

  /**
   * Retorna área formatada
   */
  getFormattedArea() {
    if (!this.area) return '0';
    return new Intl.NumberFormat('pt-BR').format(this.area);
  }

  /**
   * Retorna código único do país
   */
  getCode() {
    return this.cca3 || this.cca2 || this.name;
  }

  /**
   * Verifica se o país corresponde ao termo de busca
   */
  matchesSearch(searchTerm) {
    if (!searchTerm) return true;
    const lower = searchTerm.toLowerCase();
    return this.name.toLowerCase().includes(lower) ||
           this.officialName.toLowerCase().includes(lower);
  }

  /**
   * Verifica se o país está na região especificada
   */
  matchesRegion(region) {
    if (!region) return true;
    return this.region === region;
  }

  /**
   * Retorna dados brutos para modal
   */
  getRawData() {
    return this._rawData;
  }
}