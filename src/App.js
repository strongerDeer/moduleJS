import BookInfo from './components/BookInfo.js';
import Loading from './components/Loading.js';
import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import Visual from './components/Visual.js';
import api from './js/api.js';

class App {
  $target = null;
  DEFAULT_PAGE = 1;
  data = {
    items: [],
    page: this.DEFAULT_PAGE,
  };

  constructor($target) {
    this.$target = $target;

    // loading
    this.Loading = new Loading({
      $target,
    });

    // header+banner
    this.Visual = new Visual({
      $target,
    });

    // 검색
    new SearchInput({
      $target,
      onSearch: async (keyword, limit) => {
        this.Loading.show();

        const res = await api.fetchBooks(keyword, limit);
        const bookData = res.documents;

        setTimeout(() => {
          this.setState({
            items: bookData,
            page: this.DEFAULT_PAGE,
          });
          this.Loading.hide();
          this.saveResult(bookData);
        }, 300);
      },
    });

    // 검색결과
    this.SearchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: (book) => {
        this.BookInfo.showModal({
          visible: true,
          book,
        });
      },

      // 무한스크롤
      onNextPage: async () => {
        this.Loading.show();

        const lastKeyword = JSON.parse(localStorage.getItem('keyword'))[0];
        const limit = Number(localStorage.getItem('sorting'));

        const page = this.data.page + 1;

        const res = await api.fetchBooks(lastKeyword, limit, page);
        const newData = res.documents;

        this.setState({
          items: [...this.data.items, ...newData],
          page: page,
        });

        setTimeout(() => {
          this.Loading.hide();
        }, 1000);
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
    this.SearchResult.setState(nextData.items);
  }

  saveResult(result) {
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  // 초기화
  init() {
    const savedlastResult = localStorage.getItem('lastResult');
    const lastResult =
      savedlastResult === null ? [] : JSON.parse(savedlastResult);

    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE,
    });
  }
}

export default App;
