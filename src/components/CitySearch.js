import Component from 'core/Component';
import awesomplete from 'awesomplete';

class CitySearch extends Component {
  constructor(componentSelector) {
    super(componentSelector);

    this.state = {
      selectedState: '',
      selectedCity: '',
      states: [],
      cities: [],
    };

    this.awesomplete = null;
    this.selectStateEvent = null;
    this.searchEvent = null;

    this.$inputCities = null;
  }

  renderStates = states => `
    <select name="state" id="select-state" class="wn-filter__form-field wn-filter__form-field--states">
      ${states
        .map(
          state => `
          <option
            value="${state.id}"
            ${state.id === this.state.selectedState ? 'selected' : ''}
          >${state.nome}
          </option>`,
        )
        .join('')}
    </select>
  `;

  renderCities = cities => `
    <div class="wn-filter__awesomplete-container">
      <input
        id="input-cities"
        class="awesomplete wn-filter__form-field wn-filter__form-field--cities"
        data-list="#mylist"
        value="${this.state.selectedCity}"
      />

      <ul id="mylist">
        ${cities.map(city => `<li>${city.nome}</li>`).join('')}
      </ul>
    </div>
  `;

  initAwesomplete = () => {
    this.$inputCities = document.getElementById('input-cities');
    this.$inputCities.addEventListener('awesomplete-selectcomplete', this.props.onSelectCity);

    this.awesomplete = new Awesomplete(this.$inputCities, {
      list: '#mylist',
    });
  };

  mounted = () => {
    this.initAwesomplete();

    if (!this.selectStateEvent) {
      this.selectStateEvent = document
        .getElementById('select-state')
        .addEventListener('change', this.props.onSelectState);
    }

    if (!this.searchEvent) {
      this.searchEvent = document
        .getElementById('search-weather')
        .addEventListener('click', this.props.onSearchWeather);
    }
  };

  render() {
    const { states, cities, selectedCity, selectedState } = this.state;

    if (!states.length) {
      return super.render();
    }

    return `
      <div class="wn-filter__form">
        ${this.renderStates(states)}
        ${this.renderCities(cities)}
        
        <button
          id="search-weather"
          class="awesomplete wn-filter__form-field wn-filter__form-field--button"
          ${!selectedState || !selectedCity ? 'disabled' : ''}
        >Como está o clima agora?</button>
      </div>
    `;
  }
}

export default new CitySearch('city-search');
