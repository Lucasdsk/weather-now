import Chart from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels';

import LocationService from '@services/LocationsService';
import WeatherService from '@services/WeatherService';

import CitySearch from '@components/CitySearch';

class MainController {
  constructor(LocationService, WeatherService) {
    this.locationService = LocationService;
    this.weatherService = WeatherService;

    this.selectedCity = '';
  }

  initLocations = async () => {
    const states = await this.locationService.searchStates();
    const selectedState = states[0].id;
    const cities = await this.locationService.searchCities(selectedState);

    CitySearch.setState({
      selectedState,
      states,
      cities,
    });
  };

  searchCities = async evt => {
    const uf = evt.target.value;
    const cities = await this.locationService.searchCities(uf);

    CitySearch.setState({
      selectedState: uf,
      selectedCity: '',
      cities,
    });
  };

  handleSelectCity = evt => {
    const city = evt.target.value;
    this.selectedCity = city;

    CitySearch.setState({
      selectedCity: this.selectedCity,
    });
  };

  handleSearchWeather = async evt => {
    evt.preventDefault();

    try {
      const weatherData = await this.weatherService.searchWeather(this.selectedCity);
      const forecastData = await this.weatherService.searchForecast(this.selectedCity);
    } catch (err) {
      console.log('err', err);
    }
  };

  init = async () => {
    try {
      CitySearch.init({
        onSelectState: this.searchCities,
        onSelectCity: this.handleSelectCity,
        onSearchWeather: this.handleSearchWeather,
      });
      this.initLocations();
    } catch (err) {
      console.log('err', err);
    }

    const chartElement = document.getElementById('myChart');
    new Chart(chartElement, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        datasets: [
          {
            label: '',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: '#c7e8f3',
            fill: true,
            backgroundColor: 'rgba(199, 232, 243, 0.34)',
          },
        ],
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          displayColors: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: '#c7e8f3',
              },
              gridLines: {
                display: false,
              },
            },
          ],

          yAxes: [
            {
              ticks: {
                fontColor: '#c7e8f3',
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        plugins: {
          datalabels: {
            borderRadius: 4,
            color: 'white',
            align: 'top',
          },
        },
      },
    });
  };
}

export default new MainController(LocationService, WeatherService);
