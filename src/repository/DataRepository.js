const DATA_KEY = "search_history";

// 관심사 분리
// DataRepository 폴더를 만들어서 localStorage의 data를 관리(get, set ...)
const DataRepository = {
  setData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  },

  getData() {
    return localStorage.getItem(DATA_KEY);
  },
};

export default DataRepository;
