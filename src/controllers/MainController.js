import datalabels from 'chartjs-plugin-datalabels';

import LocationService from 'services/LocationsService';
import WeatherService from 'services/WeatherService';

import CitySearch from 'components/CitySearch';
import Weather from 'components/Weather';
import ForecastChart from 'components/ForecastChart';

import { DEFAULT_FILTER, FAVORITE_LOCATION } from 'constants';

import forecastMock from './../forecast-mock.json';
import LocalStorageService from 'services/LocalStorageService';

class MainController {
  constructor(LocationService, WeatherService, LocalStorageService) {
    this.locationService = LocationService;
    this.weatherService = WeatherService;
    this.localStorageService = LocalStorageService;

    this.states = [];
    this.filter = {
      state: '',
      city: '',
    };

    this.selectedState = {};
  }

  initLocations = async () => {
    this.states = await this.locationService.searchStates();
    this.selectedState = this.states.find(state => state.id === this.filter.state);
    const cities = await this.locationService.searchCities(this.filter.state);

    CitySearch.setState({
      selectedState: this.filter.state,
      states: this.states,
      cities,
    });
  };

  searchCities = async evt => {
    this.selectedState = this.states.find(state => String(state.id) === evt.target.value);
    this.filter.state = this.selectedState.id;

    const cities = await this.locationService.searchCities(this.filter.state);

    CitySearch.setState({
      selectedState: this.filter.state,
      selectedCity: '',
      cities,
    });
  };

  handleSelectCity = evt => {
    this.filter.city = evt.target.value;

    CitySearch.setState({
      selectedCity: this.filter.city,
    });
  };

  handleSearchWeather = async evt => {
    Weather.setState({
      loading: true,
    });

    ForecastChart.setState({
      loading: true,
    });

    const weatherData = await this.weatherService.searchWeather(this.filter.city);
    const forecastData = await this.weatherService.searchForecast(this.filter.city);

    // Using mock, because I can't use the API's key
    // const forecastData = forecastMock;

    this.renderWeather(weatherData);

    ForecastChart.setState({
      data: forecastData,
      loading: false,
    });
  };

  renderWeather = async weatherData => {
    const {
      name,
      main: { temp, temp_max, temp_min },
      weather,
    } = weatherData;

    Weather.setState({
      name,
      state: this.selectedState.sigla,
      temp,
      temp_max,
      temp_min,
      icon: weather[0].icon,
      description: weather[0].description,
      loading: false,
    });
  };

  handleSaveFavorite = (favoriteActive, cityName) => {
    if (favoriteActive) {
      this.localStorageService.setItem(FAVORITE_LOCATION, this.filter);
    } else {
      this.localStorageService.removeItem(FAVORITE_LOCATION);
    }
  };

  getFavoriveLocation = () => {
    const favoriteLocation = this.localStorageService.getItem(FAVORITE_LOCATION);

    if (!favoriteLocation) {
      this.filter = { ...DEFAULT_FILTER };
    } else {
      this.filter = { ...favoriteLocation };
    }
  };

  init = async () => {
    try {
      this.getFavoriveLocation();

      CitySearch.init({
        onSelectState: this.searchCities,
        onSelectCity: this.handleSelectCity,
        onSearchWeather: this.handleSearchWeather,
      });

      Weather.init({
        onFavorite: this.handleSaveFavorite,
      });

      ForecastChart.init();

      await this.initLocations();

      const weatherData = await this.weatherService.searchWeather(this.filter.city);
      this.renderWeather(weatherData);

      const forecastData = await this.weatherService.searchForecast(this.filter.city);

      // Using mock, because I can't use the API's key
      // const forecastData = forecastMock;

      ForecastChart.setState({
        data: forecastData,
      });
    } catch (err) {
      console.log('err', err);
    }
  };
}

export default new MainController(LocationService, WeatherService, LocalStorageService);
