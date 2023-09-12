import createHTMLElement from '../js/createHTMLElement.js';
import KeywordHistory from './KeywordHistory.js';

export default class SearchInput {
  constructor({ $target, onSearch }) {
    const $header = createHTMLElement('header', { class: 'header' });
    const $h1 = createHTMLElement('h1', null, 'search book');
    const $form = createHTMLElement('form', { class: 'search-form' });
    const $searchInput = createHTMLElement('input', {
      type: 'search',
      placeholder: '책 이름을 입력하세요',
    });
    const $button = createHTMLElement('button', { type: 'submit' }, '검색');
    $form.appendChild($searchInput);
    $form.appendChild($button);
    $header.appendChild($h1);
    $header.appendChild($form);
    $target.appendChild($header);

    const handleSubmit = (e) => {
      e.preventDefault();

      const keyword = $searchInput.value.trim();
      if (keyword === '') {
        $searchInput.value = '';
      } else {
        $searchInput.value = keyword;
        const selectedValue = Number($select.value);

        // 검색결과 노출
        onSearch(keyword, selectedValue);

        // 최근키워드 저장
        this.KeywordHistory.addKeyword(keyword);
      }
    };

    // 정렬 UI
    const $select = createHTMLElement('select', { class: 'count' }, null);
    const limitCountOptions = [10, 25, 50];
    limitCountOptions.map((option) => {
      let $option = createHTMLElement(
        'option',
        { value: option },
        `${option}개`,
      );
      $select.appendChild($option);
    });
    $header.appendChild($select);

    this.KeywordHistory = new KeywordHistory({
      $target: $header,
      onSearch,
    });

    $form.addEventListener('submit', handleSubmit);
  }
}
