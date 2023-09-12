import config from './config.js';
const { API_ENDPOINT, REST_API_KEY } = config;

/*
카카오 API 책 검색하기
https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book

query(String) 검색어
sort(String) 결과 문서 정렬 방식, accuracy(정확도순) - 기본값 또는 latest(발간일순), 
page(Integer) 결과 페이지 번호, 1~50 사이의 값(기본값 10)
size(Integer)	한 페이지에 보여질 문서 수, 1~50 사이의 값, 기본 값 10
target(String) 검색 필드 제한 : title(제목), isbn (ISBN), publisher(출판사), person(인명)	
*/
/*
검색결과
{
  "meta": {
    "is_end": Boolean(현재 페이지가 마지막 페이지인지 여부, 값이 false면 page를 증가시켜 다음 페이지를 요청할 수 있음),
    "pageable_count": Integer(중복된 문서를 제외하고, 처음부터 요청 페이지까지의 노출 가능 문서 수),
    "total_count": Integer(검색된 문서 수)
  },
  "documents": [
    {
      "title": "도서 제목",
      "thumbnail": "도서 표지",
      "contents": "도서 소개",
      "publisher": "도서 출판사",
      "datetime": "도서출판 날짜(Datetime)",
      "authors": ["도서저자 리스트"],
      "translators": ["도서 번역자 리스트"],
      "url": "도서 상세 URL"
      "price": 도서 정가(Integer),
      "sale_price": 도서 판매가(Integer),
      "status": "도서 판매 상태 정보(정상/품절/절판)",
    },
  ]
}
*/
const fetchURL = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });
    if (res.status === 200) {
      return res.json();
    } else {
      throw REQUEST_ERROR[res.status];
    }
  } catch (error) {
    console.log(error.msg);
    return { data: null };
  }
};

const api = {
  fetchBooks: async (keyword, limit) => {
    const params = new URLSearchParams({
      query: keyword,
      page: 1,
      size: limit ? limit : 10,
    });
    return fetchURL(`${API_ENDPOINT}?${params}`);
  },
};

export default api;
