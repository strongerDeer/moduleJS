import createHTMLElement from '../js/createHTMLElement.js';

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

export default class ThemeButton {
  isDarkMode = null;

  constructor({ $target }) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const $button = createHTMLElement(
      'button',
      { type: 'button' },
      this.isDarkMode ? '라이트 테마로 변경' : '다크 테마로 변경',
    );
    $target.appendChild($button);
    this.$button = $button;

    this.init();

    // 시스템 테마 변경 시
    mediaQuery.addEventListener('change', () => {
      this.setState(mediaQuery.matches);
      this.toggleButtonLabel();
    });
    // 버튼 클릭 시
    $button.addEventListener('click', () => {
      this.setState(!this.isDarkMode);
      this.toggle();
    });
  }

  setState(isDarkMode) {
    this.isDarkMode = isDarkMode;
  }

  toggleButtonLabel() {
    this.$button.textContent = this.isDarkMode
      ? '라이트 테마로 변경'
      : '다크 테마로 변경';
  }

  toggle() {
    const $body = document.querySelector('body');

    if (this.isDarkMode) {
      $body.setAttribute('class', DARK_THEME);
      localStorage.setItem('theme', DARK_THEME);
    } else {
      $body.setAttribute('class', LIGHT_THEME);
      localStorage.setItem('theme', LIGHT_THEME);
    }

    this.toggleButtonLabel();
  }

  init() {
    let savedTheme;

    try {
      savedTheme = localStorage.getItem('theme');
    } catch (error) {
      console.error('Error localStorage', error);
    }

    if (savedTheme === null) {
      // 저장된 테마가 없을때, 시스템 상태로
      this.setState(window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.toggleButtonLabel();
    } else {
      // 테마 변경을 한적이 있을 경우, 저장정보로
      this.setState(savedTheme === DARK_THEME);
      this.toggle();
    }
  }
}
