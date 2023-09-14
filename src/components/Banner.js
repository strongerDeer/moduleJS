import createHTMLElement from '../js/createHTMLElement.js';

export default class Banner {
  data = [
    '../img/img1.jpg',
    '../img/img2.jpg',
    '../img/img3.jpg',
    '../img/img4.jpg',
    '../img/img1.jpg',
    '../img/img2.jpg',
  ];
  current = 0;
  constructor({ $target }) {
    const $wrapper = createHTMLElement('div', { class: 'banner' });
    const $ul = createHTMLElement('ul');
    $ul.style.width = `${this.data.length * 100}%`;

    this.data.map((img) => {
      const $item = createHTMLElement('li');
      const $img = createHTMLElement('img', {
        src: img,
        alt: '',
      });

      $item.appendChild($img);
      $ul.appendChild($item);
    });

    const $prevButton = createHTMLElement('button', { class: 'prev' }, 'PREV');
    const $nextButton = createHTMLElement('button', { class: 'next' }, 'NEXT');

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
