const LOCALITY_HOST = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';
const WEATHER_HOST = 'http://api.openweathermap.org/data/2.5/';
const APP_ID = '0ba0bb385a65ca0b4ce8cc068a68ba19';

const DEFAULT_FILTER = {
  state: 42, // Santa Catarina
  city: 'Blumenau',
};

const CACHE_TIME = 10; // minutes

const FAVORITE_LOCATION = 'FAVORITE_LOCATION';

const WN_WEATHER = 'WN_WEATHER';
const WN_FORECAST = 'WN_FORECAST';
const WN_STATES = 'WN_STATES';
const CITY_SEARCHED = 'CITY_SEARCHED';

export {
  LOCALITY_HOST,
  WEATHER_HOST,
  APP_ID,
  DEFAULT_FILTER,
  CACHE_TIME,
  FAVORITE_LOCATION,
  WN_WEATHER,
  WN_FORECAST,
  WN_STATES,
  CITY_SEARCHED,
};
