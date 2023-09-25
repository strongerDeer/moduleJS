import createHTMLElement from '../js/createHTMLElement.js';
import ThemeButton from './ThemeButton.js';

export default class Header {
  constructor({ $target }) {
    const $header = createHTMLElement('header', { class: 'header' });
    const $h1 = createHTMLElement('h1', { class: 'h1' });
    const $icon = createHTMLElement(
      'span',
      { class: 'material-symbols-outlined', role: 'img' },
      'book_4',
    );
    $h1.textContent = 'Books';
    $h1.appendChild($icon);
    $header.appendChild($h1);
    $target.appendChild($header);

    new ThemeButton({
      $target: $header,
    });
  }
}
