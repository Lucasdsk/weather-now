import awesomplete from 'awesomplete';
import MainController from './controllers/Main';

import 'awesomplete/awesomplete.css';
import './styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  MainController.init();
});
