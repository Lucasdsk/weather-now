import axios from 'axios';

import { LOCALITY_HOST } from '@constants';

class SearchLocations {
  searchStates = async () => {
    try {
      const responseLocations = await axios.get(`${LOCALITY_HOST}/estados`);
      console.log('responseLocations', responseLocations);
    } catch (err) {
      console.log('err', err);
    }
  };
}

export default new SearchLocations();
