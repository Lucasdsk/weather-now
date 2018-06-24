import SearchLocationService from '@services/SearchLocations';
import Component from './Component';

class CitySearch extends Component {
  constructor() {
    super('city-search');
  }

  render() {
    console.log('render - citySearch');
    return `
      <form action="" class="wn-filter__form">
        <select name="state" class="wn-filter__form-field wn-filter__form-field--states">
          <option>SC</option>
          <option>PR</option>
          <option>RS</option>
        </select>

        <div class="wn-filter__awesomplete-container">
          <input class="awesomplete wn-filter__form-field wn-filter__form-field--cities" data-list="#mylist" />

          <ul id="mylist">
            <li>Ada</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>Brainfuck</li>
            <li>LOLCODE</li>
            <li>Node.js</li>
            <li>Ruby on Rails</li>
          </ul>
        </div>
        <button class="awesomplete wn-filter__form-field wn-filter__form-field--button">Como está o clima agora?</button>
      </form>
    `;
  }
}

export default new CitySearch(SearchLocationService);
