import createHTMLElement from '../js/createHTMLElement.js';
import KeywordHistory from './KeywordHistory.js';
import SortingCounter from './SortingCounter.js';

export default class SearchInput {
  constructor({ $target, onSearch }) {
    const $wrapper = createHTMLElement('div', { class: 'search' });
    const $h2 = createHTMLElement('h2', { class: 'a11y-hidden' }, '도서 검색');

    const $form = createHTMLElement('form', { class: 'search-form' });
    const $searchLabel = createHTMLElement(
      'label',
      { class: 'a11y-hidden' },
      '검색',
    );
    const $searchInput = createHTMLElement('input', {
      type: 'search',
      placeholder: '책 이름을 입력하세요',
    });
    const $searchButton = createHTMLElement(
      'button',
      { type: 'submit' },
      '검색',
    );

    $form.appendChild($searchLabel);
    $form.appendChild($searchInput);

    $wrapper.appendChild($h2);
    $wrapper.appendChild($form);
    $target.appendChild($wrapper);

    const handleSubmit = (e) => {
      e.preventDefault();

      const keyword = $searchInput.value.trim();

      if (keyword === '') {
        $searchInput.value = '';
      } else {
        $searchInput.value = keyword;
        const sorting = this.SortingCounter.getSorting();

        // 검색결과 노출
        onSearch(keyword, sorting);

        // 최근키워드 저장
        this.KeywordHistory.addKeyword(keyword);
      }
    };
    this.KeywordHistory = new KeywordHistory({
      $target: $wrapper,
      onSearch,
    });
    this.SortingCounter = new SortingCounter({
      $target: $form,
      onSearch,
      keyword: this.KeywordHistory.getLastKeyword(),
    });

    $form.appendChild($searchButton);

    $form.addEventListener('submit', handleSubmit);
  }
}
