import styled from 'styled-components';

const SearchList = ({ value }) => {
    return (
        <>
            {Array.isArray({ value }) ? (
                value.map((item) => {
                    return <SearchListContainer>{item}</SearchListContainer>;
                })
            ) : (
                <SearchListContainer>{value}</SearchListContainer>
            )}
        </>
    );
};

export default SearchList;

const SearchListContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #0C090A;
    padding: 7px 10px;
`;
