import 'babel-polyfill';
import MainController from './controllers/MainController';

import 'awesomplete/awesomplete.css';
import './styles/index.scss';

document.addEventListener('DOMContentLoaded', () => {
  MainController.init();
});

if (module.hot) {
  module.hot.accept('./controllers/MainController', () => {
    console.log('Accepting the updated printMe module!');
    MainController.init();
  });
}
