function InvalidElementException(message) {
  this.message = message;
  this.name = 'InvalidElementException';
}

export default class Component {
  constructor(componentSelector) {
    this.componentElement = componentSelector;
    this.__mountEvent = new Event('mount');
    this.__mountedEvent = new Event('mounted');

    this.state = {};
    this.props = {};
  }

  set componentElement(componentSelector) {
    this.$element = document.querySelector(`[data-component="${componentSelector}"]`);

    if (!this.$element) {
      throw new InvalidElementException(
        `Não foi encontrado nenhum elemento com o nome: ${componentSelector}. Verifique se ele foi declarado corretamente.`,
      );
    }
  }

  setState = newState => {
    if (JSON.stringify({ ...this.state, ...newState }) === JSON.stringify(this.state)) {
      return;
    }

    this.state = {
      ...this.state,
      ...newState,
    };

    this.$element.dispatchEvent(this.__mountEvent);
  };

  init = props => {
    this.props = props;

    this.mount();

    this.$element.addEventListener('mount', this.mount);
    this.$element.addEventListener('mounted', this.mounted);
  };

  mount = () => {
    this.$element.innerHTML = this.render();
    this.$element.dispatchEvent(this.__mountedEvent);
  };

  mounted() {}

  render() {
    return '<div class="wn-component-loading"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>';
  }
}
