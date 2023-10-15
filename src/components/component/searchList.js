import styled from 'styled-components';

const SearchList = ({ value, searchResult }) => {
    // value = 연관검색어, data =
    let keyword = Array.isArray(value) ? value.join('') : '';
    console.log(`value:`, typeof keyword);
    console.log(`keyword:`, keyword);
    console.log(`searchResult:`, searchResult);
    if (searchResult !== '' && keyword.includes(searchResult)) {
        const matchParts = keyword.split(new RegExp(`(${searchResult})`, 'gi'));
        console.log('True');
        return (
            // 이상하게 출력된다.. css문제..?
            <KeywordContainer>
                {matchParts.map((part, idx) =>
                    part.toLowerCase() === searchResult.toLowerCase() ? (
                        <SearchListContainer key={idx}>{part}</SearchListContainer>
                    ) : (
                        //일치하지않으면 그대로 출력
                        part
                    )
                )}
            </KeywordContainer>
        );
    }

    return searchResult;
};

export default SearchList;

const SearchListContainer = styled.span`
    color: #0c090a;
    font-weight: bold;
    padding-left: 7px;
`;

const KeywordContainer = styled.div`
    display: flex;
    flex-direction: column;
`