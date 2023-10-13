const SearchList = ({ isSearch, value }) => {
  return (
    <div>
      {isSearch === "검색" ? (
        <div>
          {value.map((item) => {
            return <div>{item}</div>;
          })}
        </div>
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
};

export default SearchList;
