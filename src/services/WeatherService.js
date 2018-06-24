import axios from 'axios';
import qs from 'qs';

import Request from 'core/Request';

import LocalStorageService from 'services/LocalStorageService';

import { WEATHER_HOST, APP_ID, WN_WEATHER, WN_FORECAST } from 'constants';

class WeatherService extends Request {
  constructor(LocalStorageService) {
    super(LocalStorageService);
  }

  getParams = cityName =>
    qs.stringify({
      q: `${cityName},br`,
      APPID: APP_ID,
      units: 'metric',
      cnt: 6,
      lang: 'pt',
    });

  search = async (cityName, sufixEndpoint, keyRequestCache) => {
    try {
      const queryParams = this.getParams(cityName);
      const data = await this.fetch(
        `${WEATHER_HOST}${sufixEndpoint}?${queryParams}`,
        keyRequestCache,
        cityName,
      );
      return data;
    } catch (err) {
      console.log('err', err);
    }
  };

  searchWeather = cityName => this.search(cityName, 'weather', WN_WEATHER);

  searchForecast = cityName => this.search(cityName, 'forecast/daily', WN_FORECAST);
}

export default new WeatherService(LocalStorageService);
