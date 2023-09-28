import createHTMLElement from '../js/createHTMLElement.js';

export default class Loading {
  data = null;
  constructor({ $target }) {
    const $loading = createHTMLElement('div');
    $target.appendChild($loading);

    this.$loading = $loading;

    this.data = {
      show: false,
    };

    this.render();
  }

  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$loading.innerHTML = '';
    if (this.data.show) {
      const $p = createHTMLElement('p', { class: 'loading' }, 'Loading');
      this.$loading.appendChild($p);
    }
  }
}
