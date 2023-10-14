import styled from 'styled-components';

const SearchList = ({ value: keyword, searchResult }) => {
    // value = 연관검색어, data =
    console.log(`value:`, keyword);
    console.log(`searchResult:`, searchResult);
    if (Array.isArray(keyword) !== '' && searchResult.includes(keyword)) {
        const parts = searchResult.split(new RegExp(`(${keyword})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    //소문자로 변환 후 비교하여 일치
                    part.toLowerCase() === keyword.toLowerCase() ? (
                        <SearchListContainer key={index}>{part}</SearchListContainer>
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

const SearchListContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #0c090a;
    padding: 7px 10px;
`;
