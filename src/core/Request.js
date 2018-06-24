import axios from 'axios';
import moment from 'moment';

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

  isAllowedToRequestAgain = keyRequest => {
    if (!keyRequest) return true;

    const timeLastFetch = this.localStorageService.getItem(`${keyRequest}_TIME`);
    if (!timeLastFetch) {
      return true;
    }

    return moment().isAfter(timeLastFetch);
  };

  saveResponseRequest = (keyRequest, response) => {
    this.localStorageService.setItem(keyRequest, response);
    this.localStorageService.setItem(
      `${keyRequest}_TIME`,
      moment()
        .add(10, 'minutes')
        .format(),
    );
  };

  fetch = async (requestURL, keyRequestCache) => {
    if (this.isAllowedToRequestAgain(keyRequestCache)) {
      const { data } = await axios.get(requestURL);

      if (keyRequestCache) {
        this.saveResponseRequest(keyRequestCache, data);
      }
      return data;
    }

    return this.localStorageService.getItem(keyRequestCache);
  };
}
