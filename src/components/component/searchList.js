const SearchList = ({ value }) => {
  return (
    <div>
      {Array.isArray(value) ? (
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
