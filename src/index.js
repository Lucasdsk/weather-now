import 'babel-polyfill';
import awesomplete from 'awesomplete';
import MainController from './controllers/Main';

import 'awesomplete/awesomplete.css';
import './styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  MainController.init();
});

if (module.hot) {
  module.hot.accept('./controllers/Main', () => {
    console.log('Accepting the updated printMe module!');
    MainController.init();
  });
}
