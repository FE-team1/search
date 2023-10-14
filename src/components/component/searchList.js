const SearchList = ({ value }) => {
  return (
    <div>
      {Array.isArray(value) ? (
        <div>
          {value.map((item) => {
            return <div style={{color:'#0C090A', paddingTop: '7px'}}>{item}</div>;
          })}
        </div>
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
};

export default SearchList;
