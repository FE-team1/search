import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchList from '../components/component/searchList';
import DataRepository from '../repository/DataRepository';
import RecentSearchList from './component/recentSearchList';
import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';

const SearchBox = () => {
    // isArray로 처리
    // const [isSearch, setIsSearch] = useState('');

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
            setValue(res.data);
        } catch (err) {
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
        <S.Wrapper>
            <S.SearchForm onSubmit={onSubmitForm}>
                <S.InputBox>
                    <S.Input
                        type="text"
                        name="keyword"
                        onChange={onSearchKeyword}
                        placeholder="검색어를 입력해주세요."
                    />
                    <GrSearch size="1.5em" />
                </S.InputBox>
            </S.SearchForm>
            {/* 최근 검색어 불러오기*/}
            {value.length === 0 ? (
                <HistoryContainer>
                    <p style={{ color: '#aaaaaa' }}>최근 검색된 기록이 없습니다.</p>
                </HistoryContainer>
            ) : (
                <S.ListContainer>
                    <SearchList value={value} />
                    <S.HistoryContainer>
                        <S.Title>최근 검색어</S.Title>
                        <RecentSearchList value={value} dataList={dataList} />
                    </S.HistoryContainer>
                </S.ListContainer>
            )}
            <div style={{ color: 'red', marginTop: 15 }}>localStorage에 저장된 값은? {data}</div>
        </S.Wrapper>
    );
};

export default SearchBox;

const Wrapper = styled.div`
    position: relative;
    margin-top: 400px;
    display: flex;
    flex-direction: column;
    margin: 400px 700px;
`;

const SearchForm = styled.form`
    display: flex;
`;
const InputBox = styled.div`
    box-shadow : 0 2px 6px rgb(0 0 0 / 30%);
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
    padding: 5px;
    &::placeholder {
        color: #aaaaaa;
    }
    &:focus {
        outline: none;
    }
`;

const HistoryContainer = styled.div`
    padding: 18px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    float: left;
    font-weight: 400;
    color: #666;
`;

const ListContainer = styled.div`
    box-shadow : 0 2px 6px rgb(0 0 0 / 30%);
    border-radius: 10px;
    width: 320px;
    padding: 10px;
`;

const S = {
    Wrapper,
    SearchForm,
    InputBox,
    Input,
    HistoryContainer,
    Title,
    ListContainer,
};
