import BookInfo from './components/BookInfo.js';
import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import Visual from './components/Visual.js';
import api from './js/api.js';

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    // header+banner
    this.Visual = new Visual({
      $target,
    });

    // 검색
    new SearchInput({
      $target,
      onSearch: async (keyword, limit) => {
        const res = await api.fetchBooks(keyword, limit);
        const bookData = res.documents;
        this.setState(bookData);
        this.saveResult(bookData);
      },
    });

    // 검색결과
    this.SearchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (book) => {
        this.BookInfo.showModal({
          visible: true,
          book,
        });
      },
    });

    // 책정보
    this.BookInfo = new BookInfo({
      $target,
    });

    this.init();
  }

  //상태
  setState(nextData) {
    this.data = nextData;
    this.SearchResult.setState(nextData);
  }

  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  // 초기화
  init() {
    const savedlastResult = localStorage.getItem('lastResult');
    const lastResult =
      savedlastResult === null ? [] : JSON.parse(savedlastResult);

    this.setState(lastResult);
  }
}

export default App;
