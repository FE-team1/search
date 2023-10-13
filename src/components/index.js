import axios from "axios";
import { useEffect, useState } from "react";
import getKeyword from "../apis/keyword.api";
import SearchList from "../components/component/searchList";
import DataRepository from "../repository/DataRepository";
import RecentSearchList from "./component/recentSearchList";

const SearchBox = () => {
  const [isSearch, setIsSearch] = useState("");
  const [value, setValue] = useState([]);
  const [dataList, setDataList] = useState([]);

  const data = DataRepository.getData();

  // 예외처리
  // 최근 검색어의 갯수가 5개가 넘어가면 첫번째 요소를 삭제
  if (dataList.length > 5) dataList.shift();

  useEffect(() => {
    getKeyword();
  }, []);

  const onSearchKeyword = async (e) => {
    let item = e.target.value;

    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:3000/search?key=${item}`);
      setIsSearch("검색");
      setValue(res.data);
      return value;
    } catch (err) {
      setIsSearch("에러");
      setValue(err.response.data);
      return value;
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    // setData를 통해 localStorage에 data를 추가
    const storage_data = e.target.keyword.value;
    DataRepository.setData(storage_data);

    setDataList((prev) => [...prev, DataRepository.getData()]);
    return dataList;
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input type="text" name="keyword" onChange={onSearchKeyword} />
      <button>검색</button>
      <SearchList isSearch={isSearch} value={value} />
      {/* 최근 검색어 불러오기*/}
      <div style={{ fontWeight: "bold", marginTop: 15 }}>최근 검색어 목록</div>
      <RecentSearchList value={value} dataList={dataList} />

      {/* localStorage에 마지막 데이터만 추가되는중 */}
      <div style={{ color: "red", marginTop: 15 }}>localStorage에 마지막으로 저장된 값은? {data}</div>
    </form>
  );
};

export default SearchBox;
