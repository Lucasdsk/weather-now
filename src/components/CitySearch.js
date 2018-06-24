import Component from '../core/Component';
import awesomplete from 'awesomplete';

class CitySearch extends Component {
  constructor(componentSelector) {
    super(componentSelector);

    this.state = {
      states: [],
      cities: [],
    };
  }

  renderStates = states => `
    <select name="state" class="wn-filter__form-field wn-filter__form-field--states">
      ${states.map(state => `<option value="${state.id}">${state.nome}</option>`).join('')}
    </select>
  `;

  renderCities = cities => `
    <div class="wn-filter__awesomplete-container">
      <input id="input-cities" class="awesomplete wn-filter__form-field wn-filter__form-field--cities" data-list="#mylist" />

      <ul id="mylist">
        ${cities.map(city => `<li>${city.nome}</li>`).join('')}
      </ul>
    </div>
  `;

  mounted() {
    console.log('mounted');
    new Awesomplete(document.getElementById('input-cities'), { list: '#mylist' });
  }

  render(props) {
    console.log('render', props);
    console.log('render - citySearch...', this.state);

    const { states, cities } = this.state;

    if (!states.length || !cities.length) {
      return super.render();
    }

    return `
      <form action="" class="wn-filter__form">
        ${this.renderStates(states)}
        ${this.renderCities(cities)}
        
        <button class="awesomplete wn-filter__form-field wn-filter__form-field--button">Como está o clima agora?</button>
      </form>
    `;
  }
}

export default new CitySearch('city-search');
