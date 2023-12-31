import createHTMLElement from '../js/createHTMLElement.js';
import uniqueArray from '../utils/uniqueArray.js';

// 최근 키워드 개수
const KEYWORD_NUM = 5;

export default class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;
    this.init();
  }

  //로컬에서 키워드 히스토리 가져오기
  getHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('keyword'));
    return savedHistory === null ? [] : savedHistory;
  }

  getLastKeyword() {
    return this.getHistory()[0];
  }
  // 키워드 추가하기
  addKeyword(keyword) {
    let keywordHistory = this.getHistory();
    keywordHistory.unshift(keyword);

    // 중복제거
    keywordHistory = uniqueArray(keywordHistory);
    // 최대 키워드 수
    keywordHistory = keywordHistory.slice(0, KEYWORD_NUM);
    // 로컬저장
    localStorage.setItem('keyword', JSON.stringify(keywordHistory));
    this.init();
  }

  init() {
    const data = this.getHistory();
    this.setState(data);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  savedKeywordSearch() {
    const $buttons = this.$target.querySelectorAll('button');

    $buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const sorting = localStorage.getItem('sorting');
        this.onSearch(button.textContent, sorting ? sorting : 12);
      });
    });
  }

  render() {
    const isKeyword = this.$target.querySelector('.keyword');

    if (isKeyword !== null) {
      isKeyword.remove();
    }

    if (this.data.length !== 0) {
      const $wrapper = createHTMLElement('section', { class: 'keyword' });
      const $title = createHTMLElement('h3', null, '최근 검색어');

      const $ol = createHTMLElement('ol');

      this.data.map((keyword) => {
        const $li = createHTMLElement('li');
        const $button = createHTMLElement('button', null, keyword);

        $li.appendChild($button);
        $ol.appendChild($li);
      });
      $wrapper.appendChild($title);
      $wrapper.appendChild($ol);
      this.$target.appendChild($wrapper);
    }

    this.savedKeywordSearch();
  }
}
