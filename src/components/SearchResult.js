import createHTMLElement from '../js/createHTMLElement.js';

export default class SearchResult {
  $searchResult = null;
  data = null;

  constructor({ $target, initialData, onClick }) {
    this.$target = $target;
    this.data = initialData;
    this.onClick = onClick;
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

    this.data.forEach((book, index) => {
      const $li = createHTMLElement('li');
      const $button = createHTMLElement('button', {
        type: 'button',
        'data-index': index,
      });
      const $thumbnail = createHTMLElement('img', {
        src: book.thumbnail,
        alt: '',
      });
      const $bookTitle = createHTMLElement('p', null, book.title);
      const $bookAuthors = createHTMLElement('p', null, book.authors);
      const $bookPublisher = createHTMLElement('p', null, book.publisher);

      $button.addEventListener('click', (e) => {
        const index = Number(e.currentTarget.getAttribute('data-index'));
        this.onClick(this.data[index]);
      });

      $button.appendChild($thumbnail);
      $button.appendChild($bookTitle);
      $button.appendChild($bookAuthors);
      $button.appendChild($bookPublisher);
      $li.appendChild($button);
      $ul.appendChild($li);
    });
  }
}
