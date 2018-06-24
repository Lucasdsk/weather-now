import axios from 'axios';
import Request from '@core/Request';
import LocalStorageService from '@services/LocalStorageService';

import { LOCALITY_HOST, WN_STATES } from '@constants';

class LocationsService extends Request {
  constructor(LocalStorageService) {
    super(LocalStorageService);
  }

  searchStates = async () => {
    try {
      const data = await this.fetch(LOCALITY_HOST, WN_STATES);
      return data.sort((a, b) => a.nome.localeCompare(b.nome));
    } catch (err) {
      console.log('err', err);
    }
  };

  searchCities = async uf => {
    try {
      const data = await this.fetch(`${LOCALITY_HOST}${uf}/municipios`);
      return data;
    } catch (err) {
      console.log('err', err);
    }
  };
}

export default new LocationsService(LocalStorageService);
