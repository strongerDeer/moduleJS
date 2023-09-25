import createHTMLElement from '../js/createHTMLElement.js';
import Banner from './Banner.js';
import Header from './Header.js';

export default class Visual {
  constructor({ $target }) {
    const $wrapper = createHTMLElement('div', { class: 'visual' });
    $target.appendChild($wrapper);

    new Header({
      $target: $wrapper,
    });

    new Banner({
      $target: $wrapper,
    });
  }
}
