import createHTMLElement from '../js/createHTMLElement.js';

export default class SearchResult {
  $searchResult = null;
  data = null;

  constructor({ $target, initialData, onClick, keyword, onNextPage }) {
    this.$target = $target;
    this.data = initialData;
    this.onClick = onClick;
    this.keyword = keyword;
    this.onNextPage = onNextPage;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  listObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 1.0) {
            observer.unobserve(entry.target);

            let dataIndex = Number(entry.target.dataset.index);
            if (dataIndex === this.data.length - 1) {
              this.onNextPage();
            }
          }
        }
      });
    },
    { threshold: 1.0 },
  );

  render() {
    const dataLength = this.data.length;
    const isResult = this.$target.querySelector('.search-result');

    if (isResult !== null) {
      isResult.remove();
    }
    const $wrapper = createHTMLElement('section', { class: 'search-result' });

    const $ul = createHTMLElement('ul');
    const $searchTitle = createHTMLElement('h2', null);
    $searchTitle.innerHTML =
      dataLength !== 0
        ? `<p>검색결과 <strong>${dataLength}</strong></p>`
        : '검색결과가 없습니다.';

    $wrapper.appendChild($searchTitle);
    $wrapper.appendChild($ul);
    this.$target.appendChild($wrapper);

    this.data.forEach((book, index) => {
      const $li = createHTMLElement('li');
      const $button = createHTMLElement('button', {
        type: 'button',
        'data-index': index,
      });

      const $thumbnailWrap = createHTMLElement('div', {
        class: 'thumb-wrap',
      });
      const $thumbnail = createHTMLElement('img', {
        src: book.thumbnail,
        alt: '',
        'data-src': book.thumbnail,
      });
      const $bookTitle = createHTMLElement(
        'p',
        { class: 'book-title', title: book.title },
        book.title,
      );

      const $bookContent = createHTMLElement(
        'p',
        { class: 'book-contents' },
        book.contents.slice(0, 80),
      );
      const $bookAuthors = createHTMLElement(
        'p',
        { class: 'book-authors', title: book.authors },

        `저자: ${book.authors}`,
      );
      const $bookPublisher = createHTMLElement(
        'p',
        { class: 'book-publisher', title: book.publisher },
        `출판사: ${book.publisher}`,
      );

      $button.addEventListener('click', (e) => {
        const index = Number(e.currentTarget.getAttribute('data-index'));
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($button);

      $thumbnailWrap.appendChild($thumbnail);
      $button.appendChild($thumbnailWrap);
      $button.appendChild($bookTitle);
      $button.appendChild($bookContent);
      $button.appendChild($bookAuthors);
      $button.appendChild($bookPublisher);
      $li.appendChild($button);
      $ul.appendChild($li);
    });
  }
}
