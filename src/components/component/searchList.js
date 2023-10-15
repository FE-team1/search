import { useState } from 'react';
import styled from 'styled-components';

const SearchList = ({ value, searchResult }) => {
    // value = 연관검색어, data =
    let keyword = Array.isArray(value) ? value.join('') : '';
    const [cursorIndex, setCursorIndex] = useState(0); //키보드방향으로 드롭다운 선택을 위한 상태

    const keyDownHandler = (e) => {
        if (e.key === 'ArrowDown') {
            //커서 움직이는 걸 방지하는 용도
            e.preventDefault();
            //아래쪽 방향 키보드를 누르면 index를 +1 해줍니다.
            setCursorIndex((prev) => prev + 1);
        } else if (e.key === 'ArrowUp') {
            //커서 움직이는 걸 방지하는 용도
            e.preventDefault();
            //위쪽 방향 키보드를 누르면 index를 -1 해줍니다.
            setCursorIndex((prev) => Math.abs(prev - 1));
        }
    };

    if (searchResult !== '' && keyword.includes(searchResult)) {
        const matchParts = keyword.split(new RegExp(`(${searchResult})`, 'gi'));
        return (
            // 이상하게 출력된다.. css문제..?
            <>
                {matchParts.map((part, idx) =>
                    part.toLowerCase() === searchResult.toLowerCase() ? (
                        <SearchListContainer
                            key={idx}
                            onKeyDown={(e) => {
                                keyDownHandler(e);
                            }}
                        >
                            {part}
                        </SearchListContainer>
                    ) : (
                        //일치하지않으면 그대로 출력
                        part
                    )
                )}
            </>
        );
    }

    return searchResult;
};

export default SearchList;

const SearchListContainer = styled.span`
    color: #0c090a;
    font-weight: bold;
    padding-left: 7px;
    display: flex;
    flex-direction: column;
`;
