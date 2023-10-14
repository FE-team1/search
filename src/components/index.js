import axios from "axios";
import { useState } from "react";
import SearchList from "../components/component/searchList";
import DataRepository from "../repository/DataRepository";
import RecentSearchList from "./component/recentSearchList";
import styled from "styled-components";
import { getRecentKeyword } from "../apis/keyword.api";

const SearchBox = () => {
  // 검색 데이터 & 에러 내용
  const [value, setValue] = useState([]);

  // 최근 검색어 목록
  const [dataList, setDataList] = useState([]);

  const data = JSON.parse(DataRepository.getData());

  // 예외처리
  // 최근 검색어의 갯수가 5개가 넘어가면 첫번째 요소를 삭제
  if (dataList.length > 5) dataList.shift();

  const onSearchKeyword = async (e) => {
    let item = e.target.value;

    DataRepository.setData(dataList);
    e.preventDefault();

    getRecentKeyword(item, value, setValue);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const storage_data = e.target.keyword.value;

    // input.value를 data list에 추가
    setDataList((prev) => [...prev, storage_data]);

    // 값이 추가될때마다 배열 형태로 localStorage에 저장
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
      {/* 최근 검색어 불러오기*/}
      <div style={{ fontWeight: "bold", marginTop: 15 }}>최근 검색어 목록</div>
      {/* <RecentSearchList value={value} data={data} /> */}
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
