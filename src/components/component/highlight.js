import styled from "styled-components";

const SearchHighlighting = ({ item, isSearch }) => {
  return item.includes(isSearch) ? (
    <span >
      {item.split(isSearch)[0]}
      <S.Highlighting>{isSearch}</S.Highlighting>
      {item.split(isSearch)[1]}
    </span>
  ) : (
    <span>{item}</span>
  );
};

export default SearchHighlighting;


const Highlighting = styled.form`
color: "#3F51B5"
`;

const S = {
  Highlighting,
}