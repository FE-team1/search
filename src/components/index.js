import axios from "axios";
import { useEffect, useState } from "react";
import getKeyword from "../apis/keyword.api";
import SearchList from "./searchList";
import DataRepository from "../repository/DataRepository";
import { useData } from "../provider/searchProvider";

const SearchBox = () => {
  const [isSearch, setIsSearch] = useState("");
  const [value, setValue] = useState([]);
  // const [searchData, setSearchData] = useData([]);

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

  // 폼이 제출되면
  // localStorage에 검색 데이터를 저장
  // setData를 통해 localStorage에 data를 변경
  const onSubmitForm = (e) => {
    e.preventDefault();
    const storage_data = e.target.keyword.value;
    DataRepository.setData(storage_data);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input type="text" name="keyword" onChange={onSearchKeyword} />
      <button>검색</button>
      <SearchList isSearch={isSearch} value={value} />
      {/* 최근 검색어 불러오기*/}
      <div>{DataRepository.getData()}</div>
    </form>
  );
};

export default SearchBox;
