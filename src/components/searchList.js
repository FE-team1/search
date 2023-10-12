const SearchList = ({ isSearch, value }) => {
  return (
    <div>
      {isSearch === "검색" ? (
        <span>
          {value.map((item) => {
            return <div>{item}</div>;
          })}
        </span>
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
};

export default SearchList;
