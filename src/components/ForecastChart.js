import moment from 'moment';
import Chart from 'chart.js';

import Component from 'core/Component';
import WeatherIcon from 'components/WeatherIcon';

const getLabels = data => data.map(({ dt }) => moment.unix(dt).format('ddd'));

const getData = data => data.map(({ temp }) => Math.round(temp.day));

const chartOptions = (data, labels) => ({
  type: 'line',
  data: {
    labels,
    datasets: [
      {
        label: '',
        data,
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

class ForecastChart extends Component {
  constructor(componentSelector) {
    super(componentSelector);

    this.state = {
      data: {
        list: [],
      },
      loading: false,
    };

    this.labels = [];

    this.chart = null;
    this.$chartElement = null;
  }

  mounted = () => {
    this.$chartElement = document.getElementById('weatherChart');

    if (this.$chartElement) {
      const data = getData(this.state.data.list);
      const options = chartOptions(data, this.labels);

      this.chart = new Chart(this.$chartElement, options);
    }
  };

  renderForecastMinMax = () => {
    return `
      <ul class="wn-chart__temperatures">
        ${this.state.data.list
          .map(
            (day, index) =>
              `<li class="wn-chart__temperatures-day">
                <strong>${this.labels[index]}</strong>
                ${WeatherIcon(day.weather[0].icon)}
                <div class="wn-chart__temperatures-day__min-max">
                  <span class="min">${Math.round(day.temp.min)}</span>
                  <span class="max">${Math.round(day.temp.max)}</span>
                </div>
              </li>`,
          )
          .join('')}
      </ul>
    `;
  };

  render() {
    const { data, loading } = this.state;

    this.labels = getLabels(this.state.data.list);

    if (!data.list.length || loading) {
      return super.render();
    }

    return `
      ${this.renderForecastMinMax()}
      <canvas id="weatherChart"></canvas>
    `;
  }
}

export default new ForecastChart('weather-chart');
