import { useState } from 'react';
import SearchList from '../components/component/searchList';
import DataRepository from '../repository/DataRepository';
import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import getRecentKeyword from '../apis/keyword.api';

const SearchBox = () => {
    const [value, setValue] = useState([]);
    const [searchResult, setSearchResult] = useState('');
    const [cursorIndex, setCursorIndex] = useState(0); //키보드방향으로 드롭다운 선택을 위한 상태

    // 최근 검색어 목록
    const [dataList, setDataList] = useState([]);

    const data = JSON.parse(DataRepository.getData());

    if (dataList.length > 5) dataList.shift();

    const onSearchKeyword = async (e) => {
        e.preventDefault();
        let item = e.target.value;
        DataRepository.setData(dataList);
        getRecentKeyword(item, value, setValue);
        setSearchResult(item);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        const storage_data = e.target.keyword.value;
        setDataList((prev) => [...prev, storage_data]);
        DataRepository.setData(dataList);
    };

    const keyDownHandler = (e) => {
        if (e.key === "ArrowDown") {
            //커서 움직이는 걸 방지하는 용도
            e.preventDefault();
            //아래쪽 방향 키보드를 누르면 index를 +1 해줍니다.
            setCursorIndex((prev) => prev + 1);
    } else if (e.key === "ArrowUp") {
        //커서 움직이는 걸 방지하는 용도
        e.preventDefault();
       //위쪽 방향 키보드를 누르면 index를 -1 해줍니다.
        setCursorIndex((prev) => Math.abs(prev - 1));}
    }
    // value = 연관검색어, data = 검색어
    return (
        <S.Wrapper>
            <S.SearchForm onSubmit={onSubmitForm}>
                <S.InputBox>
                    <S.Input
                        type="text"
                        name="keyword"
                        onChange={onSearchKeyword}
                        placeholder="검색어를 입력해주세요."
                        onKeyDown={(e) => {
                            keyDownHandler(e);
                        }}
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
                    <SearchList value={value} searchResult={searchResult} />
                    <S.HistoryContainer>
                        <S.Title>최근 검색어</S.Title>
                        {/* 컴포넌트 분리해서 맵돌리시 데이터 증발문제! */}
                        {/* <RecentSearchList value={value} dataList={dataList} /> */}
                        {data.map((item) => (
                            <div>{item}</div>
                        ))}
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
    margin: 400px 700px;

    flex-wrap: wrap;
`;

const SearchForm = styled.form`
    display: flex;
`;
const InputBox = styled.div`
    box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
    border-radius: 10px;
    display: flex;
    padding: 3px 15px;
`;

const Input = styled.input`
    font-size: 15px;
    color: #222222;
    width: 278px;
    border: none;
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
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    float: left;
    font-weight: 400;
    color: #666;
`;

const ListContainer = styled.div`
    box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
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
