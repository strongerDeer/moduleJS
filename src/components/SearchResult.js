import createHTMLElement from '../js/createHTMLElement.js';

export default class SearchResult {
  $searchResult = null;
  data = null;

  constructor({ $target, initialData }) {
    const $wrapper = createHTMLElement('section');
    const $ul = createHTMLElement('ul', { class: 'search-result' });
    this.$ul = $ul;
    $wrapper.appendChild($ul);
    $target.appendChild($wrapper);

    this.data = initialData;
  }

  setState(nextData) {
    this.data = nextData;

    this.render();
  }
  render() {
    this.data.forEach((book, index) => {
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
      this.$ul.appendChild($li);
    });
  }
}
