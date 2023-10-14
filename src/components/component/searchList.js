import styled from 'styled-components';

const SearchList = ({ value }) => {
  return (
    <div>
      {Array.isArray(value) ? (
        <div>
          {value.map((item) => {
            return <SearchListContainer>{item}</SearchListContainer>;
          })}
        </div>
      ) : (
        <SearchListContainer>{value}</SearchListContainer>
      )}
    </div>
  );
};

export default SearchList;

const SearchListContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #0C090A;
    padding: 7px 10px;
`;
