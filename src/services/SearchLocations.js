import axios from 'axios';

import { LOCALITY_HOST } from '@constants';

class SearchLocations {
  searchStates = async () => {
    try {
      const responseStates = await axios.get(`${LOCALITY_HOST}`);
      const states = responseStates.data.sort((a, b) => a.nome.localeCompare(b.nome));
      return states;
    } catch (err) {
      console.log('err', err);
    }
  };

  searchCities = async uf => {
    try {
      const responseCities = await axios.get(`${LOCALITY_HOST}${uf}/municipios`);
      const cities = responseCities.data;
      return cities;
    } catch (err) {
      console.log('err', err);
    }
  };
}

export default new SearchLocations();
