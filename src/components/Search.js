import createHTMLElement from '../js/createHTMLElement.js';

export default class Search {
  constructor({ $target, onSearch }) {
    const $header = createHTMLElement('header', { class: 'header' });
    const $h1 = createHTMLElement('h1', null, 'search book');
    const $form = createHTMLElement('form', { class: 'search-form' });
    const $searchInput = createHTMLElement('input', {
      type: 'search',
      placeholder: '책 이름을 입력하세요',
    });
    const $button = createHTMLElement('button', { type: 'submit' }, '검색');
    this.$header = $header;
    this.$h1 = $h1;
    this.$form = $form;
    this.$searchInput = $searchInput;
    this.$button = $button;

    this.$form.appendChild(this.$searchInput);
    this.$form.appendChild(this.$button);
    this.$header.appendChild(this.$h1);
    this.$header.appendChild(this.$form);
    $target.appendChild(this.$header);

    const handleSubmit = (e) => {
      e.preventDefault();

      const keyword = $searchInput.value;
      if (keyword === ' ') {
        $searchInput.value = '';
      } else {
        onSearch(keyword);
      }
    };

    $form.addEventListener('submit', handleSubmit);
  }
}
