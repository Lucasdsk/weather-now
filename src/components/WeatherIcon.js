const ICONS = {
  '01d': 'wi-day-sunny',
  '02d': 'wi-day-cloudy',
  '03d': 'wi-cloud',
  '04d': 'wi-cloudy',
  '09d': 'wi-rain',
  '10d': 'wi-day-rain',
  '11d': 'wi-thunderstorm',
  '13d': 'wi-snow',
  '50d': 'wi-windy',
  '01n': 'wi-night-clear',
  '02n': 'wi-night-alt-cloudy',
  '03n': 'wi-cloud',
  '04n': 'wi-cloudy',
  '09n': 'wi-rain',
  '10n': 'wi-night-rain',
  '11n': 'wi-thunderstorm',
  '13n': 'wi-snow',
  '50n': 'wi-windy',
};

const WeatherIcon = icon => `
  <i class="wi ${ICONS[icon]} wn-weather__temperature-icon"></i>
`;

export default WeatherIcon;
