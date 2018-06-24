import moment from 'moment';
import Component from 'core/Component';
import WheatherIcon from 'components/WeatherIcon';

moment.locale('pt-BR');

class Weather extends Component {
  constructor(componentSelector) {
    super(componentSelector);

    this.state = {
      name: '',
      state: '',
      temp: '',
      temp_max: 0,
      temp_min: 0,
      icon: '',
      loading: false,
    };

    this.favoriteActive = false;

    this.$favoriteElement = null;

    this.favoriteEvent = null;
  }

  mounted = () => {
    this.$favoriteElement = document.getElementById('add-favorite');

    if (!this.favoriteEvent && this.$favoriteElement) {
      this.favoriteEvent = this.$favoriteElement.addEventListener('click', evt => {
        if (!this.favoriteActive) {
          this.$favoriteElement.classList.add('wn-weather__favorite--active');
        } else {
          this.$favoriteElement.classList.remove('wn-weather__favorite--active');
        }

        this.favoriteActive = !this.favoriteActive;
        this.props.onFavorite(this.favoriteActive, this.state.name);
      });
    }
  };

  render() {
    const { name, state, description, temp, temp_max, temp_min, icon, loading } = this.state;

    if (!temp || loading) {
      return super.render();
    }

    return `
      <span class="wn-weather__favorite" id="add-favorite">
        <i class="fa fa-star" title="Adicionar aos favoritos"></i>
      </span>
      <div class="wn-weather__location-info">
        <div class="wn-weather__location">
          ${name}, ${state}
        </div>
        <div class="wn-weather__description">
          ${moment().format('dddd')} - ${description}
        </div>
      </div>

      <div class="wn-weather__temperature">
        <div class="wn-weather__temperature-main">
          ${WheatherIcon(icon)}
          <div class="wn-weather__temperature-value wn-weather__temperature-value--celcius">${Math.round(
            temp,
          )}</div>
        </div>
        <div class="wn-weather__temperature-min-max">
          <span class="min">${Math.round(temp_min)}</span>
          <span class="max">${Math.round(temp_max)}</span>
        </div>
      </div>
    `;
  }
}

export default new Weather('weather');
