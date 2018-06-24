import Chart from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels';
import SearchLocationService from '@services/SearchLocations';
import CitySearch from '@components/CitySearch';

class MainController {
  constructor(SearchLocationService) {
    this.searchLocationService = SearchLocationService;

    this.selectedCity = {};
  }

  initLocations = async () => {
    const states = await this.searchLocationService.searchStates();
    const selectedState = states[0].id;
    const cities = await this.searchLocationService.searchCities(selectedState);

    CitySearch.setState({
      selectedState,
      states,
      cities,
    });
  };

  searchCities = async evt => {
    const uf = evt.target.value;
    console.log({ uf });
    const cities = await this.searchLocationService.searchCities(uf);
    CitySearch.setState({
      selectedState: uf,
      cities,
    });
  };

  handleSelectCity = evt => {
    const city = evt.target.value;
    this.selectedCity = { city };
  };

  handleSearchWeather = evt => {
    evt.preventDefault();
    console.log('handleSearchWeather', this.selectedCity);
  };

  init = async () => {
    try {
      CitySearch.init({
        onSelectChange: this.searchCities,
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

export default new MainController(SearchLocationService);
