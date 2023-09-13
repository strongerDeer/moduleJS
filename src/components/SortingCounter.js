import createHTMLElement from '../js/createHTMLElement.js';

export default class SortingCounter {
  constructor({ $target }) {
    const $select = createHTMLElement('select', { class: 'count' }, null);
    const limitCountOptions = [12, 24, 48];
    limitCountOptions.map((option) => {
      let $option = createHTMLElement(
        'option',
        {
          value: option,
        },
        `${option}개`,
      );
      $select.appendChild($option);
    });

    $target.appendChild($select);

    this.$select = $select;
    this.init();

    $select.addEventListener('change', (e) => {
      localStorage.setItem('sorting', $select.value);
      this.init();
    });
  }

  init() {
    const savedSorting = this.getSorting();
    const options = this.$select.querySelectorAll('option');
    let selectedOption;

    if (savedSorting !== null) {
      selectedOption = Array.from(options).find((option) => {
        return option.value === savedSorting;
      });
      options.forEach((option) => {
        option.removeAttribute('selected');
      });

      selectedOption.setAttribute('selected', '');
    }
  }

  getSorting() {
    return localStorage.getItem('sorting');
  }
}
