import createHTMLElement from '../js/createHTMLElement.js';

export default class SearchResult {
  $searchResult = null;
  data = null;

  constructor({ $target, initialData }) {
    this.$target = $target;
    this.data = initialData;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    const dataLength = this.data.length;
    const isResult = this.$target.querySelector('.search-result');

    if (isResult !== null) {
      isResult.remove();
    }
    const $wrapper = createHTMLElement('section', { class: 'search-result' });

    const $ul = createHTMLElement('ul');
    const $searchTitle = createHTMLElement(
      'h2',
      null,
      dataLength !== 0 ? `검색결과 ${dataLength}개` : `검색결과가 없습니다.`,
    );
    $wrapper.appendChild($searchTitle);
    $wrapper.appendChild($ul);
    this.$target.appendChild($wrapper);

    this.data.forEach((book) => {
      const $li = createHTMLElement('li');
      const $thumbnail = createHTMLElement('img', {
        src: book.thumbnail,
        alt: '',
      });
      const $bookTitle = createHTMLElement('p', null, book.title);
      const $bookAuthors = createHTMLElement('p', null, book.authors);
      const $bookPublisher = createHTMLElement('p', null, book.publisher);

      $li.appendChild($thumbnail);
      $li.appendChild($bookTitle);
      $li.appendChild($bookAuthors);
      $li.appendChild($bookPublisher);
      $ul.appendChild($li);
    });
  }
}
