import axios from 'axios';
import moment from 'moment';

import { CACHE_TIME, CITY_SEARCHED } from 'constants';

function NotImplementedException(message) {
  this.message = message;
  this.name = 'NotImplementedException';
}

/*
ao fazer o request vai ser informado o identificador
esse identificador vai ser verificado no localStorage se já existe algum registro
  se n tiver, ele vai salvar o tempo que foi feito (timestamp)
  se já tiver, vai ser verificado se já passou 10 minutos desde o último request,
    se já tiver passado, faz o request novamente
    se não, retorna o valor salvo no localstorage
*/
export default class Request {
  constructor(LocalStorageService) {
    this.localStorage = LocalStorageService;
  }

  set localStorage(LocalStorageService) {
    if (!LocalStorageService) {
      throw new NotImplementedException('LocalStorageService não informado.');
    }

    this.localStorageService = LocalStorageService;
  }

  isAllowedToRequestAgain = (keyRequest, cityName) => {
    if (!keyRequest || !cityName) return true;

    const lastFetch = this.localStorageService.getItem(`${keyRequest}_INFO`);
    // const lastCitySearched = this.localStorageService.getItem(CITY_SEARCHED);
    if (!lastFetch || lastFetch.city !== cityName) {
      return true;
    }

    return moment().isAfter(lastFetch.time);
  };

  saveResponseRequest = (keyRequest, response, cityName) => {
    // this.localStorageService.setItem(CITY_SEARCHED, cityName);
    this.localStorageService.setItem(keyRequest, response);
    this.localStorageService.setItem(`${keyRequest}_INFO`, {
      time: moment()
        .add(CACHE_TIME, 'minutes')
        .format(),
      city: cityName,
    });
  };

  fetch = async (requestURL, keyRequestCache, cityName) => {
    if (this.isAllowedToRequestAgain(keyRequestCache, cityName)) {
      const { data } = await axios.get(requestURL);

      if (keyRequestCache && cityName) {
        this.saveResponseRequest(keyRequestCache, data, cityName);
      }
      return data;
    }

    return this.localStorageService.getItem(keyRequestCache);
  };
}
