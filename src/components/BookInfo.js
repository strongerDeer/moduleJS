import createHTMLElement from '../js/createHTMLElement.js';

export default class BookInfo {
  data = null;

  constructor({ $target, data }) {
    this.$target = $target;
    this.data = data;
  }

  showModal(bookData) {
    this.setState(bookData);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  closeModal() {
    document.querySelector('.modal-wrapper').remove();
    this.setState({
      visible: false,
      book: undefined,
    });
    document.documentElement.removeAttribute('style');
  }

  render() {
    if (this.data.book) {
      const { datetime, contents, url } = this.data.book;
      const date = datetime.split('T')[0].split('-');
      const $wrapper = createHTMLElement(
        'div',
        { class: 'modal-wrapper' },
        null,
      );
      const $section = createHTMLElement('section', { class: 'modal' }, null);
      const $content = createHTMLElement(
        'p',
        { class: 'book-content' },
        contents,
      );

      const $url = createHTMLElement(
        'a',
        { href: url, target: '_blank', title: '새창' },
        'Daum 검색',
      );

      const $datetime = createHTMLElement(
        'p',
        { class: 'book-datetime' },
        `
      ${date[0]}.${date[1]}.${date[2]}
      `,
      );
      const $close = createHTMLElement('button', null, '닫기');

      $section.appendChild($content);
      $section.appendChild($datetime);
      $section.appendChild($url);
      $section.appendChild($close);

      $wrapper.appendChild($section);
      this.$target.appendChild($wrapper);

      document.documentElement.setAttribute('style', 'overflow:hidden');
      // 닫기
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeModal();
        }
      });
      $close.addEventListener('click', (e) => {
        this.closeModal();
      });
      $wrapper.addEventListener('click', (e) => {
        const isDim = e.target.className === 'modal-wrapper';
        if (isDim) {
          this.closeModal();
        }
      });
    }
  }
}
