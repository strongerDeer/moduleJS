import Search from './components/Search.js';
import api from './js/api.js';

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    new Search({
      $target,
      onSearch: async (keyword) => {
        const res = await api.fetchBooks(keyword);
        const bookData = res.documents;
        console.log(bookData);
        this.setState(bookData);
      },
    });

    this.init();
  }

  // 초기화
  init() {}

  //상태
  setState(nextData) {
    this.data = nextData;
  }
}

export default App;
