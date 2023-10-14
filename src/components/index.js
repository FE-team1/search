import { useState } from "react";
import SearchList from "../components/component/searchList";
import DataRepository from "../repository/DataRepository";
import styled from "styled-components";
import { getRecentKeyword } from "../apis/keyword.api";

const SearchBox = () => {
  const [value, setValue] = useState([]);

  // 최근 검색어 목록
  const [dataList, setDataList] = useState([]);

  const data = JSON.parse(DataRepository.getData());

  if (dataList.length > 5) dataList.shift();

  const onSearchKeyword = async (e) => {
    e.preventDefault();
    let item = e.target.value;
    DataRepository.setData(dataList);
    getRecentKeyword(item, value, setValue);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const storage_data = e.target.keyword.value;
    setDataList((prev) => [...prev, storage_data]);
    DataRepository.setData(dataList);
  };
  console.log(value);

  return (
    <S.SearchForm onSubmit={onSubmitForm}>
      <div>
        <input type="text" name="keyword" onChange={onSearchKeyword} />
        <button>검색</button>
      </div>
      <SearchList value={value} />
      <div style={{ fontWeight: "bold", marginTop: 15 }}>최근 검색어 목록</div>
      {data.map((item) => (
        <div>{item}</div>
      ))}
    </S.SearchForm>
  );
};

export default SearchBox;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const S = {
  SearchForm,
};
