export default class Component {
  constructor(componentName) {
    this.componentName = componentName;
  }

  mount() {
    document.querySelector(`[data-component="${this.componentName}"]`).innerHTML = this.render();
  }

  render() {
    return '<div>Loading...</div>';
  }
}
