class MainController {
  constructor() {
    this.name = 'Weather Now';
  }

  init() {
    document.getElementById('app-name').innerHTML = this.name;
  }
}

export default new MainController();
