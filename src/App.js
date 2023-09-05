class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

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
