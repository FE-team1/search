import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchList from '../components/component/searchList';
import DataRepository from '../repository/DataRepository';
import RecentSearchList from './component/recentSearchList';
import styled from 'styled-components';
import { GrSearch} from 'react-icons/gr';

const SearchBox = () => {
    // isArray로 처리
    const [isSearch, setIsSearch] = useState('');

    // 검색 데이터 & 에러 내용
    const [value, setValue] = useState([]);

    // 최근 검색어 목록
    const [dataList, setDataList] = useState([]);

    const data = DataRepository.getData();

    // 예외처리
    // 최근 검색어의 갯수가 5개가 넘어가면 첫번째 요소를 삭제
    if (dataList.length > 5) dataList.shift();

    useEffect(() => {
        DataRepository.setData(dataList);
    }, [dataList]);

    const onSearchKeyword = async (e) => {
        let item = e.target.value;

        e.preventDefault();

        try {
            const res = await axios.get(`http://localhost:3000/search?key=${item}`);
            setIsSearch('검색');
            setValue(res.data);
        } catch (err) {
            setIsSearch('에러');
            setValue(err.response.data);
        }
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        const storage_data = e.target.keyword.value;

        // input.value를 data list에 추가
        setDataList((prev) => [...prev, storage_data]);

        // 값이 추가될때마다 배열 형태로 localStorage에 저장
        DataRepository.setData(dataList);
        return dataList;
    };

    return (
        <S.SearchForm onSubmit={onSubmitForm}>
            <S.InputBox>
                <S.Input type="text" name="keyword" onChange={onSearchKeyword} />
                <GrSearch size='1.5em'/>
            </S.InputBox>
            <SearchList isSearch={isSearch} value={value} />
            {/* 최근 검색어 불러오기*/}
            <div style={{ fontWeight: 'bold', marginTop: 15 }}>최근 검색어 목록</div>
            <RecentSearchList value={value} dataList={dataList} />

            {/* localStorage에 마지막 데이터만 추가되는중 */}
            <div style={{ color: 'red', marginTop: 15 }}>localStorage에 저장된 값은? {data}</div>
        </S.SearchForm>
    );
};

export default SearchBox;

const SearchForm = styled.form`
    position: relative;
    margin-top: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const InputBox = styled.div`
    border: 2px solid #d9d9d9;
    border-radius: 10px;
    display: flex;
    padding: 3px;
`;


const Input = styled.input`
    font-size: 15px;
    color: #222222;
    width: 300px;
    border: none;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
    background: none;
    z-index: 5;
    padding: 5px;
    &::placeholder { color: #aaaaaa; }
    &:focus { outline: none; }
`;


const S = {
    SearchForm,
    InputBox,
    Input,
};
