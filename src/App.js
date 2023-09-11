import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import api from './js/api.js';

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    // 검색
    new SearchInput({
      $target,
      onSearch: async (keyword) => {
        const res = await api.fetchBooks(keyword);
        const bookData = res.documents;
        this.setState(bookData);
      },
    });

    // 검색결과
    this.SearchResult = new SearchResult({
      $target,
      initialData: this.data,
    });

    this.init();
  }

  // 초기화
  init() {}

  //상태
  setState(nextData) {
    this.data = nextData;
    this.SearchResult.setState(nextData);
  }
}

export default App;
