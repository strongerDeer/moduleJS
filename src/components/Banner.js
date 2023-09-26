import createHTMLElement from '../js/createHTMLElement.js';

export default class Banner {
  data = [
    {
      title: '기획자의 일',
      desc: '아이디어, 실행, 성과까지 일의 흥망성쇠를 좌우하는',
      link: '#',
      src: '../img/book1.jpg',
    },
    {
      title: '기획자의 일',
      desc: '아이디어, 실행, 성과까지 일의 흥망성쇠를 좌우하는',
      link: '#',
      src: '../img/img2.jpg',
    },
    { title: '기획자의 일', desc: '책설명', link: '#', src: '../img/img3.jpg' },
    { title: '기획자의 일', desc: '책설명', link: '#', src: '../img/img4.jpg' },
    { title: '기획자의 일', desc: '책설명', link: '#', src: '../img/img5.jpg' },
  ];
  current = 0;
  constructor({ $target }) {
    const $wrapper = createHTMLElement('div', { class: 'banner' });
    const $ul = createHTMLElement('ul');
    $ul.style.width = `${this.data.length * 100}%`;

    const $title = createHTMLElement(
      'h2',
      { class: 'a11y-hidden' },
      '추천 도서',
    );

    this.data.map((data) => {
      const $item = createHTMLElement('li');

      const $article = createHTMLElement('article', { class: 'book-article' });
      const $div = createHTMLElement('div', { class: 'book-content' });

      const $bookdesc = createHTMLElement(
        'p',
        { class: 'book-desc' },
        data.desc,
      );
      const $bookTitle = createHTMLElement(
        'h3',
        { class: 'book-title' },
        data.title,
      );
      const $link = createHTMLElement(
        'a',
        { class: 'btn', href: data.link },
        'View',
      );

      const $icon = createHTMLElement(
        'span',
        { class: 'material-symbols-outlined' },
        'north_east',
      );

      const $img = createHTMLElement('img', {
        src: data.src,
        alt: '',
      });

      $link.appendChild($icon);

      $div.appendChild($bookdesc);
      $div.appendChild($bookTitle);
      $div.appendChild($link);

      $article.appendChild($div);
      $article.appendChild($img);

      $item.appendChild($article);
      $ul.appendChild($item);
    });

    const $prevButton = createHTMLElement('button', { class: 'prev' });
    const $prevText = createHTMLElement(
      'span',
      { class: 'a11y-hidden' },
      'prev',
    );
    const $prevIcon = createHTMLElement(
      'span',

      { class: 'material-symbols-outlined' },
      'Arrow_Back',
    );
    const $nextButton = createHTMLElement('button', { class: 'next' });
    const $nextText = createHTMLElement(
      'span',
      { class: 'a11y-hidden' },
      'prev',
    );
    const $nextIcon = createHTMLElement(
      'span',
      { class: 'material-symbols-outlined' },
      'Arrow_Forward',
    );

    $prevButton.appendChild($prevText);
    $prevButton.appendChild($prevIcon);
    $nextButton.appendChild($nextText);
    $nextButton.appendChild($nextIcon);

    $wrapper.appendChild($title);
    $wrapper.appendChild($ul);
    $wrapper.appendChild($prevButton);
    $wrapper.appendChild($nextButton);
    $target.appendChild($wrapper);

    $prevButton.addEventListener('click', () => {
      let prev = this.current - 1;

      if (prev < 0) {
        return;
      } else if (prev === 0) {
        $prevButton.setAttribute('disabled', '');
      }
      $nextButton.removeAttribute('disabled');
      this.changeCurrent(prev);
    });
    $nextButton.addEventListener('click', () => {
      let next = this.current + 1;
      if (next === this.data.length) {
        return;
      } else if (next === this.data.length - 1) {
        $nextButton.setAttribute('disabled', '');
      }
      $prevButton.removeAttribute('disabled');
      this.changeCurrent(next);
    });
    this.$prevButton = $prevButton;
    this.$nextButton = $nextButton;
    this.$ul = $ul;

    this.init();
  }

  changeCurrent(index) {
    this.current = index;
    this.moveTo(index);
  }
  moveTo(index) {
    let leftPos = 100 * index;
    this.$ul.style.transform = `translateX(-${leftPos}vw)`;
  }

  init() {
    this.$prevButton.setAttribute('disabled', '');
  }
}
